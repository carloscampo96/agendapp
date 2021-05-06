import React from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { LinkTo } from "../../components/LinkTo";
import { PageWrapper, LogoWrapper, TopLink } from "../../globalStyles"
import { useForm, Controller } from "react-hook-form";
import { LabelError } from "./styles";

export const Signin = () => {

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
    };

    return (
        <PageWrapper>
        <TopLink>
            <LinkTo text="Sign Up" url="/signup" />
        </TopLink>
        <LogoWrapper>
            <img src="./assets/logo_color.png" />
        </LogoWrapper> 

        <form onSubmit={handleSubmit(onSubmitCreate)}>
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
            <Input
                register={register} 
                name="passsword"
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
            <TopLink>
                <LinkTo text="Forgot Password" url="/signup" color="#AEAEB2" />
            </TopLink>
            <Button disabled={!isValid} type="submit" text="Sign in"/>
        </form>
        
        
    </PageWrapper>

    )
}
    

