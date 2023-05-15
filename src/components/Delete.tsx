import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RiDeleteBinFill } from "react-icons/ri";
import { db } from ".././config/FirebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

interface DeleteUserProps {
  email?: string;
  id?: string;
  lastOnlineDate?: string;
  lastOnlineTime?: string;
  name?: string;
  photoUrl?: string;
  role?: string;
  status?: string;
  DocumentData?: string;
}

const DeleteUser = ({ data }: { data: DeleteUserProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleDeleteUser = async () => {
    const databaseRef = doc(db, "users", data.id || "");
    try {
      await deleteDoc(databaseRef);
      alert("User deleted");
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button className="btn btn-ghost btn-sm rounded-btn" onClick={openModal}>
        <RiDeleteBinFill />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-base-100 shadow-xl rounded-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Delete User
                </Dialog.Title>
                <div className="mt-2">
                  <p
                    className="text-sm text-gray-500"
                  >
                    Are you sure you want to delete this user?
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleDeleteUser}
                  >
                    Delete
                  </button>
                  <button type="button" className="btn" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteUser;
