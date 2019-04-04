import React, { Component } from 'react';
import AppConstants from '../constants/AppConstants';
import RepoRoutes from '../enums/RepoRoutes';
import RepoDisplayNames from '../enums/RepoDisplayNames';

// five seconds
const REFRESH_RATE = 5000;

class RepoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starGazerAmount: 0
    };
  }

  componentDidMount() {
    this.findStars();
    this.interval = setInterval(() => this.findStars(), REFRESH_RATE);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { starGazerAmount } = this.state;

    return nextState.starGazerAmount !== starGazerAmount;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  findStars() {
    const { repoName } = this.props;
    fetch(`${AppConstants.GITHUB_REPOS_API}${RepoRoutes[repoName]}`)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        const starGazerAmount = jsonResponse.stargazers_count;
        this.setState({ starGazerAmount });
      });
  }

  render() {
    const { starGazerAmount } = this.state;
    const { repoName } = this.props;
    const repoDisplayName = RepoDisplayNames[repoName];
    return (
      <div>
        <h1>{repoDisplayName} Star Amount</h1>
        <p>{starGazerAmount}</p>
      </div>
    );
  }
}

export default RepoCard;
