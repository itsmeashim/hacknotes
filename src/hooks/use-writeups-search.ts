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
      history: "replace", // Use replace instead of push to avoid adding to browser history
      shallow: true,
      throttleMs: 0, // Disable throttling as we're handling debouncing in the component
    }
  )
}
