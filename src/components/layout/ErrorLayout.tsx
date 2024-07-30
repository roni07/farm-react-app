import React from "react";
import {Button, Result} from "antd";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {ExceptionStatusType} from "antd/es/result";

interface ErrorLayoutProps {
    status: ExceptionStatusType,
    title: React.ReactNode,
    subTitle: React.ReactNode,
    btnName: string,
    pathName: string,
}

const ErrorLayout = ({status, title, subTitle, btnName, pathName}: ErrorLayoutProps) => {
    return (
        <Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={<Link to={pathName}><Button type="primary">{btnName}</Button></Link>}
        />
    );
};

ErrorLayout.prototypes = {
    status: PropTypes.number.isRequired,
    subTitle: PropTypes.string.isRequired
}

export default ErrorLayout;