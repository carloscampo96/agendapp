import React from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { LinkTo } from "../../components/LinkTo";
import { PageWrapper, LogoWrapper, TopLink, FormGroup } from "../../globalStyles"
import { useForm } from "react-hook-form";
import { LabelError } from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../../store';

export const Signin = () => {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.user)

    const { 
        register, 
        handleSubmit, 
        formState: { 
            errors,
            isValid,
        } 
    } = useForm({ mode: 'onChange' });
    
    const onSubmitLogin = (data) => {
        console.log('data form', data)
        dispatch(fetchLogin(data));
    };

    return (
        <PageWrapper>
        <TopLink>
            <LinkTo text="Sign Up" url="/signup" />
        </TopLink>
        <LogoWrapper>
            <img src="./assets/logo_color.png" />
        </LogoWrapper> 
        {
            userData.error && <LabelError>Email or Password Incorrect</LabelError>
        }
        <form onSubmit={handleSubmit(onSubmitLogin)}>
            <FormGroup>
                <Input 
                    register={register} 
                    name="email"
                    type="email"
                    rules={{ 
                        required: true,
                        pattern: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
                    }} 
                    placeholder="Enter your email" 
                    label="Email address" 
                />
                {
                    errors.email?.type === 'required' && <LabelError>Field required</LabelError>
                }
                {
                    errors.email?.type === 'pattern' && <LabelError>It is not a email</LabelError>
                }
            </FormGroup>
            <FormGroup>
                <Input
                    register={register} 
                    name="password"
                    rules={{ required: true, minLength: 8 }} 
                    type="password" 
                    placeholder="Enter your password" 
                    label="Password" 
                />
                {
                    errors.passsword?.type === 'required' && <LabelError>Field required</LabelError>
                }
                {
                    errors.passsword?.type === 'minLength' && <LabelError>Min Length 8 characters</LabelError>
                }
            </FormGroup>
            <Button 
                disabled={!isValid} 
                type="submit" 
                text={ userData.loading ? 'Checking...' : 'Sign in'}
            />
        </form>
    </PageWrapper>

    )
}
    

