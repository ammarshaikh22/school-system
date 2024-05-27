import React, { useState } from "react";
import { SchoolForm } from "./Component/SchoolForm.tsx";
import { SchoolTable } from "./Component/SchoolTable.tsx";
import { Data } from "./Data.tsx";
export const App = () => {
  const [schoolData, setSchoolData] = useState(Data);
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    age: "",
    grade: "",
  });
  const [edit, setEdit] = useState(false);
  const [rowId, setRowId] = useState("");
  return (
    <section className="main">
      <div className="container">
        <h1>Welcome to AS School Management System</h1>
        <div className="row">
          <SchoolForm
            setSchoolData={setSchoolData}
            schoolData={schoolData}
            formData={formData}
            setFormData={setFormData}
            edit={edit}
            setEdit={setEdit}
            rowId={rowId}
            setRowId={setRowId}
          />
          <SchoolTable
            schoolData={schoolData}
            setSchoolData={setSchoolData}
            setFormData={setFormData}
            setEdit={setEdit}
            setRowId={setRowId}
            rowId={rowId}
          />
        </div>
      </div>
    </section>
  );
};
