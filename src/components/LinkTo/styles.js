import styled from "styled-components";

export const LinkWrapper = styled.span`
    a {
        text-decoration: none;
        color: ${props => props.color || '#0f66ff'};
        padding: 10px 10px;
    }
`;