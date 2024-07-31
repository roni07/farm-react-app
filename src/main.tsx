import {lazy, Suspense} from "react";
import LoadingSuspense from "./components/common/LoadingSuspense.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import {PAGE_403_PATH, PAGE_404_PATH, PAGE_500_PATH} from "./routes/Slug.ts";
import DefaultLayout from "./components/layout/DefaultLayout.tsx";

const Page403 = lazy(() => import("./pages/error_pages/Page403.tsx"));
const Page404 = lazy(() => import("./pages/error_pages/Page404.tsx"));
const Page500 = lazy(() => import("./pages/error_pages/Page500.tsx"));

const  Main = () => {

    return (
            <div className="app-wrapper">
                <Suspense fallback={<LoadingSuspense/>}>
                    <BrowserRouter>
                        <Routes>
                            {/*<Route path={LOGIN_PATH} element={<Login/>}/>*/}
                            {/*<Route path={TWO_FACTOR_VERIFICATION_PATH} element={<TwoFactor/>}/>*/}
                            {/*<Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword/>}/>*/}
                            {/*<Route path={FORGOT_PASSWORD_OTP_PATH} element={<ForgotPasswordOtp/>}/>*/}
                            {/*<Route path={CREATE_NEW_PASSWORD_PATH} element={<CreateNewPassword/>}/>*/}
                            {/*<Route path={PASSWORD_CREATE_SUCCESS_PATH} element={<CreateNewPasswordSuccess/>}/>*/}
                            <Route element={<PrivateRoute isLogin={true}/>}>
                                <Route path={PAGE_404_PATH} element={<Page404/>}/>
                                <Route path={PAGE_403_PATH} element={<Page403/>}/>
                                <Route path={PAGE_500_PATH} element={<Page500/>}/>
                                <Route path="*" element={<DefaultLayout/>}/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Suspense>
            </div>
    );
}

export default Main;