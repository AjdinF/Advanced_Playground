import React, { useEffect, useState } from 'react';
import { extractBears } from '../utils/extractBears';
import '../styles/more-bears.css';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

const MoreBears: React.FC = () => {
  const [bears, setBears] = useState<Bear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBearData = async () => {
      const baseUrl = 'https://en.wikipedia.org/w/api.php';
      const title = 'List_of_ursids';
      const params = {
        action: 'parse',
        page: title,
        prop: 'wikitext',
        section: String(3),
        format: 'json',
        origin: '*',
      };
      const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const wikitext = data.parse.wikitext['*'];
        const extractedBears = await extractBears(wikitext);
        setBears(extractedBears);
      } catch (err: any) {
        console.error(err.message);
        setError('Failed to fetch bear data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBearData();
  }, []);

  if (loading) {
    return <p>Loading more bears...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <section className="more-bears">
      <h3>More Bears</h3>
      <div className="bears-grid">
        {bears.map((bear, index) => (
          <div key={index} className="bear-card">
            <h4>{bear.name} ({bear.binomial})</h4>
            <img
              src={bear.image}
              alt={bear.name}
              style={{ width: '200px', height: 'auto' }}
            />
            <p><strong>Range:</strong> {bear.range}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreBears;
