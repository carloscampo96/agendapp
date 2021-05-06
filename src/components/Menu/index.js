import { FaCalendar, FaCheckCircle, FaHome, FaUser } from "react-icons/fa";
import { ItemMenu } from "./components/itemMenu";
import { MenuWrapper } from "./styles";

const MenuOptions = [
    {
        icon: FaHome,
        label: "Home",
        path: "/"
    },
    {
        icon: FaCalendar,
        label: "Schedule",
        path: "/schedule"
    },
    {
        icon: FaCheckCircle,
        label: "Create task",
        path: "/create"
    },
    {
        icon: FaUser,
        label: "Profile",
        path: "/profile"
    }
];

export const Menu = ({pathname}) => {

    return(
        <MenuWrapper>
            {
                MenuOptions.map( (item, i) => (
                    <ItemMenu active={item.path === pathname} key={i} {...item} /> 
                ))
            }
        </MenuWrapper>
    )
};