/**
 * Converts a string to title case format.
 *
 * The function performs the following transformations:
 * - Inserts spaces before capital letters
 * - Ensures space between lowercase and uppercase letters
 * - Replaces underscores with spaces
 * - Replaces hyphens with spaces
 * - Capitalizes the first letter of each word
 * - Trims leading and trailing whitespace
 *
 * @param {string} [str] - The input string to convert to title case
 * @returns {string} The formatted title case string, or an empty string if input is undefined
 *
 * @example
 * toTitle("hello_world");
 * // Returns "Hello World"
 *
 * @example
 * toTitle("camelCaseExample");
 * // Returns "Camel Case Example"
 *
 * @example
 * toTitle("kebab-case-example");
 * // Returns "Kebab Case Example"
 */
export const toTitle = (str?: string | null | unknown): string => {
  return str && typeof str === "string"
    ? str
        .replace(/([A-Z])/g, " $1")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .trim()
    : "";
};
