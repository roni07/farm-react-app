import React from "react";

interface ImageViewProps {
    url?: string,
    style?: React.CSSProperties,
    cursor?: string | "pointer",
    onClick?: () => void,
}

const ImageView = ({url, style, onClick, cursor}: ImageViewProps) => {

    if (url) {
        return <img
            style={{...style, cursor}}
            src={url}
            onClick={onClick || undefined}
            onError={e => {
                (e.target as HTMLImageElement).src = "/assets/images/no_image_icon.png"
            }}
            alt="no_image"
        />
    }

    return <img style={style} src="/no_image_icon.png" alt="no_image"/>

}

export default ImageView;
