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
