// he imagekit.js file is usually used to set up and manage ImageKit, a service for image uploading, 
// optimization, and transformation. It can:
// Connect your app to ImageKit using API keys.
// Help upload images to ImageKit.
// Generate image URLs with transformations (resize, crop, etc.).
// Make it easy to use ImageKit features in your app.
// It acts as a helper for working with images in your project.

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

export const requestSignedTransformUrl = async (url, transformations = []) => {
  if (!url) return "";

  try {
    const response = await fetch("/api/imagekit/transform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, transformations }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody?.error || "Failed to sign ImageKit URL");
    }

    const data = await response.json();
    return data?.url || buildImageKitTransformUrl(url, transformations);
  } catch (error) {
    console.error("Failed to fetch signed ImageKit URL:", error);
    return buildImageKitTransformUrl(url, transformations);
  }
};
