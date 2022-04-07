
import Header from "../Header"
import Footer from "../Footer";

import Background from "../Background";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useParams } from "react-router-dom";

import { useState, useEffect } from 'react';
import axios from "axios";

import dayjs from "dayjs";

import UserHistoryPageHabit from "../UserHistoryHabit";

export default function HistoryDatePage() {

  const { token } = useContext(UserContext);

  const [historyData, setHistoryData] = useState([])


  useEffect(() => {
    const url=process.env.API_URL;

    const request = axios.get(`${url}/habits/history/daily`, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    });
   
    request.then(answer => requestSuccess(answer));

    // eslint-disable-next-line
  }, []);

  function requestSuccess(answer) {

    setHistoryData(daysArray(answer.data))

  }

  function daysArray(array) {

    for (let i = 0; i < array.length; i++) {

      let total = array[i].habits.length

      for (let j = 0; j < total; j++) {


        if (array[i].habits[j].date === dateId) {
          return array[i].habits
        }
      }
    }
  }

  const { dateId } = useParams()

  function historyPercentage(array) {
    let numb = 0
    for (let i = 0; i < array.length; i++) {
      if (array[i].done === true) {
        numb++
      }
    }
    return (parseInt(numb / array.length * 100))
  }

  let percentageToday = historyPercentage(historyData)



  return (
    <HistoryStyled>
      <Header></Header>
      <TitleWrapper>
        <h1>{dayjs(dateId).locale('en').format('dddd, DD/MM/YYYY')}</h1>
        {percentageToday === 100 ? <p><mark>Hurray!All Habits Completed</mark></p> :
          percentageToday !== 0 ? <p> {percentageToday}% of the habits made</p> : <p> No habits completed that day</p>}
      </TitleWrapper >
      <HabitsList>
        {historyData.map((el, id) => <UserHistoryPageHabit key={id} data={el} />)}
      </HabitsList>


     
      <Background></Background>
      <Footer></Footer>
    </HistoryStyled>
  )


}

const HistoryStyled = styled.div`

width: 100%;
height: 100%;

padding: 77px 0px;


`

const TitleWrapper = styled.div`

width:100%;
height: 75px;

display: flex;
flex-direction:column;
align-items: left;
justify-content:flex-start;

padding: 24px 18px;

h1{
  font-style: normal;
font-weight: normal;
font-size: 23px;
line-height: 29px;
color: #126BA5;
}

p{
font-style: normal;
font-weight: normal;
font-size: 17.976px;
line-height: 22px;
color: #E75766;
}

mark{
  all: unset;
  color: #8FC549
}



`
const HabitsList = styled.div`

padding: 24px 18px 80px 18px;
position:fixed;
left:25%;
top:45%;
p{
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 22px;

color: #666666;
}

`