import { Fragment, useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Topbar } from "../../components/Topbar";
import  Select  from "react-select/";
import DatePicker from "react-date-picker";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "./styles";
import { FormGroup, LabelError } from "../../globalStyles";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, fetchCreateTask } from '../../store';
import { Redirect } from "react-router-dom";

const CreateTask = ({title}) => {

    const dispatch = useDispatch();
    const usersData = useSelector(state => state.user)
    const redirectData = useSelector(state => state.redirect);
    const [users, setUsers] = useState([]);

    useEffect( () => {
        dispatch(fetchUsers());
    }, [])

    useEffect( () => {
        const userList = [];
        usersData.users.map(user => {
            userList.push({value: user._id, label: user.name})
        });
        setUsers(userList);
    }, [usersData])

    const { 
        register, 
        control, 
        handleSubmit, 
        formState: { 
            errors,
            isValid,
        } 
    } = useForm({ mode: 'onChange' });

    const onSubmitCreate = (data) => {
        data.responsible = data.responsible.value;
        data.collaborators = data.collaborators.map( collaborator => collaborator.value);
        dispatch(fetchCreateTask(data));
    }

    if (redirectData.path !== '') {
        return <Redirect to={{ pathname: redirectData.path }} />
    }

    return(
        <Fragment>
            <Topbar title={title}/>
            <form onSubmit={handleSubmit(onSubmitCreate)}>
                <FormGroup>
                    <label>Task title</label>
                    <Input 
                        register={register} 
                        name="title" 
                        rules={{ required: true, minLength: 6 }} 
                        label="Task title" 
                        type="text" 
                        placeholder="Enter task title"
                    />
                    {
                        errors.taskTitle?.type === 'required' && <LabelError>Field required</LabelError>
                    }
                    {
                        errors.taskTitle?.type === 'minLength' && <LabelError>Min Length 6 characters</LabelError>
                    }
                </FormGroup>
                <FormGroup>
                    <label>Responsible</label>
                    <Controller
                        name="responsible"
                        control={control}
                        rules={{ required: true }}
                        render={ ({ field }) => (
                            <Select
                                {...field} 
                                options={users}
                                placeholder="Select Responsible"
                            />
                        )}
                    />
                    {
                        errors.responsible && <LabelError>Field required</LabelError>
                    }
                </FormGroup>
                <FormGroup>
                    <label>Collaborate</label>
                    <Controller
                        name="collaborators"
                        rules={{ required: true }}
                        control={control}
                        render={ ({ field }) => (
                            <Select
                                {...field} 
                                isMulti
                                options={users}
                                placeholder="Select Collaborate"
                            />
                        )}
                    />
                    {
                        errors.collaborate && <LabelError >field required</LabelError>
                    }
                </FormGroup>
                <FormGroup>
                    <label>Due Date</label>
                    <div>
                        <Controller
                            name="due_date"
                            control={control}
                            rules={{ required: true }}
                            defaultValue={new Date()}
                            render={ ({ field }) => (
                                <DatePicker
                                    {...field}
                                    local="en-EN"
                                    format="dd-MM-yyyy"
                                />
                            )}
                        />
                    {
                        errors.dueDateTask && <LabelError >field required</LabelError>
                    } 
                    </div>
                </FormGroup>
                <FormGroup>
                    <label>Description</label>
                    <div>
                        <Textarea
                            {...register("description", { required: true } )}
                            rows = "3"
                            errors = {errors.description}
                        />
                        
                    </div>
                    {
                        errors.description && <LabelError >field required</LabelError>
                    }   
                    
                </FormGroup>
                <div>
                    <Button disabled={!isValid} type="submit" text="Create" />
                </div>
            </form>
        </Fragment>
    )
}

export default CreateTask;