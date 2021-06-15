import React from "react";
import { connect } from "react-redux";
import { Tabs, Card } from "antd";
import Question from "./Question";

const { TabPane } = Tabs;

const gridStyle = {
  width: "24%",
  textAlign: "left",
};

class Home extends React.Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 170,
          left: 100,
        }}
      >
        <Tabs type="card">
          <TabPane tab="Unanswered" key="1">
            {this.props.unanswered.map(questionId => {
              return (
                <Card.Grid key={questionId} style={gridStyle}>
                  <Question key={questionId} id={questionId} />{" "}
                </Card.Grid>
              );
            })}
          </TabPane>
          <TabPane tab="Answered" key="2">
            {this.props.answered.map(questionId => {
              return (
                <Card.Grid key={questionId} style={gridStyle}>
                  <Question key={questionId} id={questionId} />
                </Card.Grid>
              );
            })}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, users, authedUser }) => {
  let answered = Object.keys(users[authedUser].answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  return {
    unanswered: Object.keys(questions)
      .filter(questionId => !answered.includes(questionId))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answered,
  };
};

export default connect(mapStateToProps)(Home);
