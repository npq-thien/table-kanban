import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";

const EditRowPopup = ({ open, handleClose, data, handleSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: data });

  const onSubmit = (data) => {
    // console.log("submit", data);
    handleSave(data);
    handleClose();
  };

  return (
    <Modal show={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>Edit information</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name can not be empty",
                  },
                  pattern: {
                    value: /^[A-Za-z ]+$/i,
                    message: "Name only contains characters",
                  },
                })}
              />
              <p className="text-red-500">{errors.name?.message}</p>
            </div>
            {/* Age and gender */}
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="age" value="Age" />
                <TextInput
                  id="age"
                  type="number"
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
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="gender" value="Gender" />
                <Select id="gender" {...register("gender")}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                {...register("email", {
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Please input correct email format.",
                  },
                })}
              />
              <p className="text-red-500">{errors.email?.message}</p>
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="status" value="Status" />
              <Select {...register("status")}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Expired">Expired</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" color="blue">
            Save
          </Button>
          <Button color="gray" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditRowPopup;
