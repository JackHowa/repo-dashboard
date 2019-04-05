import React, { Component } from 'react';
import AppConstants from '../constants/AppConstants';
import RepoRoutes from '../enums/RepoRoutes';
import RepoCardStat from './RepoCardStat';
import StatPropertyNames from '../enums/StatPropertyNames';
import StatDisplayNames from '../enums/StatDisplayNames';

class ManagerCardStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statKeyValues: []
    };
  }

  componentDidMount() {
    this.findStats();
    this.interval = setInterval(
      () => this.findStats(),
      AppConstants.REFRESH_RATE
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { statKeyValues } = this.state;

    if (nextState.statKeyValues !== statKeyValues || nextProps !== this.props) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  findStats() {
    const { repoName, targetStats } = this.props;
    fetch(`${AppConstants.GITHUB_REPOS_API}${RepoRoutes[repoName]}`)
      .then(response => response.json())
      .then(jsonResponse => {
        const statKeyValueArray = targetStats.map(statName => {
          return {
            [statName]: jsonResponse[StatPropertyNames[statName]]
          };
        });
        this.setState({ statKeyValues: statKeyValueArray });
      });
  }

  renderStatValues = () => {
    const { statKeyValues } = this.state;
    const { targetStats } = this.props;

    return targetStats.map(statKey => {
      let targetStatValue = 0;
      const targetStatObject =
        statKeyValues.find(statObject => {
          return statObject[statKey];
        }) || 0;

      if (targetStatObject !== 0) {
        [targetStatValue] = Object.values(targetStatObject);
      }

      return (
        <RepoCardStat
          key={statKey}
          title={StatDisplayNames[statKey]}
          value={targetStatValue}
        />
      );
    });
  };

  render() {
    const { targetStats } = this.props;
    const { statKeyValues } = this.state;

    // todo: iterate over to show card repo stats
    return (
      <div>
        {statKeyValues && statKeyValues.length > 1
          ? this.renderStatValues()
          : targetStats.map(statKey => (
              <RepoCardStat
                key={statKey}
                title={StatDisplayNames[statKey]}
                value={0}
              />
            ))}
      </div>
    );
  }
}

export default ManagerCardStats;
