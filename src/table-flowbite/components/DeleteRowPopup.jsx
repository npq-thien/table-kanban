import { Button, Modal } from "flowbite-react";
import React from "react";

const DeleteRowPopup = ({ open, handleClose, data, handleDelete }) => {
  return (
    <Modal show={open} onClose={handleClose}>
      <Modal.Header>Confirm deletion</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Do you want to delete
            <span className="text-red-500"> {data?.name}?</span>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleDelete(data.id)}>Accept</Button>
        <Button color="gray" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteRowPopup;
