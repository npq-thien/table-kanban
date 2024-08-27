import { CSS } from "@dnd-kit/utilities";
import { useMemo, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

import { Column, Id, Task } from "../constants/types";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Snackbar,
  SnackbarContent,
  TextareaAutosize,
} from "@mui/material";
import TaskCard from "./TaskCard";

type Props = {
  column: Column;
  deleteColumn: (id: Id) => void;
  editColumnTitle: (id: Id, title: string) => void;

  tasks: Task[];
  createTask: (columnId: Id, taskTitle: string) => void;
  deleteTask?: (taskId: Id) => void;
  editTaskTitle?: (taskId: Id, newTaskTitle: string) => void;
};

const ColumnContainer = (props: Props) => {
  const {
    column,
    deleteColumn,
    editColumnTitle,
    tasks,
    createTask,
    editTaskTitle,
    deleteTask,
  } = props;
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [isEditTitle, setIsEditTitle] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const [openMenu, setOpenMenu] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const [openDeleteColumn, setOpenDeleteColumn] = useState(false);
  // const [openToast, setOpenToast] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  // CRUD Task
  const handleAddTask = () => {
    if (taskTitle.trim()) {
      createTask(column.id, taskTitle);
      setTaskTitle("");
      setIsAddingTask(false);
    }
  };

  //TODO should add a popup
  const handleDeleteTask = () => {
    // deleteTask(task.)
  };

  // Confirm delete
  const handleOpenDeleteColumn = () => {
    setOpenDeleteColumn(true);
  };

  const handleCloseDeleteColumn = () => {
    setOpenDeleteColumn(false);
    setOpenMenu(false);
  };



  // Create the old UI at the position of dragging table
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[250px] h-[400px] over bg-slate-50 rounded-lg p-2 border-2 border-blue-400"
      >
        <header className="flex flex-col gap-4 opacity-25">
          {/* <div className="flex-between gap-2 font-bold">
            <header className="flex gap-2">
              {column.title}
              <p className="rounded-full bg-light-2 px-2">{tasks.length}</p>
            </header>
            <button>
              <MdDeleteForever onClick={() => openDeleteColumn(column.id)} />
            </button>
          </div>
          <div className="flex flex-col overflow-auto gap-2 rounded-xl">
            <SortableContext items={taskIds}>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </SortableContext>
          </div>
          <button className="btn-primary w-full">Add a card</button> */}
        </header>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[250px] h-[400px] flex flex-col gap-4 bg-cream rounded-lg p-2"
    >
      {/* <Snackbar
        open={openToast}
        onClose={handleCloseToast}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success">Delete column successfully!</Alert>
      </Snackbar> */}
      <Dialog open={openDeleteColumn}>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete column{" "}
            <span className="text-red-500">{column.title}</span>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-secondary border-gray-500"
            onClick={handleCloseDeleteColumn}
          >
            Cancel
          </button>
          <button
            className="btn-primary bg-red-500"
            onClick={() => {
              deleteColumn(column.id);
            }}
          >
            Agree
          </button>
        </DialogActions>
      </Dialog>
      <Menu
        open={openMenu}
        onClose={handleCloseMenu}
        anchorEl={anchorMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="border-b border-1 border-b-black mb-2">
          <p className="text-center">Column actions</p>
        </div>
        <div>
          <MenuItem>Copy column</MenuItem>
          <MenuItem>Move all cards in this list</MenuItem>
          <MenuItem onClick={handleOpenDeleteColumn}>
            <p className="text-red-500 font-semibold">Delete column</p>
          </MenuItem>
        </div>
      </Menu>
      <header
        {...listeners}
        {...attributes}
        className="sticky top-0 bg-cream flex-between gap-2 font-bold"
      >
        <div
          className="flex gap-2 items-center"
          onClick={() => setIsEditTitle(true)}
        >
          {!isEditTitle ? (
            <>
              {column.title}
              <p className="rounded-full bg-light-2 px-2">{tasks.length}</p>
            </>
          ) : (
            <input
              className="rounded-md max-w-48 p-1 focus:border-blue-500 outline-none border"
              autoFocus
              value={column.title}
              onChange={(e) => editColumnTitle(column.id, e.target.value)}
              onBlur={() => setIsEditTitle(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setIsEditTitle(false);
              }}
            />
          )}
          {/* <p className="rounded-full bg-light-2 px-2">{tasks.length}</p> */}
        </div>
        <button
          className="p-1 rounded-md hover:bg-light-3"
          // onClick={() => openDeleteColumn(column.id)}
          onClick={(e) => {
            setAnchorMenu(e.currentTarget);
            setOpenMenu(true);
          }}
        >
          <BsThreeDots />
        </button>
      </header>
      <div className="flex flex-col gap-2 overflow-auto">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskCard
              task={task}
              deleteTask={deleteTask}
              editTaskTitle={editTaskTitle}
            />
          ))}
        </SortableContext>
      </div>

      {isAddingTask ? (
        <div>
          <div className="mb-4">
            <TextareaAutosize
              ref={inputRef}
              className="w-full p-2 rounded-xl resize-none"
              placeholder="Enter a name for this card"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex-center py-1 gap-2 btn-primary w-full"
              onClick={handleAddTask}
            >
              <FaPlus />
              Add card
            </button>
            <button
              className="mx-2 rounded-md p-2 hover:bg-light-3"
              onClick={() => setIsAddingTask(false)}
            >
              <MdClose />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="flex-center py-1 gap-2 btn-primary w-full"
          onClick={() => {
            // Wait for the input field rendered then focus it
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
            setIsAddingTask(true);
          }}
        >
          <FaPlus />
          Add a card
        </button>
      )}
    </div>
  );
};

export default ColumnContainer;
