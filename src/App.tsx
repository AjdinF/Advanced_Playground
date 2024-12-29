import React from 'react';
import './styles/style.css';
import Header from './components/Header.tsx';
import Nav from './components/Nav.tsx';
import Main from './main.tsx';
import Comments from './components/comments.tsx';
import MoreBears from './components/MoreBears';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Nav />
      <Main />
      <Comments />
      <MoreBears />
      <Footer />
    </div>
  );
};

export default App;
