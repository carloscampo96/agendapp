import { useEffect } from "react";
import { Task } from "../../components/Task";
import { TaskFilter } from "./components/TaskFilter";
import { useFilterStatus } from "../../contexts/FilterStatusContext";
import { Topbar } from "../../components/Topbar";
import { connect } from 'react-redux';
import { fetchTasks } from '../../store'
import { STATUS_FILTER } from "../../constants/TaskFilterStatus";
 
const Home = ({title, taskData, fetchTasksAction}) => {

  const { currentTasksFilter } = useFilterStatus();

  useEffect(() => { 
    console.log('task state from store', taskData)
  }, [taskData]);

  useEffect(() => { 
    fetchTasksAction();
  }, []);

  useEffect(() => {
    if(currentTasksFilter === STATUS_FILTER.ALL) {
      fetchTasksAction();
    } else {
      fetchTasksAction({ status: currentTasksFilter });
    }
  }, [currentTasksFilter])


  return (
    <>
      <Topbar title={title}/>
      <TaskFilter/>
      {
        taskData.loading && <p>Loading...</p>
      }
      {
        taskData.error && <p>{taskData.error}</p>
      }
      <div>
        {taskData.tasks.map((item, key) => (
          <Task key={key} {...item} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    taskData: state.task
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasksAction: (filter) => dispatch(fetchTasks(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);