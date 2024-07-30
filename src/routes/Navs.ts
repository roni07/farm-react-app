import * as PATH from "./Slug";
import Roles from "../constant/Roles.ts";
import {menuIcons} from "../utils/Icons.tsx";

const Navs = [
    {
        key: "user-list",
        title: "User List",
        path: PATH.USER_LIST_VIEW_PATH,
        icon: menuIcons("user"),
        subMenu: null,
        roles: [Roles.ALL]
    },
]

export default Navs;
