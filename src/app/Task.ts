export interface Task {
  [x: string]: any;
  id?: number;
  text: string;
  day: string;
  reminder: boolean;
}
