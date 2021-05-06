import React from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { LinkTo } from "../../components/LinkTo";
import { PageWrapper, LogoWrapper, TopLink } from "../../globalStyles";

export const Signup = () => (
    <PageWrapper>
        <TopLink>
            <LinkTo text="Sign In" url="/signin" />
        </TopLink>
        <LogoWrapper>
            <img src="./assets/logo_color.png" />
        </LogoWrapper>
        <Input 
            type="text" 
            placeholder="Enter your name" 
            label="Name" 
        />    
        <Input 
            type="email" 
            placeholder="Enter your email" 
            label="Email address" 
        />
        <Input 
            type="password" 
            placeholder="Enter your password" 
            label="Password" 
        />
        <Input 
            type="password" 
            placeholder="Enter your password" 
            label="Confirm Password" 
        />
        <Button text="Continue"/>
    </PageWrapper>
)