// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
const capitalizeFirstLetter = (str, restToLowerCase = true) => {
  const restOfSentence = str.slice(1);
  const firstLetter = str.charAt(0);

  const sentence = restToLowerCase
    ? restOfSentence.toLowerCase()
    : restOfSentence;

  return firstLetter.toUpperCase() + sentence;
};

const capitalizeSentence = (
  str,
  capitalizeEveryWord = true,
  { splitSeparator = " ", joinSeparator = " " } = {}
) => {
  const words = str.toLowerCase().split(splitSeparator);

  if (capitalizeEveryWord) {
    return words.map((word) => capitalizeFirstLetter(word)).join(joinSeparator);
  }

  return capitalizeFirstLetter(words.join(joinSeparator));
};

const capitalizeObjectKeys = (
  object,
  separator,
  {
    capitalizeEveryWord = true,
    asObject = false,
    keyName,
    valueName = "id",
  } = {}
) => {
  const hasCustomKeyValueNames = keyName && valueName;

  const array = Object.entries(object).map(([key, value]) => {
    const newKey = capitalizeSentence(key, capitalizeEveryWord, {
      splitSeparator: separator,
    });

    if (hasCustomKeyValueNames) {
      return { [keyName]: newKey, [valueName]: value };
    }

    return { [newKey]: value };
  });

  if (!hasCustomKeyValueNames && asObject) {
    // https://stackoverflow.com/a/49247635/13562806
    return Object.assign({}, ...array);
  }

  // Si tiene llaves con nombres personalizados, no se puede regresar como
  // objeto. Solo es posible retornarlo como objeto cuando no tiene key-value
  // personalizados. Esto se debe a que cada objeto del arreglo tendría la
  // estructura:
  // ```
  // {
  //   [keyName]: newKey,
  //   [valueName]: value,
  // }
  // ```
  if (hasCustomKeyValueNames && asObject) {
    throw new Error(
      "No es posible regresar como objeto si tiene key-value personalizados."
    );
  }

  return array;
};

export { capitalizeFirstLetter, capitalizeSentence, capitalizeObjectKeys };
