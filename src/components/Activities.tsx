import { useRef, useState } from "react";

import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

import { activities } from "../constants";
import { getAltNameFromPath } from "../helpers";
import { useScreenQuery } from "../hooks";

import { Subtitle, Title } from ".";

export function Activities() {
  const { isScreenMobileLg, isScreenTabletSm, isScreenTabletLg } =
    useScreenQuery();

  const slidesRef = useRef<HTMLUListElement | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(
    Array(activities.length).fill(false)
  );

  const visibleSlides = isScreenTabletLg
    ? 4
    : isScreenTabletSm
    ? 3
    : isScreenMobileLg
    ? 2
    : 1;

  function showSlide(direction: "next" | "prev"): void {
    const totalSlides = activities.length;

    let newStartIndex = startIndex;

    if (direction === "next" && newStartIndex + visibleSlides < totalSlides) {
      newStartIndex++;
    } else if (direction === "prev" && newStartIndex > 0) {
      newStartIndex--;
    }

    setStartIndex(newStartIndex);

    const translateValue: string = `translateX(${
      -newStartIndex * (100 / visibleSlides)
    }%)`;
    if (slidesRef.current) {
      slidesRef.current.style.transform = translateValue;
    }
  }

  const isPrevButtonDisabled = startIndex === 0;
  const isNextButtonDisabled = startIndex + visibleSlides >= activities.length;

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  return (
    <section id="Activities" className="container">
      <Subtitle name="HUNDREDS OF" />
      <Title name="Activities for Everyone" />
      <div className="slider-container">
        <button
          className="slider-button slider-button__prev"
          onClick={() => showSlide("prev")}
          disabled={isPrevButtonDisabled}
        >
          <LuMoveLeft />
          Prev
        </button>
        <ul className="slider-content">
          {activities
            .slice(startIndex, startIndex + visibleSlides)
            .map(({ img, href, number }, index) => (
              <li key={getAltNameFromPath(img)}>
                <a href={href} target="_blank">
                  {!loadedImages[startIndex + index] && (
                    <div>
                      <div className="skeleton" />
                      <div className="skeleton-paragraph" />
                      <div className="skeleton-span" />
                    </div>
                  )}
                  <img
                    src={img}
                    alt={getAltNameFromPath(img)}
                    onLoad={() => handleImageLoad(startIndex + index)}
                    style={{
                      display: loadedImages[startIndex + index]
                        ? "block"
                        : "none",
                    }}
                  />
                  {loadedImages[startIndex + index] && (
                    <>
                      <p>{getAltNameFromPath(img)}</p>
                      <span>{number} activities</span>
                    </>
                  )}
                </a>
              </li>
            ))}
        </ul>
        <button
          className="slider-button slider-button__next"
          onClick={() => showSlide("next")}
          disabled={isNextButtonDisabled}
        >
          <LuMoveRight />
          Next
        </button>
      </div>
    </section>
  );
}
