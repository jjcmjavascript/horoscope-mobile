export const getDateYmd = (date?: Date) => {
  const currentDate = date || new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return `${year}-${month}-${day}`;
};
