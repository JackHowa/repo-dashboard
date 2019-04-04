import React from 'react';
import RepoManager from './components/RepoManager';
import TargetRepoNames from './constants/TargetRepoNames';

const App = () => <RepoManager targetRepoNames={TargetRepoNames} />;

export default App;
