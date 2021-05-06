import React from "react";
import styled from "styled-components"

const SplasWrapper = styled.div`
    background-color: #0f66ff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Splash = () => (
    <React.Fragment>
        <SplasWrapper>
            <img src="./assets/logo.png" />
        </SplasWrapper>
    </React.Fragment>
)
