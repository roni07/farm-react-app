import {Spin} from 'antd';

interface LoadingSuspenseProps {
    width?: string,
    height?: string,
}

const LoadingSuspense = ({width = "100%", height = "100%"}: LoadingSuspenseProps) => {

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height
    }

    return (
        <div style={style}>
            <Spin size='large'/>
        </div>
    );
}

export default LoadingSuspense;
