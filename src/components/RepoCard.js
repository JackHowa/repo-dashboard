import React, { Component } from 'react';
import AppConstants from '../constants/AppConstants';
import RepoRoutes from '../enums/RepoRoutes';
import RepoDisplayNames from '../enums/RepoDisplayNames';

class RepoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starGazerAmount: 0
    };
  }

  componentDidMount() {
    this.findStars();
    this.interval = setInterval(
      () => this.findStars(),
      AppConstants.REFRESH_RATE
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { starGazerAmount } = this.state;

    if (
      nextState.starGazerAmount !== starGazerAmount ||
      nextProps !== this.props
    ) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  findStars() {
    const { repoName } = this.props;
    fetch(`${AppConstants.GITHUB_REPOS_API}${RepoRoutes[repoName]}`)
      .then(response => response.json())
      .then(jsonResponse => {
        const starGazerAmount = jsonResponse.stargazers_count;
        this.setState({ starGazerAmount });
      });
  }

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
    const { starGazerAmount } = this.state;
    const { repoName, voteCount, isLoaded } = this.props;
    const repoDisplayName = RepoDisplayNames[repoName];
    return (
      <div>
        <h1>{repoDisplayName} Star Amount</h1>
        <p>{starGazerAmount}</p>
        <button type="button" onClick={() => this.postVote()}>
          Vote
        </button>
        <p>Vote Count: {isLoaded ? voteCount : 0}</p>
      </div>
    );
  }
}

export default RepoCard;
