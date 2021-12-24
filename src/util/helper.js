const endpoint = process.env.REACT_APP_IMAGE_URL || "https://greatgable.fra1.cdn.digitaloceanspaces.com/";
const noImage = "/images/noimage.png";
export const getImage = image => {
  if (!image) return noImage;
  return endpoint + image;
};
