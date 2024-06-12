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

export const compressImage = (
  file: File,
  minWitdh: number,
  quality: number
) => {
  return new Promise((res) => {
    const urlFile = URL.createObjectURL(file);
    const image = new Image();
    image.src = urlFile;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.width =
        image.width < minWitdh ? image.width : minWitdh;
      canvas.height = image.height / (image.width / minWitdh);
      canvas
        .getContext("2d")
        ?.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          const newFile = new File([blob as Blob], file.name, {
            type: file.type,
            lastModified: new Date().getTime(),
          });
          res(newFile);
        },

        file.type,
        quality
      );
    };
  });
};
