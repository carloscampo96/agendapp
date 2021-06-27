import React, {Fragment} from "react";
import { useHistory } from "react-router";
import { Topbar } from "../../components/Topbar";
import { getStatusById } from "../../constants/TaskStatus";
import { TaskDueDate, TaskDescription, TaskFooter, TaskResponsable, TaskStatusLabel, TaskTitle } from "./styles";

const TaskDetail = ({title}) => {
    const history = useHistory();    
    const renderStatus = (id) => {
        const status = getStatusById(id);
        return <TaskStatusLabel color={status.color}>{status.name}</TaskStatusLabel>
    }

    const goBack = () => {
        history.goBack();   
    }

    return (
        <Fragment>
            <Topbar isBackVisible={true} onPress={goBack} title={title}/>
            { renderStatus(2) }
            <TaskTitle>Título</TaskTitle>
            <TaskDescription>Lorem ......</TaskDescription>
            
            <TaskFooter>
                <TaskDueDate>3 days left</TaskDueDate>
                <TaskResponsable>Responsable</TaskResponsable>
            </TaskFooter>
        </Fragment>
    )
}

export default TaskDetail;