import React, { useState, Fragment } from "react";
import { db } from "../config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosAdd } from "react-icons/io";

interface newUserType {
  photo: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const AddUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newUser, setNewUser] = useState<newUserType>({
    photo: "",
    name: "",
    email: "",
    role: "Admin",
    status: "",
  });

  console.log(newUser);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewUser = async (e: any) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("Please fill in all fields");
      return;
    }

    const id = nanoid();
    const databaseRef = doc(db, "users", id);

    const newUserData = {
      ...newUser,
      id,
      status: "",
      lastLoginDate: new Date().toLocaleDateString(),
      lastLoginTime: new Date().toLocaleTimeString(),
    };

    try {
      await setDoc(databaseRef, newUserData);
      alert("User registered");
    } catch (e) {
      console.log(e);
      alert("Error Occurred!");
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="rounded-md py-2 px-3 bg-blue-600 text-white hover:bg-blue-700 border border-blue-700 cursor-pointer flex items-center"
      >
        <IoIosAdd size={30} />
        Add User
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add user
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={(e) => handleNewUser(e)}>
                      <img
                        src={newUser.photo}
                        alt="Profile"
                        className="mx-auto rounded-full mt-5 w-[100px] h-[100px] drop-shadow-md"
                        onChange={(e) => handleChange}
                      />
                      <label htmlFor="name" className="py-2 block w-full">
                        Name:
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newUser.name}
                        onChange={(e) => handleChange(e)}
                        autoFocus
                        className="w-full border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2"
                      />
                      <label htmlFor="email" className="py-2 block w-full">
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={newUser.email}
                        onChange={(e) => handleChange(e)}
                        className="w-full border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2"
                      />
                      <label htmlFor="role" className="py-2 block w-full">
                        Choose a role:
                      </label>
                      <select
                        name="role"
                        id="role"
                        value={newUser.role}
                        onChange={(e) =>
                          setNewUser({ ...newUser, role: e.target.value })
                        }
                        className="w-full border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Sales Leader">Sales Leader</option>
                        <option value="Sales Rep">Sales Rep</option>
                      </select>
                      <label htmlFor="status" className="py-2 block w-full">
                        Status:
                      </label>
                      <select
                        name="status"
                        id="status"
                        value={newUser.status}
                        onChange={(e) =>
                          setNewUser({ ...newUser, status: e.target.value })
                        }
                        className="w-full border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2"
                      >
                        <option value="Active">Active</option>
                        <option value="Invited">Invited</option>
                      </select>

                      <input
                        type="submit"
                        value="Register"
                        className="w-full mt-5 rounded-md p-2 bg-green-300 text-green-900 hover:bg-green-400 border border-green-400 cursor-pointer"
                      />
                    </form>
                  </div>
                  <div className="mt-4 flex flex-row-reverse gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddUser;
