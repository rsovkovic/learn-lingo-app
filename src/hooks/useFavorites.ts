// import { useEffect, useMemo, useState } from "react";

// const STORAGE_KEY = "favorites_teacher_ids";

// export function useFavorites() {
//   const [ids, setIds] = useState<string[]>([]);

//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       const parsed = raw ? (JSON.parse(raw) as unknown) : [];
//       setIds(
//         Array.isArray(parsed)
//           ? parsed.filter((x) => typeof x === "string")
//           : [],
//       );
//     } catch {
//       setIds([]);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
//   }, [ids]);

//   const set = useMemo(() => new Set(ids), [ids]);

//   const isFavorite = (id: string) => set.has(id);

//   const toggleFavorite = (id: string) => {
//     setIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
//     );
//   };

//   return { favoriteIds: ids, isFavorite, toggleFavorite };
// }

// import { useEffect, useMemo, useRef, useState } from "react";

// const STORAGE_KEY = "favorites_teacher_ids";

// export function useFavorites() {
//   const [ids, setIds] = useState<string[]>([]);
//   const hydratedRef = useRef(false);
//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       const parsed = raw ? (JSON.parse(raw) as unknown) : [];
//       const safeIds = Array.isArray(parsed)
//         ? parsed.filter((x) => typeof x === "string")
//         : [];

//       setIds(safeIds);
//     } catch {
//       setIds([]);
//     } finally {
//       hydratedRef.current = true;
//     }
//   }, []);

//   useEffect(() => {
//     if (!hydratedRef.current) return;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
//   }, [ids]);

//   const set = useMemo(() => new Set(ids), [ids]);

//   const isFavorite = (id: string) => set.has(id);

//   const toggleFavorite = (id: string) => {
//     setIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
//     );
//   };

//   return { favoriteIds: ids, isFavorite, toggleFavorite };
// }

// import { useEffect, useMemo, useRef, useState } from "react";

// const STORAGE_KEY = "favorites_teacher_ids";

// function normalizeIds(value: unknown): string[] {
//   if (!Array.isArray(value)) return [];
//   return value.map((x) => String(x)).filter(Boolean);
// }

// export function useFavorites() {
//   const [ids, setIds] = useState<string[]>([]);
//   const hydratedRef = useRef(false);

//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       const parsed = raw ? (JSON.parse(raw) as unknown) : [];
//       setIds(normalizeIds(parsed));
//     } catch {
//       setIds([]);
//     } finally {
//       hydratedRef.current = true;
//     }
//   }, []);

//   useEffect(() => {
//     if (!hydratedRef.current) return;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
//   }, [ids]);

//   const set = useMemo(() => new Set(ids), [ids]);

//   const isFavorite = (id: string) => set.has(String(id));

//   const toggleFavorite = (id: string) => {
//     const sid = String(id);
//     setIds((prev) =>
//       prev.includes(sid) ? prev.filter((x) => x !== sid) : [...prev, sid],
//     );
//   };

//   return { favoriteIds: ids, isFavorite, toggleFavorite };
// }
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "favorites_teacher_ids";

function readIdsFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((x) => String(x)).filter(Boolean);
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>(readIdsFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const set = useMemo(() => new Set(ids), [ids]);

  const isFavorite = (id: string) => set.has(String(id));

  const toggleFavorite = (id: string) => {
    const sid = String(id);
    setIds((prev) =>
      prev.includes(sid) ? prev.filter((x) => x !== sid) : [...prev, sid],
    );
  };

  return { favoriteIds: ids, isFavorite, toggleFavorite };
}
