import {useEffect} from 'react';
import {Flex, Layout} from 'antd';
import ImageView from "../../common/ImageView.tsx";

import "./nav_header.scss";

const {Header} = Layout;

const NavHeader = () => {

    useEffect(() => {

        // if (isLogin) {
        //     getProfile();
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Header className="nav-header">

            <Flex align="center" gap={18}>
                <ImageView
                    style={{width: "40px", height: "40px", borderRadius: "50%"}}
                />

                <p className="user-type-txt">
                    VP Super User
                </p>

            </Flex>

        </Header>
    );
}

export default NavHeader;
