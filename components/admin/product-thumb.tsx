import Image from "next/image";

interface ProductThumbProps {
	src: unknown;
	alt: string;
	size: number;
}

/** Product photo beside its name in the panel. Without a usable address it is an empty box of the same size. */
export function ProductThumb({ src, alt, size }: ProductThumbProps) {
	const usable = typeof src === "string" && (src.startsWith("https://") || src.startsWith("/"));
	return (
		<span
			className="relative block shrink-0 overflow-hidden rounded-md border border-border bg-white"
			style={{ width: size, height: size }}
		>
			{usable && <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-contain p-1" />}
		</span>
	);
}
