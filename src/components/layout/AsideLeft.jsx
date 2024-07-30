import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import Brand from './brand/Brand.jsx';
import Navs from "../../routes/Navs.ts";
import {menuIcons} from "../../utils/Icons.tsx";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import NavsTwo from "../../routes/NavsTwo.js";
import {ROOT_PATH} from "../../routes/Slug.ts";

import "./aside_left.scss";
import {hasPermission} from "../../utils/GenericUtils.js";

const AsideLeft = () => {

    const {loggedUserRoles, logout} = useContext(AuthContext);

    const [stateOpenKeys, setStateOpenKeys] = useState(['']);

    /*
    * Below code used for only one menu will be open at a time
    * */

    const getLevelKeys = (items1) => {
        const key = {};
        const func = (items2, level = 1) => {
            items2.forEach((item) => {
                if (item.key) {
                    key[item.key] = level;
                }
                if (item.subMenu) {
                    func(item.subMenu, level + 1);
                }
            });
        };
        func(items1);
        return key;
    };
    const levelKeys = getLevelKeys(Navs);

    const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };

    const onSelect = key => {

        const _keyMap = {
            "user-list": "user-list",
            "setting": "setting",
            "monitor": "monitor"
        }

        if (_keyMap[key]) {
            setStateOpenKeys([key])
        } else {
            setStateOpenKeys(['chatbot'])
        }

    }

    /* Menu Binding Start */

    const bindSingleMenuItem = (item) => {
        return (
            {
                key: item.key,
                label: <div
                    style={{fontSize: "16px"}}
                >
                    {item.title}
                    {item.path && <Link to={item.path}/>}
                </div>,
                icon: item.icon,
            }
        )
    }

    const bindSubMenuItem = item => {
        return (
            {
                key: item.key,
                label: <div style={{fontSize: "16px"}}>{item.title}</div>,
                icon: item.icon,
                children: item.subMenu.map(childItem => getMenuItems(childItem))
            }
        )
    }

    const getMenuItems = (item) => {

        if (!hasPermission(loggedUserRoles, item.roles)) {
            return null;
        }

        return item.subMenu ? bindSubMenuItem(item) : bindSingleMenuItem(item);
    }

    const menuItems = () => {
        return [
            ...Navs.map(item => getMenuItems(item)),
            {
                type: "divider",
            },
            ...NavsTwo.map(item => getMenuItems(item)),
            {
                key: "sign-out",
                label: <div
                    style={{fontSize: "16px"}}
                    onClick={logout}
                >
                    Sign Out
                </div>,
                icon: menuIcons("signOut"),
            }
        ];
    }

    /* Menu Binding End */

    return (
        <>
            <Link to={ROOT_PATH}>
                <Brand/>
            </Link>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['chatbot-list']}
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                onSelect={v => onSelect(v.key)}
                items={menuItems()}
                className="aside-left-content"
            />
        </>
    );
}

export default AsideLeft;
