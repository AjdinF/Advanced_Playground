import React, { useEffect, useState } from 'react';
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
      try {
        // Replace Wikipedia API with your backend
        const response = await fetch('http://localhost:5000/api/bears');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBears(data); // Set the bear data from backend
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
