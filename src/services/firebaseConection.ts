import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXI1FcS9Wq3y5IGyL9SDkYLcOURmi-IOo",
  authDomain: "task-plus-1699c.firebaseapp.com",
  projectId: "task-plus-1699c",
  storageBucket: "task-plus-1699c.firebasestorage.app",
  messagingSenderId: "228724709538",
  appId: "1:228724709538:web:68811b031be3c350699ffb",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
