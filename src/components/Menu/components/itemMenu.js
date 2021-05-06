import { Link } from "react-router-dom";
import { ItemWraper, Label } from "./styles";

export const ItemMenu = ({label, icon: Icon, path, active}) => (
    <ItemWraper active={active}>
        <Link to={path}>
            <Icon />
            <Label active={active}>{label}</Label>
        </Link>
        
    </ItemWraper>
)