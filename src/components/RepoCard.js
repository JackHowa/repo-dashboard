import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppConstants from '../constants/AppConstants';
import RepoDisplayNames from '../enums/RepoDisplayNames';
import RepoCardStat from './RepoCardStat';
import ManagerCardStats from './ManagerCardStats';
import TargetStatNames from '../constants/TargetStatNames';

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

RepoCard.propTypes = {
  repoName: PropTypes.string.isRequired,
  voteCount: PropTypes.number.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  showVoteButtons: PropTypes.bool.isRequired,
  emailAddress: PropTypes.string,
  toggleVoteButtons: PropTypes.func.isRequired,
  checkVoteCount: PropTypes.func.isRequired
};

RepoCard.defaultProps = {
  emailAddress: ''
};

export default RepoCard;
