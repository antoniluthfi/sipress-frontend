"use client";

import Image from "next/image";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { memo, useMemo, useState } from "react";

const dummyImages = [
  "https://dummyimage.com/600x240/8c8c8c/000000",
  "https://dummyimage.com/600x240/8c8c8c/000000",
  "https://dummyimage.com/600x240/8c8c8c/000000",
  "https://dummyimage.com/600x240/8c8c8c/000000",
  "https://dummyimage.com/600x240/8c8c8c/000000",
  "https://dummyimage.com/600x240/8c8c8c/000000",
  "https://dummyimage.com/600x240/8c8c8c/000000",
  "https://dummyimage.com/600x240/8c8c8c/000000",
  "https://dummyimage.com/600x240/8c8c8c/000000",
];

const Carousel = ({ data = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = useMemo(() => {
    if (data?.length > 0) {
      return data?.map((announcement) => announcement?.img);
    }

    return dummyImages;
  }, [data?.length]);

  const totalSlides = Math.ceil(images.length / 3);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <div key={slideIndex} className="flex flex-shrink-0 gap-3 w-full">
            {images
              .slice(slideIndex * 3, slideIndex * 3 + 3)
              .map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-[180px] cursor-pointer"
                  onClick={() => window.open(data?.[index]?.href, "_blank")}
                >
                  <Image
                    src={image}
                    alt={`Slide ${slideIndex * 3 + index}`}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                </div>
              ))}
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
      >
        <ArrowLeftCircleIcon />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
      >
        <ArrowRightCircleIcon />
      </button>
    </div>
  );
};

export default memo(Carousel);
