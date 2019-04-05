import React, { Component } from 'react';
import RepoCard from './RepoCard';
import AppConstants from '../constants/AppConstants';

class RepoManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoCounts: [],
      isLoaded: false,
      emailAddress: '',
      showVoteButtons: false
    };
  }

  componentDidMount() {
    this.countVotes();
    this.updateVotes = setInterval(
      () => this.countVotes(),
      AppConstants.REFRESH_RATE
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state || nextProps !== this.props) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    clearInterval(this.updateVotes);
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

  submitName = event => {
    event.preventDefault();

    const { emailAddress } = this.state;

    fetch(`${AppConstants.VOTE_COUNTER_API}/${emailAddress}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.alreadyVoted === false && document.cookie === '') {
          document.cookie = emailAddress;
          this.toggleVoteButtons();
        } else {
          const { repoName } = jsonResponse;
          if (repoName) {
            alert(`${emailAddress} already voted for ${repoName}`);
          } else {
            alert(`You or someone else on this machine already voted`);
          }
        }
      });

    // potentially change the state of vote shown
  };

  toggleVoteButtons = () =>
    this.setState(prevState => ({
      showVoteButtons: !prevState.showVoteButtons
    }));

  handleChange = event => this.setState({ emailAddress: event.target.value });

  render() {
    const { targetRepoNames } = this.props;
    const { repoCounts, isLoaded, showVoteButtons, emailAddress } = this.state;
    return (
      <div>
        <h1>Client-Side JavaScript Framework Dashboard</h1>
        <p>Enter an email to vote!</p>
        <p>You can only vote once.</p>
        <form onSubmit={this.submitName}>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              value={emailAddress}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
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
              showVoteButtons={showVoteButtons}
              toggleVoteButtons={this.toggleVoteButtons}
              emailAddress={emailAddress}
            />
          );
        })}
      </div>
    );
  }
}

export default RepoManager;
