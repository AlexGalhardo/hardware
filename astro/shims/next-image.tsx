import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
	src: string;
	priority?: boolean;
	fill?: boolean;
	unoptimized?: boolean;
};

export default function Image({ priority, fill, unoptimized, alt, ...rest }: Props) {
	return <img alt={alt} loading={priority ? "eager" : "lazy"} {...rest} />;
}
