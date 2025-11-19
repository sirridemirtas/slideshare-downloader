/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import cn from "classnames";
import styles from "./Slideshow.module.css";
import { Button } from "@/components/ui";

const Slideshow = ({ slides, thumbs }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const handle = useFullScreenHandle();
  const thumbnailRefs = useRef([]);
  const [isComponentFocused, setIsComponentFocused] = useState(false);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const goToFirstSlide = () => {
    setCurrentSlide(0);
  };

  const toggleFullscreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
  };

  const handleKeyDown = (e) => {
    if (!isComponentFocused && !handle.active) return;

    if (e.key === "ArrowRight") {
      goToNextSlide();
    } else if (e.key === "ArrowLeft") {
      goToPreviousSlide();
    } else if (e.key === "Escape" && handle.active) {
      handle.exit();
    }
  };

  const handleSlideClick = (e) => {
    const slideWidth = e.target.clientWidth;
    const clickX = e.clientX - e.target.getBoundingClientRect().left;

    if (clickX > slideWidth / 2) {
      goToNextSlide();
    } else {
      goToPreviousSlide();
    }
  };

  const handleMouseMove = () => {
    setIsMouseMoving(true);
    setTimeout(() => setIsMouseMoving(false), 2000);
  };

  const handleFocus = () => {
    setIsComponentFocused(true);
  };

  const handleBlur = () => {
    setIsComponentFocused(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isComponentFocused, handle.active]);

  useEffect(() => {
    if (thumbnailRefs.current[currentSlide]) {
      thumbnailRefs.current[currentSlide].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentSlide]);

  return (
    <>
      <div
        className={styles.slideshowContainer}
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id="presentation"
        style={{ cursor: isMouseMoving ? "pointer" : "none" }}
      >
        <FullScreen handle={handle}>
          <div
            className={cn(styles.slideshow, handle.active && styles.fullscreen)}
            onMouseMove={handleMouseMove}
          >
            <div
              className={styles.slides}
              onClick={handleSlideClick}
              style={{
                height: !handle.active ? "calc(100vh - 230px)" : "100%",
                maxHeight: "1000px",
              }}
            >
              {slides.length > 0 ? (
                <img
                  src={slides[currentSlide]}
                  alt={`Slide ${currentSlide}`}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : (
                <div className={styles.emptySlide}>
                  <button onClick={goToFirstSlide}>En başa dön</button>
                  {handle.active && (
                    <button onClick={toggleFullscreen}>Tam Ekrandan Çık</button>
                  )}
                </div>
              )}
            </div>
            <div
              className={cn(
                styles.thumbnails,
                handle.active && styles.fullscreenThumbnails
              )}
            >
              {thumbs.map((thumb, index) => (
                <img
                  key={index}
                  ref={(el) => (thumbnailRefs.current[index] = el)}
                  src={thumb}
                  alt={`Thumbnail ${index}`}
                  className={cn(index === currentSlide && styles.active)}
                  onClick={() => handleThumbnailClick(index)}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ))}
            </div>
          </div>
        </FullScreen>
      </div>
      <Button
        onClick={toggleFullscreen}
        className={styles.fullscreenToggle}
        label={handle.active ? "Exit Fullscreen" : "Enter Fullscreen"}
        kind="text"
      />
    </>
  );
};

export default Slideshow;
