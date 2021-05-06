import { useEffect, useState } from "react";
import { Task } from "../../components/Task";
import { TASK_STATUS } from "../../constants/TaskStatus";
import { TaskFilter } from "./components/TaskFilter";
import { STATUS_FILTER } from "../../constants/TaskFilterStatus"
import { useFilterStatus } from "../../contexts/FilterStatusContext";
import { Topbar } from "../../components/Topbar";

const TASK_LIST = [
  {
    id: 1,
    name: "Web design",
    responsable: "Luis",
    timeLeft: 2,
    status: 1,
  },
  {
    id: 2,
    name: "Hacer revisión",
    responsable: "Maria",
    timeLeft: 4,
    status: 1,
  },
  {
    id: 3,
    name: "Hacer estilos",
    responsable: "Martin",
    timeLeft: 6,
    status: 3,
  },
  {
    id: 4,
    name: "Conectar con api",
    responsable: "Luisa",
    timeLeft: 12,
    status: 2,
  },
  {
    id: 5,
    name: "Conectar servicio web",
    responsable: "Jose",
    timeLeft: 4,
    status: 4,
  },
  {
    id: 6,
    name: "Web design",
    responsable: "Luis",
    timeLeft: 2,
    status: 1,
  },
  {
    id: 7,
    name: "Hacer revisión",
    responsable: "Maria",
    timeLeft: 4,
    status: 1,
  },
  {
    id: 8,
    name: "Hacer estilos",
    responsable: "Martin",
    timeLeft: 6,
    status: 3,
  },
  {
    id: 9,
    name: "Conectar con api",
    responsable: "Luisa",
    timeLeft: 12,
    status: 2,
  },
  {
    id: 10,
    name: "Conectar servicio web",
    responsable: "Jose",
    timeLeft: 4,
    status: 4,
  },
];

export const Home = ({title}) => {

  const [taskList, setTaskList] = useState([]);
  const { currentTasksFilter } = useFilterStatus();

  useEffect(() => {
    if (currentTasksFilter === STATUS_FILTER.ALL) {
      setTaskList(TASK_LIST);
    } else {
      const taskFiltered = TASK_LIST.filter(el => el.status === currentTasksFilter);
      setTaskList(taskFiltered);
    }
  }, [currentTasksFilter]);

  return (
    <>
      <Topbar title={title}/>
      <TaskFilter/>
      <div>
        {taskList.map((item, key) => (
          <Task key={key} {...item} />
        ))}
      </div>
    </>
  );
};