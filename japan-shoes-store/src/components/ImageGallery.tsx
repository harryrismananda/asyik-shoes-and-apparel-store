"use client";

import { IImageGalleryProps } from "@/types/type";
import Image from "next/image";
import { useState } from "react";



const ImageGallery = (props: IImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <>
      <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-sm">
        <Image
          src={
            selectedImage === 0
              ? props.productThumbnail
              : props.images[selectedImage]
          }
          alt={props.productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {props.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square bg-gray-50 overflow-hidden rounded-sm border-2 transition-all ${
              selectedImage === index
                ? "border-black"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={image}
              alt={`${props.productName} view ${index + 1}`}
              fill
              className="object-cover"
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
