import css from "./Teachers.module.css";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import {
  fetchAllTeachers,
  fetchTeachersSlice,
} from "../../services/teachersApi";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import type { Teacher } from "../../types/teacher";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuthState } from "../../hooks/useAuthState";
import Toast from "../../components/Toast/Toast";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import CustomDropdown from "../../components/UI/CustomDropdown/CustomDropdown";

type Filters = { language: string; level: string; price: string };
const PAGE_SIZE = 4;

export default function Teachers() {
  const [allLoaded, setAllLoaded] = useState<Teacher[]>([]);
  const [allForFilters, setAllForFilters] = useState<Teacher[]>([]);
  const [fromIndex, setFromIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const listRef = useRef<HTMLUListElement | null>(null);
  const scrollToIndexRef = useRef<number | null>(null);

  const [toast, setToast] = useState<string | null>(null);
  const { isAuthed } = useAuthState();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [filters, setFilters] = useState<Filters>({
    language: "",
    level: "",
    price: "",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  };

  const applyFilters = useCallback(
    (list: Teacher[]) =>
      list.filter((t) => {
        if (filters.language && !t.languages?.includes(filters.language))
          return false;
        if (filters.level && !t.levels?.includes(filters.level)) return false;

        if (filters.price) {
          const maxPrice = Number(filters.price);
          if (!Number.isNaN(maxPrice) && t.price_per_hour > maxPrice)
            return false;
        }

        return true;
      }),
    [filters],
  );

  const filteredTeachers = useMemo(
    () => applyFilters(allLoaded),
    [allLoaded, applyFilters],
  );

  const baseForAvailability = useMemo(() => {
    const base = allForFilters.length ? allForFilters : allLoaded;
    if (!filters.language) return base;
    return base.filter((t) => t.languages?.includes(filters.language));
  }, [allForFilters, allLoaded, filters.language]);

  const availableLevels = useMemo(() => {
    const set = new Set<string>();
    baseForAvailability.forEach((t) =>
      t.levels?.forEach((lvl) => set.add(lvl)),
    );
    return set;
  }, [baseForAvailability]);

  const isPriceOptionAvailable = useCallback(
    (maxPrice: number) =>
      baseForAvailability.some((t) => t.price_per_hour <= maxPrice),
    [baseForAvailability],
  );

  const resetFilters = () => {
    setFilters({
      language: "",
      level: "",
      price: "",
    });
  };

  useEffect(() => {
    const init = async () => {
      const [first, all] = await Promise.all([
        fetchTeachersSlice(0, PAGE_SIZE),
        fetchAllTeachers(),
      ]);

      setAllLoaded(first);
      setFromIndex(0);
      setHasMore(first.length >= PAGE_SIZE);

      setAllForFilters(all);
    };

    init();
  }, []);

  const loadMoreRaw = useCallback(async () => {
    const nextFrom = fromIndex + PAGE_SIZE;
    const next = await fetchTeachersSlice(nextFrom, PAGE_SIZE);

    if (next.length === 0) {
      setHasMore(false);
      return;
    }

    setAllLoaded((prev) => {
      scrollToIndexRef.current = prev.length;

      const existing = new Set(prev.map((t) => t.id));
      const unique = next.filter((t) => !existing.has(t.id));
      return [...prev, ...unique];
    });

    setFromIndex(nextFrom);
    if (next.length < PAGE_SIZE) setHasMore(false);
  }, [fromIndex]);

  useEffect(() => {
    const idx = scrollToIndexRef.current;
    if (idx === null) return;
    const ul = listRef.current;
    const el = ul?.children?.[idx] as HTMLElement | undefined;

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    scrollToIndexRef.current = null;
  }, [allLoaded.length]);

  useEffect(() => {
    if (!hasMore) return;
    if (filteredTeachers.length > 0) return;
    if (allLoaded.length === 0) return;

    const id = window.setTimeout(() => {
      loadMoreRaw();
    }, 0);

    return () => window.clearTimeout(id);
  }, [
    filters,
    filteredTeachers.length,
    hasMore,
    allLoaded.length,
    loadMoreRaw,
  ]);

  const handleHeartClick = (id: string) => {
    if (!isAuthed) {
      showToast("This functionality is available only to authorized users");
      return;
    }
    toggleFavorite(String(id));
  };

  const languageOptions = [
    "English",
    "German",
    "Spanish",
    "Italian",
    "French",
    "Korean",
    "Mandarin Chinese",
    "Vietnamese",
  ];

  const levelOptions = [
    "A1 Beginner",
    "A2 Elementary",
    "B1 Intermediate",
    "B2 Upper-Intermediate",
    "C1 Advanced",
    "C2 Proficient",
  ];

  const priceOptions = ["10", "20", "30", "40"];

  return (
    <section className={css.teachers}>
      <div className={css.teachersContainer}>
        <div className={css.filtersBox}>
          <CustomDropdown
            label="Languages"
            width="220px"
            selectedValue={filters.language}
            options={[
              { label: "All", value: "" },
              ...languageOptions.map((l) => ({ label: l, value: l })),
            ]}
            onChange={(val) =>
              setFilters((prev) => ({
                ...prev,
                language: val,
                level: "",
                price: "",
              }))
            }
          />

          <CustomDropdown
            label="Level of knowledge"
            width="200px"
            selectedValue={filters.level}
            options={[
              { label: "All", value: "" },
              ...levelOptions.map((lvl) => ({
                label: lvl,
                value: lvl,
                disabled: filters.language ? !availableLevels.has(lvl) : false,
              })),
            ]}
            onChange={(val) => setFilters((prev) => ({ ...prev, level: val }))}
          />

          <CustomDropdown
            label="Price"
            width="120px"
            selectedValue={filters.price}
            options={[
              { label: "All", value: "" },
              ...priceOptions.map((p) => ({
                label: `${p} $`,
                value: p,
                disabled: filters.language
                  ? !isPriceOptionAvailable(Number(p))
                  : false,
              })),
            ]}
            onChange={(val) => setFilters((prev) => ({ ...prev, price: val }))}
          />
          <button
            type="button"
            onClick={resetFilters}
            className={css.resetBtn}
            style={{
              visibility:
                filters.language || filters.level || filters.price
                  ? "visible"
                  : "hidden",
            }}
          >
            Reset filters
          </button>
        </div>

        <ul className={css.teachersList} ref={listRef}>
          {filteredTeachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherCard
                teacher={teacher}
                selectedLevel={filters.level}
                isFavorite={isFavorite(String(teacher.id))}
                onToggleFavorite={handleHeartClick}
              />
            </li>
          ))}
        </ul>
        <ScrollToTopButton />
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}

        {hasMore && (
          <div className={css.moreWrap}>
            <button type="button" onClick={loadMoreRaw} className={css.moreBtn}>
              Load more
            </button>
          </div>
        )}

        {!hasMore && filteredTeachers.length === 0 && (
          <p className={css.empty}>No teachers found for selected filters.</p>
        )}
      </div>
    </section>
  );
}
