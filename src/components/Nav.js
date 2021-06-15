import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, Button, Avatar } from "antd";
import { resetAuthedUser } from "../actions/authedUser";
import LoadingBar from 'react-redux-loading-bar'

class Nav extends React.Component {
  onLogout = e => {
    e.preventDefault();
    this.props.dispatch(resetAuthedUser());
  };

  render() {
    return (
      <div>
        <LoadingBar showFastActions />
        <Menu key="leftPane" mode="horizontal">
          <Menu.Item key="home">
            {" "}
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item key="newquestion">
            {" "}
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </Menu.Item>
          <Menu.Item key="leaderboard">
            {" "}
            <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
            </NavLink>
          </Menu.Item>
        </Menu>
        <div>
          <div
            key="name"
            style={{
              position: "absolute",
              top: 13,
              right: 170,
              fontWeight: "bold",
            }}
          >
            {this.props.users[this.props.authedUser].name}
          </div>
          <div
            key="picture"
            style={{
              position: "absolute",
              top: 0,
              right: 80,
              fontWeight: "bold",
            }}
          >
            <Avatar
              key="avatar"
              size={40}
              src={this.props.users[this.props.authedUser].avatarURL}
              style={{ top: 3, marginRight: 45 }}
            ></Avatar>
          </div>
          <Menu key="rightPane" mode="horizontal">
            <Menu.Item
              key="user"
              style={{ position: "absolute", top: 0, right: 0 }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  background: "red",
                  borderColor: "black",
                  fontWeight: "bold",
                }}
                onClick={this.onLogout}
              >
                Logout
              </Button>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser, resetAuthedUser }) => {
  return {
    users,
    authedUser,
    resetAuthedUser,
  };
};

export default connect(mapStateToProps)(Nav);
