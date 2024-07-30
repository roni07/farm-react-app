interface ImageViewProps {
    url: string,
    style?: { string },
    cursor?: string | "pointer"
}

const ImageView = ({url, style, onClick}: ImageViewProps) => {

    if (url) {
        return <img
            style={{...style, cursor}}
            src={url}
            onClick={onClick ? onClick : null}
            // onError={(e) => {
            //     e.target.onerror = null;
            //     e.target.src = "/assets/images/no_image_icon.png"
            // }}
            alt="no_image"
        />
    }

    return <img style={style} src="/no_image_icon.png" alt="no_image"/>

}

export default ImageView;
