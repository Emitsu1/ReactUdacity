import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Select, Button, Avatar, Typography } from "antd";
import { setAuthedUser } from "../actions/authedUser";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 5,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
  },
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: "" };
  }

  formRef = React.createRef();

  onChange = value => {
    this.setState({ userId: value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.userId) {
      this.props.dispatch(setAuthedUser(this.state.userId));
    }
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
        <Typography.Title
          component={"div"}
          align="middle"
          style={{ marginTop: 0, marginBottom: 0 }}
        >
          {" "}
          Welcome to Would You Rather!
        </Typography.Title>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: "50vh" }}
        >
          <Col span={20}>
            <Row
              type="flex"
              justify="center"
              align="middle"
              style={{ minHeight: "65vh" }}
            >
              <Avatar
                key="avatar"
                size={450}
                src={
                  this.state.userId === ""
                    ? "https://cdn.pixabay.com/photo/2015/11/03/09/03/question-mark-1019993_960_720.jpg"
                    : this.props.users[this.state.userId].avatarURL
                }
              />
            </Row>
            <Typography.Title
              level={2}
              align="middle"
              style={{ marginTop: 0, marginBottom: 25 }}
            >
              {" "}
              Please select a user below to continue{" "}
            </Typography.Title>
            <Form {...layout} ref={this.formRef} name="control-ref">
              <Form.Item
                name="user"
                label="User"
                rules={[
                  {
                    required: false,
                  },
                ]}
                value={this.props.userId}
              >
                <Select
                  placeholder="Select a user to log-in"
                  onChange={this.onChange}
                  style={{ width: 475 }}
                >
                  {Object.keys(this.props.users).map(user => (
                    <Select.Option key={user} value={user}>
                      {this.props.users[user].name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={this.state.userId === ""}
                  onClick={this.onSubmit}
                  style={{ width: 475 }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(Login);
