import React, { Component } from 'react';
import AppConstants from '../constants/AppConstants';
import RepoDisplayNames from '../enums/RepoDisplayNames';
import RepoCardStat from './RepoCardStat';
import ManagerCardStats from './ManagerCardStats';
import TargetStatNames from '../constants/TargetStatNames';

// may want to refactor to stateless component
class RepoCard extends Component {
  postVote() {
    const {
      repoName,
      checkVoteCount,
      toggleVoteButtons,
      emailAddress
    } = this.props;

    const payload = {
      repoName,
      emailAddress,
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
          toggleVoteButtons();
        } else {
          alert('There was an issue with voting');
        }
      });
  }

  render() {
    const { repoName, voteCount, isLoaded, showVoteButtons } = this.props;
    const repoDisplayName = RepoDisplayNames[repoName];
    return (
      <div>
        <h2>{repoDisplayName}</h2>
        <ManagerCardStats repoName={repoName} targetStats={TargetStatNames} />
        {showVoteButtons ? (
          <button type="button" onClick={() => this.postVote()}>
            Vote
          </button>
        ) : (
          <div />
        )}
        <RepoCardStat title="Vote Count" value={isLoaded ? voteCount : ''} />
      </div>
    );
  }
}

export default RepoCard;
