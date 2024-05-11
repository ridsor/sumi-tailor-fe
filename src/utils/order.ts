import html2canvas from "html2canvas";

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

export async function downloadImageFromElement(
  element: HTMLDivElement,
  filename: string
) {
  const canvas = await html2canvas(element);
  const data = canvas.toDataURL("image/png");
  const link = document.createElement("a");

  canvas.width = 600;
  canvas.height = 600;

  if (typeof link.download === "string") {
    link.href = data;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(data);
  }
}
