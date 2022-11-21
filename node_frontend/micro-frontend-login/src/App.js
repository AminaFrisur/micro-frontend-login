import './App.css';
import React from 'react';

let assets = {
    'main.js': '/main.js',
    'main.css': '/main.css',
};

function App() {
  return (
    <div>
      <header>
        <meta charSet="utf-8" />
        <title>Welctome to carsharing Test</title>
        <link rel="stylesheet" href={assets['main.css']} />
      </header>
    </div>
  );
}

export default App;
