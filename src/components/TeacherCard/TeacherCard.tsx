import { useState } from "react";
import type { Teacher } from "../../types/teacher";
import BookTrialModal from "../BookTrialModal/BookTrialModal";

import css from "./TeacherCard.module.css";

type Props = {
  teacher: Teacher;
  selectedLevel?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
};

export default function TeacherCard({
  teacher,
  selectedLevel = "",
  isFavorite = false,
  onToggleFavorite,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);

  const handleToggle = () => onToggleFavorite?.(teacher.id);

  return (
    <>
      <article className={css.teacherContainer}>
        <div className={css.avatarBox}>
          <img
            src={teacher.avatar_url || "/placeholder-avatar.png"}
            alt={`${teacher.name} ${teacher.surname} avatar`}
            className={css.avatar}
          />
          <svg width={12} height={12} className={css.onlineIcon}>
            <use href="/sprite.svg#greenround" />
          </svg>
        </div>

        <div className={css.container}>
          <div className={css.topRow}>
            <p className={css.label}>Languages</p>

            <div className={css.meta}>
              <div className={css.metaItem}>
                <svg width={16} height={16} className={css.iconStroke}>
                  <use href="/sprite.svg#book-open-01" />
                </svg>
                <p>Lessons online</p>
              </div>

              <p>Lessons done: {teacher.lessons_done}</p>

              <div className={css.metaItem}>
                <svg width={16} height={16} className={css.iconFill}>
                  <use href="/sprite.svg#star" />
                </svg>
                <p>Rating: {teacher.rating}</p>
              </div>

              <p>
                Price / 1 hour:{" "}
                <span className={css.price}>{teacher.price_per_hour}$</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggle}
              className={css.heartBtn}
              aria-label="Toggle favorite"
            >
              <svg
                width={26}
                height={26}
                className={isFavorite ? css.favorite : css.heart}
              >
                <use href="/sprite.svg#heart" />
              </svg>
            </button>
          </div>

          <h2 className={css.name}>
            {teacher.name} {teacher.surname}
          </h2>

          <div className={css.teacherInfoBox}>
            <p>
              Speaks:{" "}
              <span className={css.underline}>
                {teacher.languages?.join(", ") || "-"}
              </span>
            </p>
            <p>
              Lesson info: <span>{teacher.lesson_info || "-"}</span>
            </p>
            <p>
              Conditions: <span>{teacher.conditions || "-"}</span>
            </p>
          </div>

          {!expanded && (
            <button
              type="button"
              className={css.readMoreBtn}
              onClick={() => setExpanded(true)}
            >
              Read more
            </button>
          )}

          {expanded && (
            <div className={css.expanded}>
              <p className={css.experience}>{teacher.experience || "-"}</p>

              <ul className={css.reviewsList}>
                {teacher.reviews?.length ? (
                  teacher.reviews.map((r, index) => (
                    <li
                      className={css.review}
                      key={`${teacher.id}-review-${index}`}
                    >
                      <div className={css.reviewHeader}>
                        <div className={css.reviewerAvatar}>
                          {r.reviewer_avatar ? (
                            <img
                              src={r.reviewer_avatar}
                              alt={`${r.reviewer_name} avatar`}
                              className={css.reviewerImg}
                            />
                          ) : (
                            <div className={css.reviewerFallback}>
                              {(
                                r.reviewer_name?.trim()?.[0] || "U"
                              ).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div>
                          <p className={css.reviewerName}>{r.reviewer_name}</p>
                          <div className={css.reviewRating}>
                            <svg width={16} height={16}>
                              <use href="/sprite.svg#star" />
                            </svg>
                            <span>{Number(r.reviewer_rating).toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      <p className={css.reviewComment}>{r.comment}</p>
                    </li>
                  ))
                ) : (
                  <li className={css.noReviews}>No reviews yet.</li>
                )}
              </ul>
            </div>
          )}

          <ul className={css.levelsList}>
            {teacher.levels?.map((lvl) => (
              <li
                key={lvl}
                className={`${css.level} ${selectedLevel === lvl ? css.activeLevel : ""}`}
              >
                #{lvl}
              </li>
            ))}
          </ul>

          {expanded && (
            <div className={css.btnBox}>
              <button
                type="button"
                className={css.trialBtn}
                onClick={() => setIsBookOpen(true)}
              >
                Book trial lesson
              </button>
            </div>
          )}
        </div>
      </article>
      {isBookOpen && (
        <BookTrialModal
          teacher={teacher}
          onClose={() => setIsBookOpen(false)}
        />
      )}
    </>
  );
}
