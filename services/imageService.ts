// services/unsplashService.ts
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

type Photo = {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
};

export const fetchRandomImages = async (query = "code", count = 1) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&count=${count}&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();
    const formattedData = data.map((photo: Photo) => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      user: {
        name: photo.user.name,
        link: photo.user.links.html,
      },
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching Unsplash images:", error);
    return [];
  }
};
