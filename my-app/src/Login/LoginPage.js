import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./loginstyle.css";
import Logo from "../images/Logo.png";
import Ellipse from "../images/Ellipse.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/actions";
import Swal from "sweetalert2";

const Login = ({ isLoggedIn }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrormail] = useState("");
  const [errorPW, seterrorPW] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();
  console.log(isLoggedIn);
  // const userCreationStatus = useSelector(state => state.auth.userCreationStatus);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrormail("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    seterrorPW("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrormail("Invalid email");
    } else if (isValidEmail(email) && password) {
      const loginResult = await dispatch(login(email, password));

      if (loginResult.success === true) {
        history("/main");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Credentials",
        });
      }
    }
  };
  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <div className="main-Container">
        <div className="second-container">
          <form onSubmit={handleSubmit}>
            <div className="left">
              <div className="logo">
                <img src={Logo} alt="logo" />
              </div>

              <div className="login">
                <h1>Log In To Your Account</h1>
              </div>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Email"
                  valeue={email}
                  onChange={handleEmailChange}
                />
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <div className="password-container">
                  <div className="flex gap-8 pl-9">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Password"
                    />

                    <i
                      className={`password-toggle ${
                        passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"
                      } pt-2`}
                      onClick={togglePasswordVisibility}
                    ></i>
                  </div>
                  {errorPW && <p className="error-message1">{errorPW}</p>}
                </div>
              </div>
              <div className="button">
                <button className="button-edit" onClick={handleSubmit}>
                  Sign in
                </button>
              </div>
              {/* <div className='signup-text'>
          <p>Need an Account? <a href='/signup'>Register</a></p>
        </div> */}
            </div>
          </form>
          <div className="right">
            <div className="UM">
              <h1>Umbrella Solutions</h1>
            </div>
            <div className="description">
              <p>
                Certainly! In short, IT companies are businesses that provide
                technology-related products and services, such as software
                development, hardware manufacturing, cloud computing,
                cybersecurity, and IT consulting.
              </p>
            </div>
            <div className="Ellipse">
              <img src={Ellipse} alt="Ellipse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
