import { Fragment, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Topbar } from "../../components/Topbar";
import  Select  from "react-select/";
import DatePicker from "react-date-picker";
import { useForm, Controller } from "react-hook-form";
import { LabelError, Textarea } from "./styles";
import { Label } from "../../components/Input/styles";
import { FormGroup } from "../../globalStyles"

const USERS = [ 
    {value: 1, label: "Juan"}, 
    {value: 2, label: "Luis"}, 
    {value: 3, label: "María"}, 
    {value: 4, label: "Jose"}, 
    {value: 5, label: "Baltasar"},
    {value: 6, label: "Gaspar"}
];

export const CreateTask = ({title}) => {

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
        console.log('data form', data)
    }


    return(
        <Fragment>
            <Topbar title={title}/>
            <form onSubmit={handleSubmit(onSubmitCreate)}>
                <FormGroup>
                    <label>Task title</label>
                    <Input 
                        register={register} 
                        name="taskTitle" 
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
                                options={USERS}
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
                        name="collaborate"
                        rules={{ required: true }}
                        control={control}
                        render={ ({ field }) => (
                            <Select
                                {...field} 
                                isMulti
                                options={USERS}
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
                            name="dueDateTask"
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