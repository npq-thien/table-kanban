import React, { useEffect } from "react";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

const AutoHideToast = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-2 right-12">
      <Toast className="border border-gray-500 shadow-lg">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <ToastToggle />
      </Toast>
    </div>
  );
};

export default AutoHideToast;
