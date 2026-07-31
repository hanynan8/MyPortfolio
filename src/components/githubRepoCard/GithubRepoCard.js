import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import ProjectLanguages from "../../components/projectLanguages/ProjectLanguages";
import "./GithubRepoCard.css";
import { Fade } from "react-reveal";

/* ───────────────────────────────────────────────
   Image Slider Modal Component
   (same size / design as the ProjectCard slider)
─────────────────────────────────────────────── */
function ImageSliderModal({ images, title, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const goLeft = useCallback(
    (e) => {
      e && e.stopPropagation();
      setIsLoading(true);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },
    [images.length]
  );

  const goRight = useCallback(
    (e) => {
      e && e.stopPropagation();
      setIsLoading(true);
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0);
      return;
    }
    setIsLoading(true);
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goLeft();
      if (e.key === "ArrowRight") goRight();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, goLeft, goRight, onClose]);

  if (!isOpen) return null;

  const reversedImages = [...images].slice().reverse();
  const reversedIndex = images.length - 1 - currentIndex;

  const modal = (
    <div className="ghslider-overlay" onClick={onClose}>
      <div className="ghslider-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ghslider-header">
          <h3 className="ghslider-title">{title}</h3>
          <button
            className="ghslider-close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Image Area */}
        <div className="ghslider-imgwrap">
          {isLoading && (
            <div className="ghslider-loading">
              <div className="ghslider-spinner" />
              <span>Loading...</span>
            </div>
          )}
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="ghslider-image"
            style={{ opacity: isLoading ? 0 : 1 }}
            onLoad={() => setIsLoading(false)}
          />

          <button
            className="ghslider-arrow ghslider-arrow-left"
            onClick={goLeft}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="ghslider-arrow ghslider-arrow-right"
            onClick={goRight}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="ghslider-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="ghslider-dots">
          {reversedImages.map((_, i) => (
            <button
              key={i}
              className={`ghslider-dot ${
                i === reversedIndex ? "ghslider-dot-active" : ""
              }`}
              onClick={() => setCurrentIndex(images.length - 1 - i)}
              aria-label={`Go to image ${images.length - i}`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

/* ───────────────────────────────────────────────
   Github Repo Card
─────────────────────────────────────────────── */
export default function GithubRepoCard({ repo, theme }) {
  const [modalOpen, setModalOpen] = useState(false);

  function openRepoinNewTab(url) {
    var win = window.open(url, "_blank");
    if (win) win.focus();
  }

  // build a normalized images list: prefer repo.images (array), fallback to single repo.image
  const images =
    repo && Array.isArray(repo.images) && repo.images.length > 0
      ? repo.images
      : repo && repo.image && repo.image.trim().length > 0
      ? [repo.image]
      : [];

  const hasImage = images.length > 0;
  const hasMultipleImages = images.length > 1;

  function handleImageClick(e) {
    if (hasMultipleImages) {
      e.stopPropagation();
      setModalOpen(true);
    }
    // if there's only a single image (or none), let the click bubble up
    // and open the repo link as usual
  }

  return (
    <div className="repo-card-div" style={{ backgroundColor: theme.highlight }}>
      <Fade bottom duration={2000} distance="40px">
        <div key={repo.id} onClick={() => openRepoinNewTab(repo.url)}>
          {/* صورة المشروع أو placeholder */}
          {hasImage ? (
            <div className="repo-image-wrapper" onClick={handleImageClick}>
              <img
                src={images[0]}
                alt={repo.name + " screenshot"}
                className="repo-image"
                loading="lazy"
              />

              {hasMultipleImages && (
                <span className="repo-image-count-badge">
                  📷 {images.length} photos
                </span>
              )}
            </div>
          ) : (
            <div
              className="repo-image-placeholder"
              role="img"
              aria-label={repo.name + " placeholder image"}
            >
              <div className="repo-image-placeholder-text">{repo.name}</div>
            </div>
          )}

          <div className="repo-name-div">
            <svg
              aria-hidden="true"
              className="octicon repo-svg"
              height="16"
              role="img"
              viewBox="0 0 12 16"
              width="12"
            >
              <path
                fillRule="evenodd"
                d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
              ></path>
            </svg>
            <p className="repo-name" style={{ color: theme.text }}>
              {repo.name}
            </p>
          </div>

          <p className="repo-description" style={{ color: theme.text }}>
            {repo.description}
          </p>

          <div className="repo-details">
            <p
              className="repo-creation-date subTitle"
              style={{ color: theme.secondaryText }}
            >
              Created on {repo.createdAt ? repo.createdAt.split("T")[0] : ""}
            </p>
            <ProjectLanguages
              className="repo-languages"
              logos={repo.languages}
            />
          </div>
        </div>
      </Fade>

      {hasMultipleImages && (
        <ImageSliderModal
          images={images}
          title={repo.name}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
