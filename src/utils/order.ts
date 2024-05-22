export const getDay = (timestamp: string | number) => {
  let date;
  if (timestamp) {
    date = new Date(timestamp);
  } else {
    date = new Date();
  }
  return Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    timeZone: "Asia/Jayapura",
  }).format(date);
};

export const getMonth = (timestamp: string | number) => {
  let date;
  if (timestamp) {
    date = new Date(timestamp);
  } else {
    date = new Date();
  }
  return Intl.DateTimeFormat("id-ID", {
    month: "short",
    timeZone: "Asia/Jayapura",
  }).format(date);
};

export const getTime = (timestamp: string | number) => {
  let date;
  if (timestamp) {
    date = new Date(timestamp);
  } else {
    date = new Date();
  }
  return Intl.DateTimeFormat("id-ID", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Jayapura",
  }).format(date);
};

export const getYear = (timestamp: string | number) => {
  let date;
  if (timestamp) {
    date = new Date(timestamp);
  } else {
    date = new Date();
  }
  return Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    timeZone: "Asia/Jayapura",
  }).format(date);
};
