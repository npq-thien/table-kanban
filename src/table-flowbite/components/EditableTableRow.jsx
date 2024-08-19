import { Button, Checkbox, TableCell } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdSave } from "react-icons/md";

const EditableTableRow = ({
  row,
  onSave,
  handleEditRow,
  handleDeleteRow,
  handleSelectRow,
  selectedRows,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ values: row });
//   console.log("data", getValues().name);

  const onSubmit = (data) => {
    onSave(data);
    setIsDisabled(true);
  };

  const handleDoubleClick = () => {
    // console.log('run')
    setIsDisabled(false);
  };

  return (
    <>
      <TableCell>
        <Checkbox
          className="cursor-pointer"
          onChange={() => handleSelectRow(row.id)}
          checked={selectedRows.includes(row.id)}
        />
      </TableCell>
      <TableCell onDoubleClick={handleDoubleClick}>
        <input
          id="id"
          disabled={isDisabled}
          className="w-12 disabled:text-black rounded-xl"
          type="text"
          value={row.id}
          {...register("id")}
        />
      </TableCell>
      <TableCell onDoubleClick={handleDoubleClick}>
        <input
          id="name"
          disabled={isDisabled}
          type="text"
          className="disabled:text-black rounded-xl"
          {...register("name", {
            required: {
              value: true,
              message: "Name cannot be empty",
            },
            pattern: {
              value: /^[A-Za-z ]+$/i,
              message: "Name should only contain characters",
            },
          })}
        />
        <p className="text-red-500">{errors.name?.message}</p>
      </TableCell>
      <TableCell onDoubleClick={handleDoubleClick}>
        <input
          id="age"
          disabled={isDisabled}
          type="number"
          className="w-16 disabled:text-black rounded-xl"
          {...register("age", {
            min: {
              value: 0,
              message: "Age must larger than 0.",
            },
            max: {
              value: 100,
              message: "Age must smaller than 100.",
            },
          })}
        />
        <p className="text-red-500">{errors.age?.message}</p>
      </TableCell>
      <TableCell onDoubleClick={handleDoubleClick}>
        <select
          id="gender"
          disabled={isDisabled}
          type="text"
          className="disabled:text-black rounded-xl"
          {...register("gender")}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </TableCell>
      <TableCell onDoubleClick={handleDoubleClick}>
        <input
          id="email"
          disabled={isDisabled}
          type="email"
          className="min-w-60 disabled:text-black rounded-xl"
          {...register("email", {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Please input correct email format.",
            },
          })}
        />
        <p className="text-red-500">{errors.email?.message}</p>
      </TableCell>
      <TableCell onDoubleClick={handleDoubleClick}>
        <select
          id="status"
          disabled={isDisabled}
          type="text"
          className="disabled:text-black rounded-xl"
          {...register("status")}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Expired">Expired</option>
        </select>
      </TableCell>

      <TableCell className="flex gap-2">
        {!isDisabled && <Button
          type="submit"
          className="bg-orange-400"
          onClick={handleSubmit(onSubmit)}
        >
          <MdSave className="w-4 h-4" />
        </Button>}
        <Button className="bg-blue-500" onClick={() => handleEditRow(row)}>
          <FaEdit className="w-4 h-4" />
        </Button>
        <Button className="bg-red-400" onClick={() => handleDeleteRow(row.id)}>
          <MdDelete className="w-4 h-4" />
        </Button>
      </TableCell>
    </>
  );
};

export default EditableTableRow;
