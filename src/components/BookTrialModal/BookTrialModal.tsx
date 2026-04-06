// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import css from "./BookTrialModal.module.css";
// import type { Teacher } from "../../types/teacher";
// import {
//   bookTrialSchema,
//   type BookTrialValues,
// } from "../../validation/bookTrialSchema";

// type Props = {
//   teacher: Teacher;
//   onClose: () => void;
//   onSubmitSuccess?: () => void; // якщо захочеш після успіху щось зробити
// };

// const reasons = [
//   "Career and business",
//   "Lesson for kids",
//   "Living abroad",
//   "Exams and coursework",
//   "Culture, travel or hobby",
// ] as const;

// export default function BookTrialModal({
//   teacher,
//   onClose,
//   onSubmitSuccess,
// }: Props) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<BookTrialValues>({
//     resolver: yupResolver(bookTrialSchema),
//     defaultValues: {
//       reason: reasons[0],
//       fullName: "",
//       email: "",
//       phone: "",
//     },
//   });

//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, [onClose]);

//   const onSubmit = async (values: BookTrialValues) => {
//     // Тут поки просто імітація “відправки”
//     // Можеш потім додати запис у Firebase (не обов’язково в ТЗ)
//     console.log("BOOK TRIAL:", { teacherId: teacher.id, ...values });

//     reset();
//     onClose();
//     onSubmitSuccess?.();
//   };

//   return (
//     <div
//       className={css.backdrop}
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className={css.modal} onClick={(e) => e.stopPropagation()}>
//         <button
//           type="button"
//           className={css.closeBtn}
//           onClick={onClose}
//           aria-label="Close"
//         >
//           ×
//         </button>

//         <h2 className={css.title}>Book trial lesson</h2>
//         <p className={css.text}>
//           Our experienced tutor will assess your current language level, discuss
//           your learning goals, and tailor the lesson to your specific needs.
//         </p>

//         <div className={css.teacherRow}>
//           <img
//             className={css.teacherAvatar}
//             src={teacher.avatar_url}
//             alt={`${teacher.name} ${teacher.surname}`}
//           />
//           <div>
//             <p className={css.teacherLabel}>Your teacher</p>
//             <p className={css.teacherName}>
//               {teacher.name} {teacher.surname}
//             </p>
//           </div>
//         </div>

//         <p className={css.question}>
//           What is your main reason for learning English?
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
//           <div className={css.radios}>
//             {reasons.map((r) => (
//               <label key={r} className={css.radioItem}>
//                 <input type="radio" value={r} {...register("reason")} />
//                 <span>{r}</span>
//               </label>
//             ))}
//             {errors.reason && (
//               <p className={css.error}>{errors.reason.message}</p>
//             )}
//           </div>

//           <div className={css.field}>
//             <input placeholder="Full Name" {...register("fullName")} />
//             {errors.fullName && (
//               <p className={css.error}>{errors.fullName.message}</p>
//             )}
//           </div>

//           <div className={css.field}>
//             <input placeholder="Email" type="email" {...register("email")} />
//             {errors.email && (
//               <p className={css.error}>{errors.email.message}</p>
//             )}
//           </div>

//           <div className={css.field}>
//             <input placeholder="Phone number" {...register("phone")} />
//             {errors.phone && (
//               <p className={css.error}>{errors.phone.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className={css.submitBtn}
//             disabled={isSubmitting}
//           >
//             Book
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./BookTrialModal.module.css";
import type { Teacher } from "../../types/teacher";
import {
  bookTrialSchema,
  type BookTrialValues,
} from "../../validation/bookTrialSchema";

type Props = {
  teacher: Teacher;
  onClose: () => void;
};

const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
] as const;

export default function BookTrialModal({ teacher, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookTrialValues>({
    resolver: yupResolver(bookTrialSchema),
    defaultValues: {
      reason: reasons[0],
      fullName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const onSubmit = async (values: BookTrialValues) => {
    console.log("BOOK TRIAL:", { teacherId: teacher.id, ...values });
    reset();
    onClose();
  };

  return (
    <div
      className={css.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width={32} height={32}>
            <use href="/sprite.svg#x" />
          </svg>
        </button>

        <h2 className={css.title}>Book trial lesson</h2>
        <p className={css.text}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={css.teacherRow}>
          <img
            className={css.teacherAvatar}
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
          />
          <div>
            <p className={css.teacherLabel}>Your teacher</p>
            <p className={css.teacherName}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>

        <p className={css.question}>
          What is your main reason for learning English?
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.radios}>
            {reasons.map((r) => (
              <label key={r} className={css.radioItem}>
                <input
                  className={css.radioInput}
                  type="radio"
                  value={r}
                  {...register("reason")}
                />
                <span className={css.radioDot} />
                <span className={css.radioText}>{r}</span>
              </label>
            ))}
            {errors.reason && (
              <p className={css.error}>{errors.reason.message}</p>
            )}
          </div>

          <div className={css.field}>
            <input placeholder="Full Name" {...register("fullName")} />
            {errors.fullName && (
              <p className={css.error}>{errors.fullName.message}</p>
            )}

            <input placeholder="Email" type="email" {...register("email")} />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}

            <input placeholder="Phone number" {...register("phone")} />
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={css.submitBtn}
            disabled={isSubmitting}
          >
            Book
          </button>
        </form>
      </div>
    </div>
  );
}
