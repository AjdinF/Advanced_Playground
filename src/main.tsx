import React from 'react';
import Article from './components/article';
import Related from './components/related';

const Main: React.FC = () => (
    <main id="main-content">
      <Article />
      <div className="secondary">
        <Related />
      </div>
    </main>
  );
  
  export default Main;
  
  