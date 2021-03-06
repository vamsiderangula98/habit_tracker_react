import styled from "styled-components";
import LogoMark from "../ProjectName";
import InputBox from "../Input";
import ConfirmButton from "../ConfirmButton";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link } from "react-router-dom";

//signup page display
export default function SignUpPage() {

  let navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const [signUpObj, setSignUpObj] = useState({
    email: "",
    name: "",
    image: "",
    password: ""
  })

  function logUp(event) {

    event.preventDefault()

    setLoading(true)
    const url=process.env.API_URL;
    
    const request = axios.post(`${url}/auth/sign-up`, signUpObj);



    request.then(requestSuccess);

    request.catch(requestFail)

  }

  function requestSuccess(answer) {
    navigate("/")

    setLoading(false)
  }

  function requestFail(answer) {
    console.log(answer.response.status)
    notify("email already exists, please use another email to register")
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
    <SignUp>
      <LogoMark></LogoMark>
      <form onSubmit={logUp}>
        <h2><label htmlFor="email">Email</label>
        </h2>
        <InputBox
        id="email"
          type="email"
          placeholder=" Enter email"
          value={signUpObj.email}
          onChange={setSignUpObj}
          inputState={signUpObj}
          stateKey="email"
          isLoading={loading}
        />
         <h2><label htmlFor="password">Password</label>
        </h2>
        <InputBox
        id="password"
          type="password"
          placeholder=" Enter password"
          value={signUpObj.password}
          onChange={setSignUpObj}
          inputState={signUpObj}
          stateKey="password"
          isLoading={loading}
        />
         <h2><label htmlFor="userName">UserName</label>
        </h2>
        <InputBox
        id="userName"
          type="text"
          placeholder="Enter name"
          value={signUpObj.name}
          onChange={setSignUpObj}
          inputState={signUpObj}
          stateKey="name"
          isLoading={loading}
        />
         <h2><label htmlFor="imgurl">Image Link</label>
        </h2>
        <InputBox
        id="imgurl"
          type="url"
          placeholder="Add image"
          value={signUpObj.image}
          onChange={setSignUpObj}
          inputState={signUpObj}
          stateKey="image"
          isLoading={loading}
        />

        <ConfirmButton text="register" isLoading={loading} />
      </form>
      <Link to="/">
        <h1>
        Already have an account? Log in!
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


    </SignUp>
  )

}

const SignUp = styled.div`
background:linear-gradient(45deg,lightblue,lightpink);
width:100%;
height:100%;

display: flex;
flex-direction: column;
justify-content: flex-start;
align-items:center;

padding-top: 68px;

gap: 25px;

form{
  display:flex;
  flex-direction:column;
  border-radius:2rem 2rem;
  
  

  gap: 6px;

}

h1{
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 17px;
text-align: center;
text-decoration-line: underline;

color:navy;
}

`