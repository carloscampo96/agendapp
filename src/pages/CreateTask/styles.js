import { Theme1 } from "../../themes/Theme1";
import styled from "styled-components";


export const Textarea = styled.textarea`
    width: 100%;
    font-family: 'Roboto';
    font-size: 1.1em;
    box-sizing: border-box;
    padding: 10px 15px;
    border-width: 1;
    border-style: solid;
    border-color: ${props => props.errors ? Theme1.danger: '#ccc'};
    outline: none;
`;

export const LabelError = styled.span`
    color: ${Theme1.danger};
    font-weight: bold;
`;