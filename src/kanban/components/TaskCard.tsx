import { MdDeleteForever } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Id, Task, TaskActivity } from "../constants/types";
import { taskActivities as initialTaskActivities } from "../constants/data";
import { generateUniqueId } from "../utils/helper";


type Props = {
  task: Task;
  deleteTask?: (id: Id) => void;
  editTaskTitle?: (id: Id, title: string) => void;
};

const TaskCard = (props: Props) => {
  const { task, deleteTask, editTaskTitle } = props;
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [taskActivities, setTaskActivities] = useState(initialTaskActivities);

  const handleClose = () => [setOpenEdit(false)];

  const handleOpenDeleteTask = (event: any) => {
    event.stopPropagation(); // Prevents the click event from the parent div (openEdit)
    setOpenDeleteTask(true);
  };

  const handleCloseDeleteTask = () => {
    setOpenDeleteTask(false);
  };

  const handleConfirmDeleteTask = () => {
    if (deleteTask) deleteTask(task.id);
    setOpenDeleteTask(false);
  };

  // Task activity
  const handleAddingTaskActivity = (activityContent: string) => {
    const newTaskActivity: TaskActivity = {
      id: generateUniqueId("activity"),
      taskId: task.id,
      user: "Thien Nguyen", // current user
      date: new Date(),
      content: activityContent,
    };

    setTaskActivities([newTaskActivity, ...taskActivities]);
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        key={task.id}
        className="relative max-h-20 p-2 rounded-xl bg-white break-words opacity-25 overflow-hidden border-2 border-blue-400"
      >
        {task.title}
      </div>
    );
  }

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        key={task.id}
        className="relative max-h-20 overflow-y-auto p-2 rounded-xl bg-white break-words border-2 hover:border-blue-400 overflow-hidden group"
        onClick={() => setOpenEdit(true)}
      >
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-light-2
       hover:bg-light-3 p-1 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          // onClick={(e) => {
          //   e.stopPropagation(); // Prevents the click event from the parent div (openEdit)
          //   if (deleteTask) deleteTask(task.id);
          // }}
          onClick={handleOpenDeleteTask}
        >
          <MdDeleteForever />
        </button>

        <p>{task.title}</p>
        <div className="flex items-center gap-1">
          <IoChatbubbleEllipsesOutline />
          <p className="text-tiny">{taskActivities.length}</p>
        </div>
      </div>
      <Dialog open={openDeleteTask} onClose={handleCloseDeleteTask}>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete task{" "}
            <span className="text-red-500">{task.title}</span>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-secondary border-gray-500"
            onClick={handleCloseDeleteTask}
          >
            Cancel
          </button>
          <button
            className="btn-primary bg-red-500"
            onClick={handleConfirmDeleteTask}
          >
            Agree
          </button>
        </DialogActions>
      </Dialog>
      <EditTaskModal
        open={openEdit}
        task={task}
        taskActivities={taskActivities}
        addTaskActivity={handleAddingTaskActivity}
        handleClose={handleClose}
        editTaskTitle={editTaskTitle}
      />
    </div>
  );
};

export default TaskCard;
