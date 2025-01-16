import { fetchImageUrl } from './fetchImageUrl.js';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

export async function extractBears(wikitext: string): Promise<Bear[]> {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^|]*)/);

      if (nameMatch && binomialMatch && imageMatch) {
        const imageUrl = await fetchImageUrl(imageMatch[1].trim());
        const bear = {
          name: nameMatch[1],
          binomial: binomialMatch[1],
          image: imageUrl,
          range: rangeMatch ? rangeMatch[1] : 'Unknown',
        };
        bears.push(bear);
      }
    }
  }

  return bears;
}
