import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",

      password: "",
    };
  }

  changeInfo = (type, e) => {
    if (type == "username") {
      this.setState({ username: e.target.value });
    } else {
      this.setState({ password: e.target.value });
    }
  };

  postLogin = (e) => {
    e.preventDefault();
    if (this.state.username == "" || this.state.password == "") {
      console.log("err");
      toast.error("نام کاربری و رمز عبور را وارد کنید!");
    }

    var obj = {
      username: this.state.username,
      password: this.state.password,
    };

    axios({
      method: "post",
      url: "http://localhost:52185/api/Auth",
      data: obj,
    })
      .then((res) => {
        Cookies.set("token", res.data.token);
        Cookies.set("name", res.data.userName);
        Cookies.set("role", res.data.role);
        // Cookies.setToken("token", res.data.token);
        if (res.status == 200) this.props.history.push("/contactList");
      })
      .catch((error) => {
        console.log(error);
        toast.error("نام کاربری یا کلمه عبور صحیح نیست!");
      });
  };

  render() {
    return (
      <div className="rtl text-center bg-light  " style={{ height: "1000px" }}>
        <Alert variant="info">
          <h2>صفحه ورود به سامانه مدیریت اشخاص</h2>
        </Alert>

        <form className="mt-5">
          <div className="form-inline d-flex justify-content-center mt-5">
            <label style={{ paddingLeft: "1rem" }}>نام کاربری</label>
            <input
              type="text"
              className="form-control "
              style={{ width: "15%" }}
              onChange={(e) => this.changeInfo("username", e)}
            ></input>
          </div>
          <div className="form-inline d-flex justify-content-center mt-2">
            <label style={{ paddingLeft: "1.5rem" }}>رمز عبور</label>
            <input
              type="password"
              className="form-control "
              style={{ width: "15%" }}
              onChange={(e) => this.changeInfo("password", e)}
            ></input>
          </div>
          <button
            className="btn btn-success  mt-3 mb-5 "
            style={{ width: "15%" }}
            style={{ marginRight: "4.4rem" }}
            onClick={(e) => this.postLogin(e)}
          >
            ورود
          </button>
        </form>

        <footer className="mt-5">
          <Alert variant="light">
            <p>Copyright 2021 by Mohammad Sepahi. All Rights Reserved.</p>
          </Alert>
        </footer>
        <ToastContainer />
      </div>
    );
  }
}

export default LoginPage;
