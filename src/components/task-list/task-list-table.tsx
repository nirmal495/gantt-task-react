import React, { useMemo } from "react";
import styles from "./task-list-table.module.css";
import { Task, Column } from "../../types/public-types";

const localeDateStringCache = {};
const toLocaleDateStringFactory = (locale: string) => (
  date: Date,
  dateTimeOptions: Intl.DateTimeFormatOptions
) => {
  const key = date.toString();
  let lds = localeDateStringCache[key];
  if (!lds) {
    lds = date.toLocaleDateString(locale, dateTimeOptions);
    localeDateStringCache[key] = lds;
  }
  return lds;
};
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  listColumns: Column[];
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick,
  listColumns,
}) => {
  const toLocaleDateString = useMemo(() => toLocaleDateStringFactory(locale), [
    locale,
  ]);

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {tasks.map(t => {
        let expanderSymbol = "";
        if (t.hideChildren === false) {
          expanderSymbol = "▼";
        } else if (t.hideChildren === true) {
          expanderSymbol = "▶";
        }

        return (
          <div
            className={styles.taskListTableRow}
            style={{ height: rowHeight }}
            key={`${t.id}row`}
          >
            {listColumns.map((column, index) => (
              <React.Fragment key={index}>
                <div
                  className={styles.taskListCell}
                  style={{
                    minWidth: rowWidth,
                    maxWidth: rowWidth,
                  }}
                  title={t[column.accessor]}
                >
                  <div className={styles.taskListNameWrapper}>
                    {column.showExpander ? (
                      <React.Fragment>
                        <div
                          className={
                            expanderSymbol
                              ? styles.taskListExpander
                              : styles.taskListEmptyExpander
                          }
                          onClick={() => onExpanderClick(t)}
                        >
                          {expanderSymbol}
                        </div>
                        <div>{t[column.accessor]}</div>
                      </React.Fragment>
                    ) : (
                      <div
                        className={styles.taskListCell}
                        style={{
                          minWidth: rowWidth,
                          maxWidth: rowWidth,
                        }}
                      >
                        &nbsp;
                        {typeof t[column.accessor] === "number" ||
                        typeof t[column.accessor] === "string"
                          ? t[column.accessor]
                          : toLocaleDateString(
                              t[column.accessor],
                              dateTimeOptions
                            )}
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
};
