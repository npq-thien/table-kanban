import React, { useMemo, useState } from "react";

import { generateId } from "../utils/helper";
import { Column, Id, Task } from "../constants/types";
import ColumnContainer from "./ColumnContainer";
import { columnData, taskData } from "../constants/data";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import TaskCard from "./TaskCard";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(columnData);
  const [tasks, setTasks] = useState<Task[]>(taskData);
  const [activeColumn, setActiveColumn] = useState<Column | null>();
  const [activeTask, setActiveTask] = useState<Task | null>();
  const [isAddingNewColumn, setIsAddingNewColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const columnIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 20,
      },
    })
  );

  //  Column
  const createNewColumn = (columnTitle: string) => {
    const newColumn: Column = {
      id: generateId(),
      title: columnTitle,
    };
    setColumns([...columns, newColumn]);
  };

  const handleCreateNewColumn = () => {
    if (newColumnTitle.trim() !== "") {
      createNewColumn(newColumnTitle);
      setIsAddingNewColumn(false);
      setNewColumnTitle("");
    }
  };

  const deleteColumn = (id: Id) => {
    setColumns(columns.filter((col) => col.id !== id));

    // Delete tasks in column
    const tasksInColumn = tasks.filter((task) => task.columnId !== id);
    setTasks(tasksInColumn);
  };

  const editColumnTitle = (id: Id, title: string) => {
    setColumns((prevCol) => {
      return prevCol.map((col) => (col.id === id ? { ...col, title } : col));
    });
  };

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }

    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  };

  // const onDragEnd = (e: DragEndEvent) => {
  //   setActiveColumn(null);
  //   setActiveTask(null);

  //   const { active, over } = e;
  //   if (!over) return;
  //   const activeColumnId = active.id;
  //   const overColumnId = over.id;
  //   if (activeColumnId === overColumnId) return;
  //   // console.log("hi", active.data.current?.type, over.data.current?.type);

  //   setColumns((columns) => {
  //     const activeColumnIndex = columns.findIndex(
  //       (col) => col.id === activeColumnId
  //     );
  //     const overColumnIndex = columns.findIndex(
  //       (col) => col.id === overColumnId
  //     );

  //     // console.log(activeColumnIndex, overColumnIndex);
  //     return arrayMove(columns, activeColumnIndex, overColumnIndex);
  //   });
  // };

  // This function just use to reorder columns
  const onDragEnd = (e: DragEndEvent) => {
    // console.log("Drag ended:", e);
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = e;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (
      active.data.current?.type !== "Column" ||
      over.data.current?.type !== "Column"
    )
      return;
    console.log("Drag ended:", active, over);
    console.log("Active col ID:", activeColumnId, "Over ID:", overColumnId);
    if (activeColumnId === overColumnId) return;

    if (
      active.data.current?.type === "Column" &&
      over.data.current?.type === "Column"
    ) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => col.id === activeColumnId
        );
        const overColumnIndex = columns.findIndex(
          (col) => col.id === overColumnId
        );

        console.log("Reordering columns:", activeColumnIndex, overColumnIndex);
        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    }
  };

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    // console.log("Drag task:", active, over);
    console.log("Active task ID:", activeId, "Over ID:", overId);
    if (!isActiveTask) return;

    // Drop a task over another task
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    // Drop a task over a clumn
    if (isActiveTask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  // Task
  const createTask = (columnId: Id, taskTitle: string) => {
    const newTask: Task = {
      id: generateId(),
      columnId: columnId,
      title: taskTitle,
      description: "",
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: Id) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTaskTitle = (taskId: Id, newTaskTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTaskTitle } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FEC362] via-[#ECE854] to-[#5B9DFF]">
      <div className="flex gap-2 p-4">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="flex gap-4">
            <SortableContext items={columnIds}>
              {columns.map((col) => (
                <div key={col.id}>
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                    editColumnTitle={editColumnTitle}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    editTaskTitle={editTaskTitle}
                  />
                </div>
              ))}
            </SortableContext>
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  key={activeColumn.id}
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  editColumnTitle={editColumnTitle}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                  createTask={createTask}
                />
              )}

              {activeTask && <TaskCard task={activeTask} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
        <div>
          {!isAddingNewColumn ? (
            <button
              className="btn-secondary border-2 border-orange-500"
              onClick={() => setIsAddingNewColumn(true)}
            >
              Add new column
            </button>
          ) : (
            // Demo new column
            <div className="w-[250px] bg-cream rounded-lg p-2">
              <input
                autoFocus
                className="w-full rounded-md p-1 focus:border-orange-500 border-2"
                type="text"
                placeholder="Enter column name"
                onChange={(e) => setNewColumnTitle(e.target.value)}
              />
              <div className="flex gap-4 mt-2">
                <button
                  className="flex-center py-1 gap-2 btn-primary bg-orange-500 w-full"
                  onClick={handleCreateNewColumn}
                >
                  <FaPlus />
                  Add column
                </button>
                <button
                  className="rounded-md p-2 hover:bg-light-3"
                  onClick={() => setIsAddingNewColumn(false)}
                >
                  <MdClose />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
