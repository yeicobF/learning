// https://stackoverflow.com/a/40552372/13562806
export const transformObjectToFormData = (object) => {
  const formData = new FormData();

  Object.entries(object).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // console.log([...formData]);

  return formData;
};
