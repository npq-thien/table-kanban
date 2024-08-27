import { generateUniqueId } from "../utils/helper";
import { Column, Task, TaskActivity } from "./types";

export const columnData: Column[] = [
  {
    id: "col-1",
    title: "To Do",
  },
  {
    id: "col-2",
    title: "In Progress",
  },
  {
    id: "col-3",
    title: "Done",
  },
];

export const taskData: Task[] = [
  {
    id: "task-1",
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
      "Artificial intelligence (AI) is technology that enables computers to simulate human intelligence.",
    description: "",
  },
  {
    id: generateUniqueId("task"),
    columnId: "col-2",
    title:
      "Customize gradient button for login page",
    description: "",
  },
  // {
  //   id: generateUniqueId("task"),
  //   columnId: "col-3",
  //   title:
  //     "Artificial intelligence (AI) is technology that enables computers to simulate human intelligence.",
  //   description: "",
  // },
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

export const taskActivities: TaskActivity[] = [
  {
    id: "activity-1",
    taskId: "task-1",
    user: "Thien Nguyen",
    date: new Date('2024-08-20T10:30:00'),
    content: "Hello, Thien was here. Have you done your task?",
  },
  {
    id: "activity-2",
    taskId: "task-1",
    user: "John Doe",
    date: new Date('2024-08-20T11:00:00'),
    content: "John reviewed the task and left some comments.",
  },
  {
    id: "activity-3",
    taskId: "task-1",
    user: "Jane Smith",
    date: new Date('2024-08-20T11:45:00'),
    content: "Jane marked the task as in progress.",
  },
];

