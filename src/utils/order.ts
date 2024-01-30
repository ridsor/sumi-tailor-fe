export const getDay = (timestamp: string | number) => {
  const date = new Date(timestamp);
  return Intl.DateTimeFormat("id-ID", { day: "numeric" }).format(date);
};

export const getMonth = (timestamp: string | number) => {
  const date = new Date(timestamp);
  return Intl.DateTimeFormat("id-ID", { month: "short" }).format(date);
};

export const getTime = (timestamp: string | number) => {
  const date = new Date(timestamp);
  return Intl.DateTimeFormat("id-ID", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};
