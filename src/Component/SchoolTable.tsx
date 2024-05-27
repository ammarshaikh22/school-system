import React, { useState } from "react";
import { ContextMenu } from "./ContextMenu.tsx";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const SchoolTable = ({
  schoolData,
  setSchoolData,
  setFormData,
  setEdit,
  rowId,
  setRowId,
}) => {
  const [style, setStyle] = useState({});
  let total = 0;
  const [sort, setSort] = useState(() => () => {});
  return (
    <>
      <ContextMenu
        style={style}
        setStyle={setStyle}
        rowId={rowId}
        schoolData={schoolData}
        setSchoolData={setSchoolData}
        setFormData={setFormData}
        setEdit={setEdit}
      />
      <div
        className="table"
        onClick={() => {
          setStyle({});
        }}
      >
        <h2>Student Table</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>
                Name
                <span className="grade">
                  <ArrowUpwardIcon
                    onClick={() => {
                      setSort(() => (a, b) => {
                        return a.name.localeCompare(b.name);
                      });
                    }}
                    style={{ fontSize: "18px", cursor: "pointer" }}
                  />
                </span>
                <span>
                  <ArrowDownwardIcon
                    onClick={() => {
                      setSort(() => (a, b) => {
                        return b.name.localeCompare(a.name);
                      });
                    }}
                    style={{ fontSize: "18px", cursor: "pointer" }}
                  />
                </span>
              </th>
              <th>Last Name</th>
              <th>Age</th>
              <th>
                Grade
                <span className="grade">
                  <ArrowUpwardIcon
                    onClick={() => {
                      setSort(
                        () => (a, b) => parseInt(a.grade) - parseInt(b.grade)
                      );
                    }}
                    style={{ fontSize: "18px", cursor: "pointer" }}
                  />
                </span>
                <span>
                  <ArrowDownwardIcon
                    onClick={() => {
                      setSort(
                        () => (a, b) => parseInt(b.grade) - parseInt(a.grade)
                      );
                    }}
                    style={{ fontSize: "18px", cursor: "pointer" }}
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {schoolData.sort(sort).map(({ id, name, lname, age, grade }, i) => {
              total++;
              return (
                <tr
                  key={id}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setStyle({
                      left: e.clientX,
                      top: e.clientY,
                      id: id,
                    });
                    setRowId(id);
                  }}
                >
                  <td>{i + 1}</td>
                  <td>{name}</td>
                  <td>{lname}</td>
                  <td>{age}</td>
                  <td>{grade}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th className="footer"></th>
              <th className="footer"></th>
              <th className="footer">Total: {total}</th>
              <th className="footer"></th>
              <th className="footer"></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
