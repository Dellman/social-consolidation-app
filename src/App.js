import React from 'react';
import './App.css';
import CheckUser from './CheckUser';
import ChatContainer from './ChatContainer';

function App() {
  return (
    <div style={styles.mainContainer}>
      <nav>
        <CheckUser />
      </nav>
      <ChatContainer />
    </div>
  );
}

const styles = {
  mainContainer: {
    backgroundColor: "lightgray",
    flex: 1,
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0
  }
}

export default App;
