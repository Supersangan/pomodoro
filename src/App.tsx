import React from 'react';
import { Header } from './Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Pomodoro } from './Pomodoro';
import styles from './app.module.css';
import { Stats } from './Stats';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { saveState } from './utils/localstorage';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware()
    // other store enhancers if any
  )
);

store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  });
});

function App() {
  return ( 
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
