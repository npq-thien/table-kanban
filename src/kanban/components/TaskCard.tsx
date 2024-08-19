import { MdDeleteForever } from "react-icons/md";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { Id, Task } from "../constants/types";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

type Props = {
  task: Task;
  deleteTask?: (id: Id) => void;
  editTaskTitle?: (id: Id, title: string) => void;
};

const TaskCard = (props: Props) => {
  const { task, deleteTask, editTaskTitle } = props;
  const [openEdit, setOpenEdit] = useState(false);

  const handleClose = () => [setOpenEdit(false)];

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
          className="absolute top-2 right-2 bg-light-2
       hover:bg-light-3 p-1 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation(); // Prevents the click event from the parent div (openEdit)
            if (deleteTask) deleteTask(task.id);
          }}
        >
          <MdDeleteForever />
        </button>

        <p>{task.title}</p>
      </div>
      <EditTaskModal
        open={openEdit}
        task={task}
        handleClose={handleClose}
        editTaskTitle={editTaskTitle}
      />
    </div>
  );
};

export default TaskCard;
