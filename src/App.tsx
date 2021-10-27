import React from 'react';
import { Header } from './Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Pomodoro } from './Pomodoro';
import styles from './app.module.css';
import { Stats } from './Stats';

function App() {
  return (
    <Router>
      <Header />

      <main className={styles.main}>
        <div className="container">
          <Switch>
            <Route path="/stats">
              <Stats />
            </Route>

            <Route path="/">
              <Pomodoro />
            </Route>
          </Switch>
        </div>
      </main>

      <div id="dropdownModal_root"></div>
    </Router>
  );
}

export default App;
