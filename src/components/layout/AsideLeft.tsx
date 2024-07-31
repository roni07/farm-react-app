import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Menu, MenuProps} from 'antd';
import Brand from './brand/Brand.tsx';
import Navs from "../../routes/Navs.ts";
import {ROOT_PATH} from "../../routes/Slug.ts";

import "./aside_left.scss";

type MenuItem = Required<MenuProps>['items'][number];

const AsideLeft = () => {

    const [stateOpenKeys, setStateOpenKeys] = useState(['']);

    /*
    * Below code used for only one menu will be open at a time
    * */

    const getLevelKeys = (items1: any) => {
        const key: any = {};
        const func = (items2: any, level = 1) => {
            items2.forEach((item: any) => {
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

    const onOpenChange = (openKeys: any) => {
        const currentOpenKey = openKeys.find((key: any) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key: any) => key !== currentOpenKey)
                .findIndex((key: any) => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_: any, index: number) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key: any) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };

    const onSelect = (key: any) => {

        const _keyMap: Record<string, string> = {
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

    const bindSingleMenuItem = (item: any) => {
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

    const bindSubMenuItem = (item: any) => {
        return (
            {
                key: item.key,
                label: <div style={{fontSize: "16px"}}>{item.title}</div>,
                icon: item.icon,
                children: item.subMenu.map((childItem: any) => getMenuItems(childItem))
            }
        )
    }

    const getMenuItems = (item: any) => {

        // if (!hasPermission(loggedUserRoles, item.roles)) {
        //     return null;
        // }

        return item.subMenu ? bindSubMenuItem(item) : bindSingleMenuItem(item);
    }

    const menuItems = (): MenuItem[] => {
        return [
            ...Navs.map(item => getMenuItems(item)),
            {
                type: "divider",
            },
            // ...NavsTwo.map(item => getMenuItems(item)),
            // {
            //     key: "sign-out",
            //     label: <div
            //         style={{fontSize: "16px"}}
            //         onClick={logout}
            //     >
            //         Sign Out
            //     </div>,
            //     icon: menuIcons("signOut"),
            // }
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
