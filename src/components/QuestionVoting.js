import React from "react";
import { connect } from "react-redux";
import { Card, Radio, Space, Button } from "antd";
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
        saveAnswer(this.props.uniqueQuestion.id, this.state.value, /* this.props.authedUser */)
      );
    }
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
        <Card
          style={{ width: 500, height: 700 }}
          cover={
            <img
              alt="avatar"
              src={this.props.users[this.props.uniqueQuestion.author].avatarURL}
            />
          }
          title="Would You Rather"
        >
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Space direction="vertical">
              <Radio value={this.props.uniqueQuestion.optionOne.text}>
                {this.props.uniqueQuestion.optionOne.text}
              </Radio>
              <Radio value={this.props.uniqueQuestion.optionTwo.text}>
                {this.props.uniqueQuestion.optionTwo.text}
              </Radio>
            </Space>
          </Radio.Group>
          <Button
            type="primary"
            htmlType="submit"
            style={{ position: "absolute", width: 450, bottom: 10, left: 22 }}
            disabled={this.state.value === ""}
            onClick={e => this.onSubmit(e)}
          >
            Submit
          </Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (
  { users, questions, authedUser },
  { match, question_id }
) => {
  let uniqueQuestion;
  if (question_id !== undefined) {
    uniqueQuestion = questions[question_id];
  } else {
    uniqueQuestion = questions[match.params.question_id];
  }
  return { users, uniqueQuestion, author: users[uniqueQuestion.author] };
};

export default connect(mapStateToProps)(QuestionVoting);
