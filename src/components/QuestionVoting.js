import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Radio, Space, Button, Progress } from "antd";
import { StarFilled } from "@ant-design/icons";
import { saveAnswer } from "../actions/shared";

class QuestionVoting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  onChange = e => {
    console.log("value = ", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.value !== "") {
      this.props.dispatch(
        saveAnswer(this.props.uniqueQuestion.id, this.state.value)
      );
    }
  };

  goHome = () => {
    this.props.history.push("/");
  };

  render() {
    console.log(this.state);

    const unansweredStyle = {
      width: 500,
      height: 700,
    };

    const answeredStyle = {
      width: 500,
      height: 750,
    };

    const option1Votes = this.props.uniqueQuestion.optionOne.votes.length;
    const option2Votes = this.props.uniqueQuestion.optionTwo.votes.length;
    const totalVotes = option1Votes + option2Votes;
    const ownVote =
      this.props.users[this.props.authedUser].answers[
        this.props.uniqueQuestion.id
      ];
    const percentageOption1 = Math.round((option1Votes / totalVotes) * 100);
    const percentageOption2 = Math.round((option2Votes / totalVotes) * 100);

    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
        <Card
          style={this.props.answered ? answeredStyle : unansweredStyle}
          cover={
            <img
              alt="avatar"
              src={this.props.users[this.props.uniqueQuestion.author].avatarURL}
            />
          }
          title="Would You Rather"
        >
          {this.props.answered ? (
            <div>
              <h4 styling={{ padding: 0 }}>
                {this.props.uniqueQuestion.optionOne.text} ({option1Votes} out
                of {totalVotes} votes)
              </h4>
              {ownVote === "optionOne" && (
                <StarFilled
                  style={{
                    color: "gold",
                    fontSize: "165%",
                    position: "absolute",
                    float: "right",
                    right: 0,
                  }}
                />
              )}
              <Progress percent={percentageOption1} />
              <h4 styling>
                {" "}
                {this.props.uniqueQuestion.optionTwo.text} ({option2Votes} out
                of {totalVotes} votes){" "}
              </h4>
              {ownVote === "optionTwo" && (
                <StarFilled
                  style={{
                    color: "gold",
                    fontSize: "165%",
                    position: "absolute",
                    float: "right",
                    right: 0,
                  }}
                />
              )}
              <Progress percent={percentageOption2} />
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  position: "absolute",
                  width: 450,
                  bottom: 10,
                  left: 22,
                }}
                onClick={this.goHome}
              >
                Back to Home
              </Button>
            </div>
          ) : (
            <div>
              <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Space direction="vertical">
                  <Radio value="optionOne">
                    {this.props.uniqueQuestion.optionOne.text}
                  </Radio>
                  <Radio value="optionTwo">
                    {this.props.uniqueQuestion.optionTwo.text}
                  </Radio>
                </Space>
              </Radio.Group>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  position: "absolute",
                  width: 450,
                  bottom: 10,
                  left: 22,
                }}
                disabled={this.state.value === ""}
                onClick={e => this.onSubmit(e)}
              >
                Submit
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (
  { questions, authedUser, users },
  { question_id, match }
) => {
  let uniqueQuestion;
  var answered = false;
  if (question_id !== undefined) {
    uniqueQuestion = questions[question_id];
  } else {
    uniqueQuestion = questions[match.params.question_id];
  }
  if (
    uniqueQuestion !== undefined &&
    Object.keys(users[authedUser].answers).includes(uniqueQuestion.id)
  ) {
    answered = true;
  }
  return {
    users,
    uniqueQuestion,
    answered,
    authedUser,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionVoting));
