import React from "react";
import { DocumentData } from "firebase/firestore";
import { AiOutlineCloudDownload } from "react-icons/ai";

const DownloadButton = ({ usersData }: { usersData: DocumentData[] }) => {
  const download = () => {
    const items = usersData;

    const header = [
      "id",
      "name",
      "email",
      "role",
      "status",
      "lastLoginDate",
      "lastLoginTime",
    ];
    const csv = [
      header.join(","),
      ...items.map((row) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(",")
      ),
    ].join("\r\n");

    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    link.target = "_blank";
    link.download = "users.csv";
    link.click();
  };

  const replacer = (key: any, value: any) => (value === null ? "" : value);

  return (
    <button className="btn btn-outline" onClick={download}>
      <AiOutlineCloudDownload size={25} />
      Download CSV
    </button>
  );
};

export default DownloadButton;
