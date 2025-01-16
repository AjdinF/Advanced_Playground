import { fetchImageUrl } from './fetchImageUrl';

export async function extractBears(wikitext: string) {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears = [];
    for(const table of speciesTables) {
      const rows = table.split('{{Species table/row');
  
      for(const row of rows){
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
                image: imageUrl,
                range: rangeMatch ? rangeMatch[1] : 'Unknown'
              };
              bears.push(bear);
          } 
          catch (error) {
            console.error(error);
          }
  
          const moreBearsSection = document.querySelector<HTMLElement>('.more_bears');
          if (moreBearsSection) {
            bears.forEach((bear) => {
              moreBearsSection.innerHTML += `
              <div>
                <h4>${bear.name} (${bear.binomial})</h4>
                <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
                <p><strong>Range:</strong> ${bear.range}</p>
              </div>
              `;
            });
          } else {
            console.error(Error);
          }
        }
      }
    }
  }