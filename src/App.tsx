import React from 'react';
import { Header } from './Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { Pomodoro } from './Pomodoro';
import styles from './app.module.css';

function App() {
  return (
    <Router>
      <Header />

      <main className={styles.main}>
        <div className="container">
          <Pomodoro />
        </div>
      </main>

      <div id="dropdownModal_root"></div>
    </Router>
  );
}

export default App;
