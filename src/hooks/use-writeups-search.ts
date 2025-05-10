import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  useQueryStates,
} from "nuqs"

export const useWriteupsSearch = () => {
  return useQueryStates(
    {
      search: parseAsString.withDefault(""),
      authors: parseAsArrayOf(parseAsString).withDefault([]),
      programs: parseAsArrayOf(parseAsString).withDefault([]),
      bugs: parseAsArrayOf(parseAsString).withDefault([]),
      onlyWithNotes: parseAsBoolean.withDefault(false),
      onlyRead: parseAsBoolean.withDefault(false),
      source: parseAsString.withDefault("all"),
      severity: parseAsString.withDefault("all"),
      sortBy: parseAsString.withDefault("publishedAt"),
      sortOrder: parseAsString.withDefault("desc"),
    },
    {
      history: "push",
      shallow: true,
      throttleMs: 0,
    }
  )
}
