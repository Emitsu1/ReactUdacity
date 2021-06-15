import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card } from "antd";
class Question extends React.Component {
  onClick = (e, questionId) => {
    this.props.history.push(`/questions/${questionId}`);
  };

  render() {
    const voteOrSeeVotes =
      this.props.uniqueQuestion.optionOne.votes.includes(this.props.currUser) ||
      this.props.uniqueQuestion.optionTwo.votes.includes(this.props.currUser)
        ? "Click to see votes!"
        : "Click to vote!";

    const askOrAsked =
      this.props.uniqueQuestion.optionOne.votes.includes(this.props.currUser) ||
      this.props.uniqueQuestion.optionTwo.votes.includes(this.props.currUser)
        ? "asked"
        : "asks";

    return (
      <div>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="avatar"
              src={this.props.users[this.props.uniqueQuestion.author].avatarURL}
            />
          }
          title={`${
            this.props.users[this.props.uniqueQuestion.author].name
          } ${askOrAsked}`}
          bordered={false}
        >
          {" "}
          <Card.Meta title="Would you rather..." description=" " />
          <div>
            {
              <ul>
                <li key="firstOption">
                  {this.props.uniqueQuestion.optionOne.text}
                </li>
                <li key="secondOption">
                  {this.props.uniqueQuestion.optionTwo.text}
                </li>
              </ul>
            }
          </div>
          <Card.Meta
            description={voteOrSeeVotes}
            style={{ textAlign: "center", cursor: "pointer" }}
            onClick={e => this.onClick(e, this.props.uniqueQuestion.id)}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    currUser: state.authedUser,
    uniqueQuestion: state.questions[id],
    users: state.users,
  };
};

export default withRouter(connect(mapStateToProps)(Question));
