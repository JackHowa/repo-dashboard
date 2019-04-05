import React, { Component } from 'react';
import AppConstants from '../constants/AppConstants';
import RepoDisplayNames from '../enums/RepoDisplayNames';
import RepoCardStat from './RepoCardStat';
import ManagerCardStats from './ManagerCardStats';
import TargetStatNames from '../constants/TargetStatNames';

// may want to refactor to stateless component
class RepoCard extends Component {
  postVote() {
    const { repoName, checkVoteCount } = this.props;

    const payload = {
      repoName,
      amount: 1
    };

    fetch(AppConstants.VOTE_COUNTER_API, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        // todo: error checking
        if (jsonResponse.success === true) {
          checkVoteCount();
        }
      });
  }

  render() {
    const { repoName, voteCount, isLoaded } = this.props;
    const repoDisplayName = RepoDisplayNames[repoName];
    return (
      <div>
        <h1>{repoDisplayName}</h1>
        <ManagerCardStats repoName={repoName} targetStats={TargetStatNames} />
        <button type="button" onClick={() => this.postVote()}>
          Vote
        </button>
        <RepoCardStat title="Vote Count" value={isLoaded ? voteCount : ''} />
      </div>
    );
  }
}

export default RepoCard;
