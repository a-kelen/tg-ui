import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoutesList from './routes';
import { connect } from 'react-redux';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { getChannels } from './store/actions/channelActions'
import { getAllWords } from './store/actions/wordActions'

import './App.css'

const App = ({ getChannels, getAllWords }) => {
  React.useEffect(() => {
    getChannels();
    getAllWords();
  }, []);

  return (
    <div>
      <NavigationBar />
      <Routes>
        {RoutesList.map((route) => (
            <Route exact path={route.path} key={route.path} element={route.component}></Route>
        ))}
      </Routes>
    </div>
  );
}
const mapStateToProps  = (state) => ({ channelDb: state.channels });

export default connect(mapStateToProps, {getChannels, getAllWords})(App);
