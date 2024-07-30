import {lazy, Suspense, useState} from 'react';
import {Layout} from 'antd';
import {Navigate, Route, Routes} from "react-router-dom";
import PageRoutes from "../../routes/PageRoutes";
import {ROOT_PATH, USER_LIST_VIEW_PATH} from "../../routes/Slug";
import NavHeader from "./header/NavHeader.tsx";
import LoadingSuspense from "../common/LoadingSuspense.tsx";
import Page404 from "../../pages/error_pages/Page404.tsx";

const AsideLeft = lazy(() => import('./AsideLeft.jsx'));

const {Sider, Content} = Layout;

const DefaultLayout = () => {

    const [profileLoading, setProfileLoading] = useState(false);

    return (
        <Layout>
            <Sider
                width={240}
                collapsible={false}
                theme="light"
                className="my-sider"
            >
                <Suspense fallback={<LoadingSuspense height="100vh"/>}>
                    <AsideLeft/>
                </Suspense>
            </Sider>

            <Layout>
                <NavHeader/>
                <Content className="app-page">
                    {
                        profileLoading ? <LoadingSuspense/> :
                            <Suspense fallback={<LoadingSuspense/>}>
                                <Routes>
                                    {
                                        PageRoutes.map(route => {

                                            // if (!hasPermission(loggedUserRoles, route.roles)) {
                                            //     return null;
                                            // }

                                            return <Route
                                                key={route.path}
                                                path={route.path}
                                                element={<route.component/>}
                                            />
                                        })
                                    }
                                    <Route
                                        path={ROOT_PATH}
                                        element={<Navigate to={USER_LIST_VIEW_PATH}/>}
                                    />
                                    <Route path="*" element={<Page404/>}/>
                                </Routes>
                            </Suspense>
                    }
                </Content>
            </Layout>
        </Layout>
    );
}

export default DefaultLayout;
