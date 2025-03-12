import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { db } from "../../../services/firebaseConection";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  Timestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ITaskProps } from "./types";

export function useDashboard(userEmail?: string | null) {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<ITaskProps[]>([]);

  const handleChangePublicTask = (event: ChangeEvent<HTMLInputElement>) => {
    setPublicTask(event.target.checked);
  };

  const handleShare = async (id: string) => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/${id}`);
  };

  const handleDeleteTask = async (id: string) => {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  };

  const handleSubmitTask = async (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim() || !userEmail) return;

    try {
      await addDoc(collection(db, "tarefas"), {
        task: input.trim(),
        created: Timestamp.now(),
        user: userEmail,
        publicTask,
      });

      setInput("");
      setPublicTask(false);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const loadTasks = useCallback(() => {
    if (!userEmail) return;

    const taskRef = collection(db, "tarefas");
    const q = query(
      taskRef,
      orderBy("created", "desc"),
      where("user", "==", userEmail)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ITaskProps[];

      setTasks(taskList);
    });

    return () => unsubscribe();
  }, [userEmail]);

  useEffect(() => {
    return loadTasks();
  }, [loadTasks]);

  return {
    input,
    publicTask,
    tasks,
    setInput,
    handleDeleteTask,
    handleSubmitTask,
    handleChangePublicTask,
    handleShare,
  };
}
