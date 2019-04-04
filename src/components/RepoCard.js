import React, { Component } from 'react';

class RepoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starGazerAmount: 0
    };
  }

  componentDidMount() {
    this.findStars();
    this.interval = setInterval(() => this.findStars(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  findStars() {
    fetch('https://api.github.com/repos/facebook/react')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        const starGazerString = JSON.stringify(myJson.stargazers_count);
        this.setState({ starGazerAmount: starGazerString });
      });
  }

  render() {
    const { starGazerAmount } = this.state;
    return (
      <div>
        <h1>React Star Amount</h1>
        <p>{starGazerAmount}</p>
      </div>
    );
  }
}

export default RepoCard;
