import React from "react";
import "./Login.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const loginINfo = {
      email: this.state.email,
      password: this.state.password,
    };
    axios.post(`${process.env.REACT_APP_API_URI}api/login`, loginINfo).then((res) => {
      const cookies = new Cookies();
      const token = cookies.set("TOKEN", res.data.token, { path: "/" });
      window.location.href = "/";
    }).catch((err)=>{
      // if(err.status==400) alert("wrong pass");
      if(err.response.status == 400){
        Swal.fire({
          icon: "error",
          title: "wrong invalid credentials",
          showConfirmButton: false,
          timer: 1500,
        });
        
      }else if(err.response.status == 500){
        Swal.fire({
          icon: "error",
          title: "something went wrong try again",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  render() {
    return (
      <div className="login__container">
        <div className="main">
          <div className="wrapper">
            <div className="container">
              <div className="col-left">
                <div className="login-text">
                  <h2>Spencify</h2>
                  <br></br>
                  <p>Welcome back</p>
                </div>
              </div>
              <div className="col-right">
                <div className="login-form">
                  <h2>Login</h2>
                  <form onSubmit={this.onSubmit}>
                    <p>
                      <label>Username</label>
                      <input
                        type="text"
                        placeholder="Username"
                        name="email"
                        onChange={this.handleChange}
                        required
                      />
                    </p>
                    <p>
                      <label>Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={this.handleChange}
                        required
                      />
                    </p>
                   
                      <button type="submit" value="LogIn">Login</button>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
