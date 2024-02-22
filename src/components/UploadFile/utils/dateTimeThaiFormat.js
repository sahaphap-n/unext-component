const dateTimeThaiFormat = (dateTime) => {
  const format = new Date(dateTime)?.toLocaleString("th-TH");
  const dateTimeSplit = format?.split(" ");
  const dateSplit = dateTimeSplit[0]?.split("/");
  const day = dateSplit[0]?.length === 1 ? "0" + dateSplit[0] : dateSplit[0];
  const month = dateSplit[1]?.length === 1 ? "0" + dateSplit[1] : dateSplit[1];
  const year = dateSplit[2];

  const dateTimeFormat = `${day}/${month}/${year} ${dateTimeSplit[1]}`; 

  return dateTimeFormat;
};

export default dateTimeThaiFormat;
