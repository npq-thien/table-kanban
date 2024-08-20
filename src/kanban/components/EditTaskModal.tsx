import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { MdOutlineSubtitles } from "react-icons/md";
import { BsTextParagraph } from "react-icons/bs";
import { RxActivityLog } from "react-icons/rx";

import { Id, Task, TaskActivity } from "../constants/types";
import { useState } from "react";
import { taskActivities } from "../constants/data";
import TaskActivityItem from "./TaskActivityItem";

type Props = {
  task: Task;

  open: boolean;
  handleClose: () => void;
  editTaskTitle?: (id: Id, title: string) => void;
};

const EditTaskModal = (props: Props) => {
  const { task, open, handleClose, editTaskTitle } = props;
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [isEditTaskTitle, setIsEditTaskTitle] = useState(false);

  const handleEditTaskTitle = () => {
    if (editTaskTitle) editTaskTitle(task.id, taskTitle);
    if (taskTitle.trim() !== "") {
      setIsEditTaskTitle(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
      <div className="bg-slate-100">
        <DialogTitle className="flex items-center gap-4">
          <MdOutlineSubtitles />
          {!isEditTaskTitle && (
            <h2
              className="text-2xl font-semibold p-1"
              onClick={() => setIsEditTaskTitle(true)}
            >
              {task.title}
            </h2>
          )}
          {isEditTaskTitle && (
            <div>
              <input
                autoFocus
                className="text-2xl font-semibold w-full p-1 px-2 rounded-md"
                placeholder="Add a description for this card"
                value={taskTitle}
                //    TODO: handle empty case
                onBlur={handleEditTaskTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEditTaskTitle();
                  }
                }}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
          )}
        </DialogTitle>
        <DialogContent className="flex flex-col gap-4">
          {/* Description */}
          <div>
            <h3 className="flex items-center text-lg font-semibold gap-4">
              <BsTextParagraph />
              Description
            </h3>
            
            {/* Extend: create tiptap for rich text format  */}
            <div className="mt-4">
              <p>{task.description}</p>
              {/* {isEditTaskTitle && (
            <div>
              <TextareaAutosize
                //   ref={inputRef}
                className="w-full p-2 rounded-md resize-none"
                placeholder="Add a description for this card"
                value={task.description}
                autoFocus
                onBlur={() => setIsEditTaskTitle(false)}
                //   onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
          )} */}
            </div>
          </div>

          {/* Activies */}
          <div>
            <h3 className="flex items-center text-lg font-semibold gap-4 mb-4">
              <RxActivityLog />
              Activity
            </h3>
            <div className="flex flex-col gap-4">
              {taskActivities.map(
                (item: TaskActivity) =>
                  item.taskId === task.id && (
                    <TaskActivityItem key={item.id} taskActivity={item} />
                  )
              )}
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default EditTaskModal;
