import React, { useState } from "react";
import { Input } from "./Input.tsx";
import { ErrorType } from "./Type.ts";

export const SchoolForm = ({
  setSchoolData,
  setFormData,
  formData,
  edit,
  setEdit,
  rowId,
  setRowId,
}) => {
  const [error, setError]: any = useState({});
  const checkObject = {
    name: [
      { require: true, message: "Please enter you name" },
      { minLength: 3, message: "Please enter minimum 3 letter name" },
    ],
    lname: [
      { require: true, message: "Please enter your last name" },
      { minLength: 3, message: "Please enter minimum 3 letter name" },
    ],
    age: [
      { require: true, message: "Please enter age" },
      { minAge: 3, message: "Student should be greater then 3 years old" },
      { maxAge: 20, message: "Student should be less then 20 years old" },
      { max: 3, message: "Invalid age!" },
    ],
    grade: [
      { require: true, message: "Please enter your grade" },
      { maxGrade: 10, message: "Please enter grade between 1 to 10" },
      { minGrade: 1, message: "Please enter grade greater then 0" },
      { maxLength: 2, message: "Invalid grade!" },
    ],
  };
  const handleError = (data) => {
    let objError: any | ErrorType = {};
    Object.entries(data).forEach(([key, value]: [string, any]) => {
      // eslint-disable-next-line array-callback-return
      checkObject[key].some((rule) => {
        if (rule.require && !value) {
          objError[key] = rule.message;
          return true;
        }
        if (rule.minAge && data.age < 3) {
          objError[key] = rule.message;
          return true;
        }
        if (rule.maxAge && data.age > 20) {
          objError[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 3) {
          objError[key] = rule.message;
          return true;
        }
        if (rule.maxGrade && data.grade > 10) {
          objError[key] = rule.message;
          return true;
        }
        if (rule.minGrade && data.grade < 1) {
          objError[key] = rule.message;
          return true;
        }
        if (rule.maxLength && data.grade.length > 2) {
          objError[key] = rule.message;
          return true;
        }
        if (rule.max && data.age.length > 3) {
          objError[key] = rule.message;
          return true;
        }
      });
    });
    setError(objError);
    return objError;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errorData: any = handleError(formData);
    if (Object.keys(errorData).length) return;
    if (rowId) {
      setSchoolData((pre) => {
        return pre.map((data) =>
          data.id === rowId ? { ...formData, id: rowId } : data
        );
      });
      setRowId("");
    } else {
      setSchoolData((pre: any[]) => {
        return [...pre, { ...formData, id: crypto.randomUUID() }];
      });
    }
    setFormData({
      name: "",
      lname: "",
      age: "",
      grade: "",
    });
    setEdit(false);
  };
  const handleForm = (e) => {
    setFormData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
    setError({});
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Form</h2>
      <Input
        type="text"
        placeholder="Enter your first name"
        onChange={handleForm}
        name="name"
        value={formData.name}
        error={error.name}
      />
      <Input
        type="text"
        placeholder="Enter your last name"
        onChange={handleForm}
        name="lname"
        value={formData.lname}
        error={error.lname}
      />
      <Input
        type="number"
        placeholder="Enter your age"
        onChange={handleForm}
        name="age"
        value={formData.age}
        error={error.age}
      />
      <Input
        type="number"
        placeholder="Enter your Grade"
        onChange={handleForm}
        name="grade"
        value={formData.grade}
        error={error.grade}
      />
      <button>{edit ? "Save" : "Add"}</button>
    </form>
  );
};
