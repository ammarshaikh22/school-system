import React from "react";

export const ContextMenu = ({
  style,
  setStyle,
  rowId,
  schoolData,
  setSchoolData,
  setFormData,
  setEdit,
}) => {
  if (!style.id) return;
  return (
    <div className="menu" style={style}>
      <ul
        onClick={() => {
          setStyle({});
        }}
      >
        <li
          onClick={() => {
            schoolData.forEach((ele) => {
              if (ele.id === rowId) {
                setFormData({
                  name: ele.name,
                  lname: ele.lname,
                  age: ele.age,
                  grade:ele.grade
                });
                setEdit(true);
              }
            });
          }}
        >
          Edit
        </li>
        <li
          onClick={() => {
            const filteredData = schoolData.filter((ele) => {
              return rowId !== ele.id;
            });
            setSchoolData(filteredData);
          }}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};
