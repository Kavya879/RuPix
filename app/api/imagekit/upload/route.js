import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { auth } from "@clerk/nextjs/server";

const getImageKitConfig = () => {
  const publicKey =
    process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint =
    process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  return {
    publicKey,
    urlEndpoint,
    privateKey,
  };
};

export async function POST(request) {
  try {
    const { publicKey, urlEndpoint, privateKey } = getImageKitConfig();

    if (!publicKey || !urlEndpoint || !privateKey) {
      return NextResponse.json(
        {
          success: false,
          error: "ImageKit is not configured",
          details:
            "Missing IMAGEKIT_PUBLIC_KEY (or NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY), IMAGEKIT_URL_ENDPOINT (or NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT), or IMAGEKIT_PRIVATE_KEY in environment variables.",
        },
        { status: 500 }
      );
    }

    const imagekit = new ImageKit({
      publicKey,
      urlEndpoint,
      privateKey,
    });

    //from convexquery get userid
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get("file");
    const fileName = formData.get("fileName");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedFileName =
      fileName?.replace(/[^a-zA-Z0-9.-]/g, "_") || "upload";
    const uniqueFileName = `${userId}/${timestamp}_${sanitizedFileName}`;

    // Upload to ImageKit - Simple server-side upload
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: uniqueFileName,
      folder: "/projects",
    });

    // Generate thumbnail URL using ImageKit transformations
    const thumbnailUrl = imagekit.url({
      src: uploadResponse.url,
      transformation: [
        {
          width: 400,
          height: 300,
          cropMode: "maintain_ar",
          quality: 80,
        },
      ],
    });

    // Return upload data
    return NextResponse.json({
      success: true,
      url: uploadResponse.url,
      thumbnailUrl: thumbnailUrl,
      fileId: uploadResponse.fileId,
      width: uploadResponse.width,
      height: uploadResponse.height,
      size: uploadResponse.size,
      name: uploadResponse.name,
    });
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload image",
        details: error.message,
      },
      { status: 500 }
    );
  }
}