export interface ITaskProps {
  id: string;
  task: string;
  created: Date;
  user: { email: string };
  publicTask: boolean;
}
