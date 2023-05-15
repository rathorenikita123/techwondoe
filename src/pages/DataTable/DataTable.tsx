import { useState, useEffect } from "react";
import { onSnapshot, collection, DocumentData } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import TableUI from "./TableUI";

const DataTable = () => {
  const [usersData, setUsersData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const databaseRef = collection(db, "users");
    const unsubscribe = onSnapshot(databaseRef, (querySnapshot) => {
      const usersData: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
      });
      setUsersData(usersData);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="w-full p-4 bg-[#E6FFFD] my-6 rounded-lg drop-shadow-md">
        <h1 className="text-3xl flex items-center">
          Users{" "}
          <span className="text-sm px-3 py-1 ml-2 rounded-full bg-green-200 text-green-700 font-medium">
            {usersData.length} Users
          </span>
        </h1>
        <p className="text-gray-600 text-sm">
          Manage your team members and their account permissions here.
        </p>
      </div>
      <TableUI usersData={usersData} />
    </>
  );
};

export default DataTable;
