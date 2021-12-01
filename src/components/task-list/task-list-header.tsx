import React from "react";
import styles from "./task-list-header.module.css";
import { Column } from "../../types/public-types";

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  listColumns: Column[];
}> = ({ headerHeight, fontFamily, fontSize, rowWidth, listColumns }) => {
  console.log(listColumns);
  return (
    <div
      className={styles.ganttTable}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className={styles.ganttTable_Header}
        style={{
          height: headerHeight - 2,
        }}
      >
        {listColumns.map((column, index) => (
          <React.Fragment key={index}>
            <div
              className={styles.ganttTable_HeaderItem}
              style={{
                minWidth: rowWidth,
              }}
            >
              &nbsp;{column.label}
            </div>
            {listColumns.length - 1 !== index ? (
              <div
                className={styles.ganttTable_HeaderSeparator}
                style={{
                  height: headerHeight * 0.5,
                  marginTop: headerHeight * 0.2,
                }}
              />
            ) : undefined}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
