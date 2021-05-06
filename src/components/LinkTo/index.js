import { Link } from "react-router-dom";
import { LinkWrapper } from "./styles";

export const LinkTo = ({url, text, color}) => (
    <LinkWrapper color={color}>
        <Link to={url}>{text}</Link>
    </LinkWrapper>
)