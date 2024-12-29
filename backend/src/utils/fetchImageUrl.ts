const baseUrl = 'https://en.wikipedia.org/w/api.php';

interface ImageInfo {
  url: string;
}

interface Page {
  imageinfo?: ImageInfo[];
}

interface WikipediaResponse {
  query: {
    pages: {
      [key: string]: Page;
    };
  };
}

export const fetchImageUrl = async (fileName: string): Promise<string> => {
  const fileTitle = fileName.startsWith('File:') ? fileName.trim() : `File:${fileName.trim()}`;
  
  const imageParams = {
    action: 'query',
    titles: fileTitle,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: WikipediaResponse = await res.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];

    if (page && page.imageinfo && page.imageinfo[0]) {
      return page.imageinfo[0].url;
    } else {
      return '/media/placeholder.jpg';
    }
  } catch (error) {
    return '/media/placeholder.jpg';
  }
};
