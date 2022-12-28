// https://github.com/jquense/yup/issues/971#issuecomment-675528093
const transformNaN = (value) => (isNaN(value) ? undefined : value);
// https://github.com/jquense/yup/issues/764#issuecomment-915133801
const transformDate = (value) =>
  value instanceof Date && !isNaN(value) ? value : null;

export { transformNaN, transformDate };
