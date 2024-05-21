import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./OfficerLogin.css";
import { Link } from "react-router-dom";
import englishContent from "../Json/Officer Login/OLE.json";
import sinhalaContent from "../Json/Officer Login/OLS.json";
import tamilContent from "../Json/Officer Login/OLT.json";
import { useLanguage } from "../TraslateBtn/LanguageContext";
import LoginWithGoogle from "../FireBase/GoogleLoginDriver";
import { toast, Toaster } from "react-hot-toast";

function OfficerLogin() {
  const { selectedLanguage } = useLanguage();

  let content;
  switch (selectedLanguage) {
    case "english":
      content = englishContent;
      break;
    case "sinhala":
      content = sinhalaContent;
      break;
    case "tamil":
      content = tamilContent;
      break;
    default:
      content = englishContent;
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loginStatus, setLoginStatus] = useState("");

  const login1 = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3009/login1", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.status === 200) {
          // setLoginStatus("Logged in successfully");
          toast.success("Logged in successfully");
          setTimeout(() => {
            // Redirect to another page after 1 minute (60000 milliseconds)
            window.location.href = "/officermaininterface";
          }, 100);
        } else {
          // setLoginStatus(response.data.message || "Unknown error occurred");
          toast.success(response.data.message || "Unknown error occurred");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        // setLoginStatus("Error logging in. Please try again later.");
        toast.success("Error logging in. Please try again later.");
      });
  };

  return (
    <div className="bgp">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="overlay">
        <h1>
          Login
          <span style={{ color: "#E4A80E" }}>Here</span>
        </h1>
        <div className="loginForm">
          <form>
            <label htmlFor="username">{content.UsernameLabel}</label>
            <input
              className="textInput"
              type="text"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder={content.UsernamePlaceholder}
              required
            />
            <label htmlFor="password">{content.PasswordLabel}</label>
            <input
              className="textInput"
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={content.PasswordPlaceholder}
              required
            />
            <input
              className="button"
              type="submit"
              onClick={login1}
              value={content.LoginButton}
            />
            <LoginWithGoogle></LoginWithGoogle>
            <h1
            //   style={{
            //     color: "red",
            //     fontSize: "15px",
            //     textAlign: "center",
            //     marginTop: "60px",
            //   }}
            >
              {/* {loginStatus} */}
            </h1>

            <h3 style={{ position: "relative", top: "50px" }}>
              {content.NewMemberMessage}
            </h3>
            <Link to="/officersignup">
              <button className="button1">{content.CreateAccountButton}</button>
            </Link>
            <Link to="/">
              <button className="button1">{content.Back}</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OfficerLogin;
