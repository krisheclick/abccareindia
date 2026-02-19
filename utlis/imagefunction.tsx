"use client";

import Image, { ImageLoader } from "next/image";
import { CSSProperties, useState } from "react";

interface ImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
  className?: string;
  fallBack?: string;
}

const DEFAULT_FALLBACK = "/assets/images/noimage.jpg";

const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL || "";

const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return `${MEDIA_URL}${src}?w=${width}&q=${quality || 75}`;
};

const CustomImage = ({
  src,
  alt,
  width,
  height,
  style,
  className,
  fallBack
}: ImageProps) => {

  const imageFallback = fallBack || DEFAULT_FALLBACK;
  const [imgSrc, setImgSrc] = useState(src || imageFallback);
  const [hasLoading, setLoading] = useState(true);

  const isFixedSize =
    typeof width === "number" && typeof height === "number";

  return (
    <figure className={`custom_image ${!isFixedSize ? "fixedImage" : ""} ${className || ""}`}>
      <Image
        loader={imageLoader}
        src={imgSrc}
        alt={alt || "Alt Image"}
        {...(isFixedSize ? { width, height } : { fill: true })}
        priority={false}
        placeholder="empty"
        onLoad={() => setLoading(false)}
        onError={() => setImgSrc(imageFallback)}
        className={`custom-image ${hasLoading ? "loading" : "loaded"}`}
        style={style}
      />
    </figure>
  );
};

export default CustomImage;
