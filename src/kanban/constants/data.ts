import { generateUniqueId } from "../utils/helper";
import { Column, Task } from "./types";

export const columnData: Column[] = [
  {
    id: 'col-1',
    title: "To Do",
  },
  {
    id: 'col-2',
    title: "In Progress",
  },
  {
    id: 'col-3',
    title: "Done",
  },
];

export const taskData: Task[] = [
  {
    id: generateUniqueId("task"),
    columnId: "col-1",
    title: "Make an auth feature",
    description: "Login and logout in the hotel management web",
  },
  {
    id: generateUniqueId("task"),
    columnId: "col-1",
    title: "ahihi task",
    description: "",
  },
  {
    id: generateUniqueId("task"),
    columnId: "col-3",
    title:
      "xong ròi nè xong ròi nèxong ròi nèxong ròi nè xong ròi nè ròi nèxong ròi nèxong ròi nè xong ròi nè",
    description: "",
  },
  {
    id: generateUniqueId("task"),
    columnId: "col-3",
    title:
      "xong ròi nè xong ròi nèxong ròi nèxong ròi nè xong ròi nè ròi nèxong ròi nèxong ròi nè xong ròi nè",
    description: "",
  },
  {
    id: generateUniqueId("task"),
    columnId: "col-3",
    title:
      "xong ròi nè xong ròi nèxong ròi nèxong ròi nè xong ròi nè ròi nèxong ròi nèxong ròi nè xong ròi nè",
    description: "",
  },
  {
    id: generateUniqueId("task"),
    columnId: "col-1",
    title: "one two three task",
    description: "",
  },
  {
    id: generateUniqueId("task"),
    columnId: "col-3",
    title: "fix bug",
    description: "",
  },
];
