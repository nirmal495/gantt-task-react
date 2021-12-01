import React from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./components/view-switcher";
import { getStartEndDateForProject, initTasks } from "./helper";
import "gantt-task-react/dist/index.css";

//Init
const App = () => {
  const [view, setView] = React.useState(ViewMode.Day);
  const [tasks, setTasks] = React.useState(initTasks());
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <div>
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Limited Height</h3>
      <Gantt 
        tasks={tasks/* [{
          id:"APP_367877",
          name: "APP_367877",
          start: new Date("2021-10-02"),
          end: new Date("2021-12-6"),
          progress:22,
          type:"project",
          hideChildren:false,
          priority: "High"
      }, {
          "id":"0",
          "name":"Analysis and preparation of initial design document",
          "start":new Date("2021-10-02"),
          "end":new Date("2021-10-06"),
          "progress":100,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          priority: "High"
      }, {
          "id":"1",
          "name":"Requirement Traceability Matrix",
          "start":new Date("2021-10-07"),
          "end":new Date("2021-10-08"),
          "progress":100,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['0'],
          priority: "High"
      }, {
          "id":"2",
          "name":"Requirement signoff",
          "start":new Date("2021-10-09"),
          "end":new Date("2021-10-09"),
          "progress":100,
          "type":"milestone",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['1'],
          priority: "High"
      }, {
          "id":"3",
          "name":"Application Design",
          "start":new Date("2021-10-09"),
          "end":new Date("2021-10-13"),
          "progress":100,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['1'],
          priority: "High"
      }, {
          "id":"4",
          "name":"Solution Design Review",
          "start":new Date("2021-10-14"),
          "end":new Date("2021-10-15"),
          "progress":100,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['3'],
          priority: "High"
      }, {
          "id":"5",
          "name":"Code Mining and Analyze",
          "start":new Date("2021-10-16"),
          "end":new Date("2021-10-19"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['4'],
          priority: "High"
      }, {
          "id":"6",
          "name":"Code Review and Performing POC",
          "start":new Date("2021-10-20"),
          "end":new Date("2021-10-21"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['5'],
          priority: "High"
      }, {
          "id":"7",
          "name":"Rework Code",
          "start":new Date("2021-10-22"),
          "end":new Date("2021-10-27"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['6'],
          priority: "High"
      }, {
          "id":"8",
          "name":"Test Environment setup and checkout",
          "start":new Date("2021-10-20"),
          "end":new Date("2021-10-28"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['5'],
          priority: "High"
      }, {
          "id":"9",
          "name":"Develop Unit Test plan and Cases",
          "start":new Date("2021-10-28"),
          "end":new Date("2021-11-02"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['8'],
          priority: "High"
      }, {
          "id":"10",
          "name":"Perform system testing",
          "start":new Date("2021-11-03"),
          "end":new Date("2021-11-06"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['9'],
          priority: "High"
      }, {
          "id":"11",
          "name":"Rework Test strategy",
          "start":new Date("2021-11-07"),
          "end":new Date("2021-11-10"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['10'],
          priority: "High"
      }, {
          "id":"12",
          "name":"Develop Acceptance Test strategy and Cases",
          "start":new Date("2021-11-11"),
          "end":new Date("2021-11-14"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['10', '11'],
          priority: "High"
      }, {
          "id":"13",
          "name":"Review Acceptance Test strategy and Cases",
          "start":new Date("2021-11-17"),
          "end":new Date("2021-11-18"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['12'],
          priority: "High"
      }, {
          "id":"14",
          "name":"Acceptance signoff",
          "start":new Date("2021-11-19"),
          "end":new Date("2021-11-19"),
          "progress":0,
          "type":"milestone",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['13'],
          priority: "High"
      }, {
          "id":"15",
          "name":"Develop deployment and support manuals",
          "start":new Date("2021-11-18"),
          "end":new Date("2021-11-20"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['11', '12'],
          priority: "High"
      }, {
          "id":"16",
          "name":"Production Deployment Plan and Creation",
          "start":new Date("2021-11-21"),
          "end":new Date("2021-11-24"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['15'],
          priority: "High"
      }, {
          "id":"17",
          "name":"Deploy and test rule bases",
          "start":new Date("2021-11-25"),
          "end":new Date("2021-11-26"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['16'],
          priority: "High"
      }, {
          "id":"18",
          "name":"Post Deploy Monitoring",
          "start":new Date("2021-11-27"),
          "end":new Date("2021-12-04"),
          "progress":0,
          "type":"task",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['17'],
          priority: "High"
      }, {
          "id":"19",
          "name":"Application go live Sign off",
          "start":new Date("2021-12-05"),
          "end":new Date("2021-12-05"),
          "progress":0,
          "type":"milestone",
          "project":"APP_367877",
          hideChildren: false,
          dependencies: ['18'],
          priority: "High"
      }] */}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={"100px"}
        ganttHeight={300}
        columnWidth={columnWidth}
        listColumns={[
          {label: 'Name', accessor: 'name', formatter: {}, showExpander: true}, 
          {label: 'From', accessor: 'start', formatter: {year: 'numeric', month: 'short', day: 'numeric'}, showExpander: false},
          {label: 'To', accessor: 'end', formatter: {year: 'numeric', month: 'short', day: 'numeric'}, showExpander: false},
          {label: 'Progress', accessor: 'progress', formatter: {}, showExpander: false},
          {label: 'Priority', accessor: 'priority', formatter: {}, showExpander: false},
        ]}
      />
    </div>
  );
};

export default App;
