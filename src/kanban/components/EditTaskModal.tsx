import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { MdOutlineSubtitles } from "react-icons/md";
import { BsTextParagraph } from "react-icons/bs";

import { Id, Task } from "../constants/types";
import { useState } from "react";

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
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
