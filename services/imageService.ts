// services/unsplashService.ts
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export interface UnsplashImage {
  id: string;
  url: string;
  thumb: string;
  user: {
    name: string;
    link: string;
  };
  downloadLocation: string;
}

export const fetchRandomImages = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch images: ${errorMessage}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      url: data.urls.regular,
      thumb: data.urls.thumb,
      user: {
        name: data.user.name,
        link: data.user.links.html,
      },
      downloadLocation: data.links.download_location,
    };
  } catch (error) {
    return null;
  }
};
