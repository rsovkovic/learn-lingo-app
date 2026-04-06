// import { useEffect, useMemo, useState } from "react";
// import TeacherCard from "../../components/TeacherCard/TeacherCard";
// import type { Teacher } from "../../types/teacher";
// import { fetchAllTeachers } from "../../services/teachersApi";
// import { useFavorites } from "../../hooks/useFavorites";
// import css from "./Favorites.module.css";

// export default function Favorites() {
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

//   useEffect(() => {
//     fetchAllTeachers().then(setTeachers).catch(console.error);
//   }, []);

//   const favoriteTeachers = useMemo(
//     () => teachers.filter((t) => favoriteIds.includes(t.id)),
//     [teachers, favoriteIds],
//   );

//   return (
//     <section>
//       <div className={css.favoritesContainer}>
//         {favoriteTeachers.length === 0 ? (
//           <p>No favorites yet.</p>
//         ) : (
//           <div>
//             {favoriteTeachers.map((teacher) => (
//               <TeacherCard
//                 key={teacher.id}
//                 teacher={teacher}
//                 isFavorite={isFavorite(teacher.id)}
//                 onToggleFavorite={toggleFavorite}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
import css from "../teachers/Teachers.module.css";
import { useEffect, useMemo, useState } from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import type { Teacher } from "../../types/teacher";
import { fetchAllTeachers } from "../../services/teachersApi";
import { useFavorites } from "../../hooks/useFavorites";

export default function Favorites() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    fetchAllTeachers().then(setTeachers).catch(console.error);
  }, []);

  const favoriteTeachers = useMemo(
    () => teachers.filter((t) => favoriteIds.includes(String(t.id))),
    [teachers, favoriteIds],
  );

  return (
    <section className={css.teachers}>
      <div className={css.teachersContainer}>
        {favoriteTeachers.length === 0 ? (
          <p className={css.empty}>No favorites yet.</p>
        ) : (
          <ul className={css.teachersList}>
            {favoriteTeachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherCard
                  teacher={teacher}
                  isFavorite={isFavorite(String(teacher.id))}
                  onToggleFavorite={toggleFavorite}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
