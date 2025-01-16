import React, { useState, useEffect } from 'react';

interface Bear {
  type: string;
  coat: string;
  size: string;
  habitat: string;
  lifespan: string;
  diet: string;
  image: string;
}

const BearList: React.FC = () => {
  const [bears, setBears] = useState<Bear[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBears = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/bears');
        const data: Bear[] = await response.json();
        setBears(data);
      } catch (error) {
        console.error('Error fetching bears:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBears();
  }, []);

  if (loading) {
    return <p>Loading bear data...</p>;
  }

  return (
    <div>
      <h2>Bear List</h2>
      <table aria-label="Bear Types and Facts Table">
        <thead>
          <tr>
            <th>Bear Type</th>
            <th>Coat</th>
            <th>Adult Size</th>
            <th>Habitat</th>
            <th>Lifespan</th>
            <th>Diet</th>
          </tr>
        </thead>
        <tbody>
          {bears.map((bear, index) => (
            <tr key={index}>
              <td>{bear.type}</td>
              <td>{bear.coat}</td>
              <td>{bear.size}</td>
              <td>{bear.habitat}</td>
              <td>{bear.lifespan}</td>
              <td>{bear.diet}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BearList;