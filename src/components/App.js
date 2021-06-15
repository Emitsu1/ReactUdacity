import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Login from "../components/Login";
import Nav from "../components/Nav";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./LeaderBoard";
import QuestionVoting from "./QuestionVoting";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <div>
            {this.props.authedUser === null ? (
              <Route render={() => <Login />} />
            ) : (
              <div>
                <Nav />
                <div>
                  <Route path="/" exact component={Home} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route
                    path="/questions/:question_id"
                    component={QuestionVoting}
                  />
                </div>
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(App);
