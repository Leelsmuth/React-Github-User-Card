import React from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import lambdaImg from "./lambdalogo.png";
import githubImg from "./githublogo.png";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      followers: []
    };
  }
  componentDidMount() {
    axios.get("https://api.github.com/users/leelsmuth").then(res => {
      this.setState({ user: res.data });
    });
    axios.get("https://api.github.com/users/leelsmuth/followers").then(res => {
      this.setState({ followers: res.data });
    });
  }
  render() {
    return (
      <div className="App">
        <UserCard user={this.state.user} followers={this.state.followers} />
      </div>
    );
  }
}

function UserCard(props) {
  return (
    <div>
      <div class="container">
        <div class="header">
          <img src={lambdaImg} alt="Lambda Logo" />
          <p>❤️'s</p>
          <img src={githubImg} alt="GitHub Logo" />
        </div>
        <div class="cards">
          <div class="card">
            <img src={props.user.avatar_url} alt="User Logo" />
            <div className="card-info">
              <h3 className="name">{props.user.login}</h3>
              <p className="username">{props.user.name}</p>
              <p>Followers: {props.user.followers}</p>
              <p>Following: {props.user.following}</p>
            </div>
          </div>
          {props.followers.map(follower => (
            <div class="card">
              <div className="card-info">
                <img src={follower.avatar_url} alt="follower Logo" />
                <h3 className="name">{follower.login}</h3>
                <p className="username">{follower.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
