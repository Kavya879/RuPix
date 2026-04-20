export const isImageKitUrl = (url) => {
  if (!url) return false;
  return /(^https?:\/\/[^\s]+imagekit\.io\/)|(^https?:\/\/ik\.imagekit\.io\/)/i.test(
    url
  );
};

export const getImageKitBaseUrl = (url) => {
  if (!url) return "";
  return url.split("?")[0];
};

export const buildImageKitTransformUrl = (url, transformations = []) => {
  if (!url) return "";

  const baseUrl = getImageKitBaseUrl(url);
  const cleanedTransformations = transformations.filter(Boolean);

  if (!cleanedTransformations.length) {
    return baseUrl;
  }

  const tr = cleanedTransformations.join(",");
  return `${baseUrl}?tr=${tr}`;
};
