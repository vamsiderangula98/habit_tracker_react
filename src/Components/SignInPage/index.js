import InputBox from "../Input";
import ConfirmButton from "../ConfirmButton";
import LogoMark from "../LogoMark";

import React, { useState, useContext, useEffect } from "react";

import axios from "axios";

import { useNavigate,Link} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserContext from "../../contexts/UserContext";
import styled from "styled-components";

const SignInStyled = styled.div`
background:linear-gradient(45deg,lightblue,lightpink);
width:100%;
height:100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items:center;
padding-top: 68px;
gap: 30px;
form{
  display:flex;
  flex-direction:column;
  gap:8px;
}
.input-box{
  margin-top:15px;
  margin-bottom:15px;
  color:blue!important;
  botder-radius:1rem 1rem;
}

h1{
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 17px;
text-align: center;
text-decoration-line: underline;

color: navy;
}

`


export default function SignInPage(Props) {
  let navigate = useNavigate();

  const { setToken } = useContext(UserContext);

  const [loading, setLoading] = useState(false)

  const [signInObj, setSignInObj] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {

    if (localStorage.getItem("userInfo") !== null) {


      navigate("/today")
    }

  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  function logIn(event) {

    event.preventDefault()

    setLoading(true);
  const url=process.env.API_URL;

  const request = axios.post(`${url}/auth/login`, signInObj);
    request.then(requestSuccess);

    request.catch(requestFail)

  }

  function requestSuccess(answer) {

    setLoading(false)

    setToken(answer.data)

    localStorage.setItem("userInfo", JSON.stringify(answer.data))

    navigate("/today")

  }


  function requestFail(answer) {

    console.log(answer.response.status)

    notify("Incorrect email/password, please try again.")

    setLoading(false)
  }

  const notify = (text) => toast.error(`${text}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  return (
    <SignInStyled>
      <LogoMark></LogoMark>
      <form onSubmit={logIn}>
        <InputBox
        className="input-box"
          type="email"
          placeholder=" Enter email"
          value={signInObj.email}
          onChange={setSignInObj}
          inputState={signInObj}
          stateKey="email"
          isLoading={loading}
        />
        <InputBox
          type="password"
          placeholder="Enter password"
          value={signInObj.password}
          onChange={setSignInObj}
          inputState={signInObj}
          stateKey="password"
          isLoading={loading}
        />
        <ConfirmButton text="Login" isLoading={loading} />
      </form>
      <Link to="/register">
        <h1>
        Don't have an account? Register!
        </h1>
      </Link>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </SignInStyled>
  )

}

