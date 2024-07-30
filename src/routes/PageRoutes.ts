import {lazy} from 'react';
import * as PATH from "./Slug";
import Roles from "../constant/Roles.ts";

const UserListView = lazy(() => import("../pages/user/UserListView"));

const PageRoutes = [
    // user
    {
        path: PATH.USER_LIST_VIEW_PATH,
        component: UserListView,
        roles: [Roles.VP_AU]
    },
]

export default PageRoutes;
