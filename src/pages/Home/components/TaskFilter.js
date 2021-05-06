import { TASK_STATUS } from "../../../constants/TaskStatus";
import { useFilterStatus } from "../../../contexts/FilterStatusContext";
import { TaskFilterWrapper, FilterStatusTaskWrapper } from "./styles";

const FilterStatusTask = ({ statusName, statusId, active, onPress }) => (
  <FilterStatusTaskWrapper onClick={() => onPress(statusId)} active={active} >
    {statusName}
  </FilterStatusTaskWrapper>
);

export const TaskFilter = () => {

  const { currentTasksFilter, setCurrentTasksFilter } = useFilterStatus()
  
  const handlerChangeFilterStatus = (newStatusId) => {
    setCurrentTasksFilter(newStatusId)
  }

  return (
    <TaskFilterWrapper>
      {
          TASK_STATUS.map((item, key) => (
              <FilterStatusTask 
                onPress={handlerChangeFilterStatus} 
                statusId={item.id} 
                active={item.id === currentTasksFilter} 
                key={key} 
                statusName={item.name} 
              /> 
          ))
      }
    </TaskFilterWrapper>
  )
};
