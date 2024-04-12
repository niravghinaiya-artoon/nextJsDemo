import { Image } from "components/lib/react-npm";

export function CustomImage({ src = '', width = 500, height = 500, alt = 'custom image', className = "", ...rest }) {
    return (
        <Image
            src={src}
            alt={alt}
            className={className}
            width={width}
            height={height}
            {...rest}
        />
    );
}