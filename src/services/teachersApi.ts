// import { db } from "./firebase";
// import { ref, get, query, orderByKey, startAt, endAt } from "firebase/database";

// export async function fetchTeachersSlice(fromIndex: number, limit: number) {
//   const start = String(fromIndex);
//   const end = String(fromIndex + limit - 1);

//   const q = query(
//     ref(db, "teachers"),
//     orderByKey(),
//     startAt(start),
//     endAt(end),
//   );

//   const snap = await get(q);

//   if (!snap.exists()) return [];

//   const data = snap.val() as Record<string, any>;

//   return Object.keys(data)
//     .sort((a, b) => Number(a) - Number(b))
//     .map((key) => ({
//       id: key,
//       ...data[key],
//     }));
// }
import { db } from "./firebase";
import { ref, get, query, orderByKey, startAt, endAt } from "firebase/database";
import type { Teacher } from "../types/teacher";
type TeacherDb = Omit<Teacher, "id">;

export async function fetchTeachersSlice(
  fromIndex: number,
  limit: number,
): Promise<Teacher[]> {
  const start = String(fromIndex);
  const end = String(fromIndex + limit - 1);

  const q = query(
    ref(db, "teachers"),
    orderByKey(),
    startAt(start),
    endAt(end),
  );

  const snap = await get(q);

  if (!snap.exists()) return [];

  const data = snap.val() as Record<string, TeacherDb>;

  // Превращаем { "0": {...}, "1": {...} } -> [{...}, {...}]
  return Object.keys(data)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => ({ id: key, ...data[key] }));
}

export async function fetchAllTeachers(): Promise<Teacher[]> {
  const snap = await get(ref(db, "teachers"));
  if (!snap.exists()) return [];

  const data = snap.val() as Record<string, TeacherDb>;

  return Object.keys(data)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => ({
      id: key,
      ...data[key],
    }));
}
