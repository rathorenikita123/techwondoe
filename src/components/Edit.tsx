/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { db } from "../config/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { RiEdit2Fill } from "react-icons/ri";

interface EditUserProps {
  email?: string;
  id?: string;
  name?: string;
  role?: string;
  lastLogindate?: string;
  lastLoginTime?: string;
  status?: string;
  photo?: string;
  DocumentDate?: string;
}

const EditUser = ({ data }: { data: EditUserProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<EditUserProps>({
    email: "",
    id: "",
    name: "",
    role: "",
    lastLogindate: "",
    lastLoginTime: "",
    status: "",
    photo: "",
  });

  useEffect(() => {
    setUser({ ...user, ...data });
  }, [data]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditUser = async (e: any) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.role) {
      alert("Please fill in all fields");
      return;
    }

    const databaseRef = doc(db, "users", user.id || "");

    const newUserData = {
      ...user,
      lastLogindate: new Date().toLocaleDateString(),
      lastLoginTime: new Date().toLocaleTimeString(),
    };

    try {
      await updateDoc(databaseRef, newUserData);
      alert("User updated");
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button className="btn btn-ghost btn-sm rounded-btn" onClick={openModal}>
        <RiEdit2Fill className="w-5 h-5" />
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
              <Dialog.Overlay className="fixed inset-0 bg-base-100 opacity-30" />
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-base-100 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit User
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={(e) => handleEditUser(e)}>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered"
                        name="name"
                        value={user.name}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered"
                        name="email"
                        value={user.email}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Role</span>
                      </label>
                      <select
                        placeholder="Role"
                        className="input input-bordered"
                        name="role"
                        value={user.role}
                        onChange={(e) =>
                          setUser({ ...user, role: e.target.value })
                        }
                      >
                        <option value="Admin">Admin</option>
                        <option value="Sales Leader">Sales Leader</option>
                        <option value="Sales Rep">Sales Rep</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Status</span>
                      </label>
                      <select
                        placeholder="Status"
                        className="input input-bordered"
                        name="status"
                        value={user.status}
                        onChange={(e) =>
                          setUser({ ...user, status: e.target.value })
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Invited">Invited</option>
                      </select>
                    </div>
                    <div className="form-control mt-6">
                      <input
                        type="submit"
                        value="Edit User"
                        className="btn btn-primary btn-sm"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditUser;
