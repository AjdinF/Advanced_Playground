import fetch from 'node-fetch';

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
  const baseUrl = 'https://en.wikipedia.org/w/api.php';

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
      return '/media/placeholder.jpg';
    }

    const jsonData = await res.json();
    if (!isWikipediaResponse(jsonData)) {
      return '/media/placeholder.jpg';
    }

    const data: WikipediaResponse = jsonData;
    const pages = data.query.pages;
    const page = Object.values(pages)[0];

    return page?.imageinfo?.[0]?.url || '/media/placeholder.jpg';
  } catch {
    return '/media/placeholder.jpg';
  }
};

function isWikipediaResponse(data: any): data is WikipediaResponse {
  return (
    data &&
    typeof data === 'object' &&
    data.query &&
    typeof data.query === 'object' &&
    data.query.pages &&
    typeof data.query.pages === 'object'
  );
}
