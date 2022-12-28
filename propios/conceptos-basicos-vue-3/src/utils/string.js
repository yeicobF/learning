/**
 * Replace multiple strings in a string
 *
 * ## Example
 *
 * @example
 * ```js
 *  const str = "I have a cat, a dog, and a goat.";
 *  const replacementsObj = {
 *  cat: "dog",
 *  dog: "goat",
 *  goat: "cat"
 *  };
 *
 * const stringWithReplacedValues = replaceMultipleStrings(str, replacementsObj);
 * console.log(stringWithReplacedValues);
 * // Output
 * // "I have a dog, a goat, and a cat."
 *```
 *
 * ## Sources
 *
 * [Stack Overflow | Replace multiple strings with multiple other
 * strings](https://stackoverflow.com/a/67374697/13562806)
 * https://jsfiddle.net/sd2x678b/
 * @param {String} str String to replace
 * @param {Object} replacementsObj Object with keys to replace and values to
 * replace with
 * @returns {String} String with replaced values
 */
const replaceMultipleStrings = (str, replacementsObj) => {
  const regex = new RegExp(
    "\\b(?:" + Object.values(replacementsObj).join("|") + ")\\b",
    "gi"
  );
  return str.replace(regex, (matched) => replacementsObj[matched]);
};

export { replaceMultipleStrings };
