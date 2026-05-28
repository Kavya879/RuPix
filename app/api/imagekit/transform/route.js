import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const getImageKitConfig = () => {
  const publicKey =
    process.env.IMAGEKIT_PUBLIC_KEY ||
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint =
    process.env.IMAGEKIT_URL_ENDPOINT ||
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  return {
    publicKey,
    urlEndpoint,
    privateKey,
  };
};

const getBaseUrl = (url) => {
  if (!url) return "";
  return url.split("?")[0];
};

export async function POST(request) {
  try {
    const { publicKey, urlEndpoint, privateKey } = getImageKitConfig();

    if (!publicKey || !urlEndpoint || !privateKey) {
      return NextResponse.json(
        {
          error: "ImageKit is not configured",
          details:
            "Missing IMAGEKIT_PUBLIC_KEY (or NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY), IMAGEKIT_URL_ENDPOINT (or NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT), or IMAGEKIT_PRIVATE_KEY in environment variables.",
        },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { url, transformations } = body || {};

    if (!url || !Array.isArray(transformations)) {
      return NextResponse.json(
        { error: "Missing url or transformations" },
        { status: 400 }
      );
    }

    const imagekit = new ImageKit({
      publicKey,
      urlEndpoint,
      privateKey,
    });

    const cleanedTransformations = transformations.filter(Boolean);
    const raw = cleanedTransformations.join(",");

    const signedUrl = imagekit.url({
      src: getBaseUrl(url),
      transformation: raw ? [{ raw }] : [],
      signed: true,
    });

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("ImageKit transform error:", error);
    return NextResponse.json(
      {
        error: "Failed to create ImageKit URL",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
