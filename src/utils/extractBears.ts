import { fetchImageUrl } from '../utils/fetchImageUrl';

export async function extractBears(wikitext: string) {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];
  
  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^|]*)/);

      if (nameMatch && binomialMatch && imageMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');

        try {
          const imageUrl = await fetchImageUrl(fileName);
          const bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl || 'https://via.placeholder.com/200',
            range: rangeMatch ? rangeMatch[1] : 'Unknown',
          };
          bears.push(bear);
        } catch (error) {
          console.error(error);
          bears.push({
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: 'https://via.placeholder.com/200',
            range: rangeMatch ? rangeMatch[1] : 'Unknown',
          });
        }
      }
    }
  }

  return bears;
}
