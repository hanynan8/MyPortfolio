import React from "react";
import ProjectLanguages from "../../components/projectLanguages/ProjectLanguages";
import "./GithubRepoCard.css";
import { Fade } from "react-reveal";

export default function GithubRepoCard({ repo, theme }) {
  function openRepoinNewTab(url) {
    var win = window.open(url, "_blank");
    if (win) win.focus();
  }

  // helper: is there an image and is it non-empty?
  const hasImage = repo && repo.image && repo.image.trim().length > 0;

  return (
    <div className="repo-card-div" style={{ backgroundColor: theme.highlight }}>
      <Fade bottom duration={2000} distance="40px">
        <div key={repo.id} onClick={() => openRepoinNewTab(repo.url)}>
          {/* صورة المشروع أو placeholder */}
          {hasImage ? (
            // لو الصور محطوطة في public/images استخدم مسار يبدأ بـ '/images/...' 
            <img
              src={repo.image}
              alt={repo.name + " screenshot"}
              className="repo-image"
              loading="lazy"
            />
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
            <ProjectLanguages className="repo-languages" logos={repo.languages} />
          </div>
        </div>
      </Fade>
    </div>
  );
}
