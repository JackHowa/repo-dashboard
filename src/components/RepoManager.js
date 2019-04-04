import React, { Component } from 'react';
import RepoCard from './RepoCard';
import AppConstants from '../constants/AppConstants';

class RepoManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoCounts: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    this.countVotes();
  }

  countVotes = () => {
    fetch(AppConstants.VOTE_COUNTER_API)
      .then(response => response.json())
      .then(jsonResponse => {
        const voteRepoArray = jsonResponse.data.map(repoObject => ({
          [repoObject._id]: repoObject.totalVotes
        }));
        this.setState({
          isLoaded: true,
          repoCounts: voteRepoArray
        });
      });
  };

  checkVoteCount = () => this.countVotes();

  render() {
    const { targetRepoNames } = this.props;
    const { repoCounts, isLoaded } = this.state;
    return (
      <div>
        {targetRepoNames.map(repoName => {
          let targetVoteCount =
            repoCounts.find(countObject => countObject[repoName]) || 0;

          if (targetVoteCount !== 0) {
            [targetVoteCount] = Object.values(targetVoteCount);
          }

          return (
            <RepoCard
              key={repoName}
              repoName={repoName}
              voteCount={targetVoteCount}
              isLoaded={isLoaded}
              checkVoteCount={this.checkVoteCount}
            />
          );
        })}
      </div>
    );
  }
}

export default RepoManager;
