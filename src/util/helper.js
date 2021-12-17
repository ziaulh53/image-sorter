const endpoint = process.env.REACT_APP_IMAGE_URL || "https://assets.chillfitrave.com/";
const noImage = "/images/noimage.png";
export const getImage = image => {
  if (!image) return noImage;
  return endpoint + image;
};
