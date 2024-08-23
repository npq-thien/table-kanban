import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { MdOutlineSubtitles } from "react-icons/md";
import { BsTextParagraph } from "react-icons/bs";
import { RxActivityLog } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

import { Id, Task, TaskActivity } from "../constants/types";
import { taskActivities as initialTaskActivities } from "../constants/data";
import TaskActivityItem from "./TaskActivityItem";
import { generateUniqueId } from "../utils/helper";

type Props = {
  task: Task;

  open: boolean;
  handleClose: () => void;
  editTaskTitle?: (id: Id, title: string) => void;
};

const EditTaskModal = (props: Props) => {
  const { task, open, handleClose, editTaskTitle } = props;
  const [taskActivities, setTaskActivities] = useState(initialTaskActivities);
  const [isAddingTaskActivity, setIsAddingTaskActivity] = useState(false);
  const [activityContent, setActivityContent] = useState("");

  const [taskTitle, setTaskTitle] = useState(task.title);
  const [isEditTaskTitle, setIsEditTaskTitle] = useState(false);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [isEditTaskDescription, setIsEditTaskDescription] = useState(false);

  const handleEditTaskTitle = () => {
    if (editTaskTitle) editTaskTitle(task.id, taskTitle);
    if (taskTitle.trim() !== "") {
      setIsEditTaskTitle(false);
    }
  };

  const handleAddingTaskActivity = () => {
    const newTaskActivity: TaskActivity = {
      id: generateUniqueId("activity"),
      taskId: task.id,
      user: "Thien Nguyen", // current user
      date: new Date(),
      content: activityContent,
    };

    setTaskActivities([newTaskActivity, ...taskActivities]);
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
          <button
            className="absolute right-4 p-1 rounded-md hover:bg-dark-1"
            onClick={handleClose}
          >
            <IoMdClose />
          </button>
        </DialogTitle>
        <DialogContent className="flex flex-col gap-4">
          {/* Description */}
          <div>
            <div className="flex justify-between">
              <h3 className="flex items-center text-lg font-semibold gap-4">
                <BsTextParagraph />
                Description
              </h3>
              <button
                className="btn-primary bg-gray-300 text-black"
                onClick={() => setIsEditTaskDescription(true)}
              >
                Edit
              </button>
            </div>

            <div className="mt-4">
              {/* <p>{taskDescription}</p> */}
              {isEditTaskDescription ? (
                <div>
                  <ReactQuill
                    theme="snow"
                    value={taskDescription}
                    onChange={setTaskDescription}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        setIsEditTaskDescription(false);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => setIsEditTaskDescription(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* <p>{taskDescription}</p> */}
                  <div
                    className="formatted-css bg-white rounded-xl p-2"
                    dangerouslySetInnerHTML={{ __html: taskDescription }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Activities (comments) */}
          <div>
            <h3 className="flex items-center text-lg font-semibold gap-4 mb-4">
              <RxActivityLog />
              Activity
            </h3>
            {/* Write new comment */}
            <div className="mt-4">
              {isAddingTaskActivity ? (
                <div>
                  <ReactQuill
                    theme="snow"
                    value={activityContent}
                    onChange={setActivityContent}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        handleAddingTaskActivity();
                        setActivityContent("");
                        setIsAddingTaskActivity(false);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => setIsAddingTaskActivity(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    className="w-full p-1 rounded-md hover:bg-slate-200 "
                    placeholder="Add a description for this card"
                    onClick={() => setIsAddingTaskActivity(true)}
                  />
                </div>
              )}
            </div>

            {/* Render exist activities */}
            <div className="flex flex-col gap-4 mt-4">
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
