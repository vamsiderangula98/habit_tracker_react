import styled from "styled-components";
import checkIcon from "../../assets/check-icon.svg"

import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import UserContext from "../../contexts/UserContext";

export default function UserTodayHabit(Props) {

  let recordValidation = (Props.data.currentSequence >= Props.data.highestSequence && Props.data.highestSequence !== 0)

  const [checked, setChecked] = useState(Props.data.done)

  const { token } = useContext(UserContext);



  function handleOnClick() {
    const url=process.env.API_URL;
    let request;

    if (checked) {
     
      request = axios.post(`${url}/habits/${Props.data.id}/uncheck`, {}, { headers: { Authorization: `Bearer ${token.token}` } })
    
   
    }

    else {
    

      request = axios.post(`${url}/habits/${Props.data.id}/check`, {}, { headers: { Authorization: `Bearer ${token.token}` } })


    }

    request.then(requestSuccess);

    request.catch(requestFail)

  }


  function requestSuccess(answer) {
    setChecked(!checked)
    Props.reloadFunction(true)
  }

  function requestFail(answer) {
    console.log(answer.response.status)
  }

  return (
    <UserTodayHabitBox>
      <h1>{Props.data.name}</h1>
      <p>current sequence: {Props.data.done ? <mark>{Props.data.currentSequence} days</mark> : `${Props.data.currentSequence} days`}</p>
      <p>your record: {recordValidation ? <mark>{Props.data.highestSequence} days</mark> : `${Props.data.highestSequence} days`}</p>
      <CheckBox onClick={() => handleOnClick()} done={Props.data.done}>
        <img src={checkIcon} alt="" />
      </CheckBox>
    </UserTodayHabitBox>
  )

}

const UserTodayHabitBox = styled.div`

width: 340px;
height: 94px;

background: wheat;
border-radius: 5px;
padding: 13px;
margin-top: 10px;

position: relative;

h1{
font-style: normal;
font-weight: normal;
font-size: 19.976px;
line-height: 25px;
color: darkgreen;
}

p{
  font-style: normal;
font-weight: normal;
font-size: 12.976px !important;
line-height: 16px;

color: #666666;
}

mark{
  all: unset;
  color: #8FC549
}

`
const CheckBox = styled.div`


width: 69px;
height: 69px;
right: 13px;
top: 13px;
position: absolute;

background: ${Props => !Props.done ? "#EBEBEB" : "#8FC549"};
border: ${Props => !Props.done ? "1px solid #E7E7E7" : "none"};
box-sizing: border-box;
border-radius: 5px;

display: flex;
align-items: center;
justify-content: center;


`