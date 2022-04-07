import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import Background from "../Background";

import UserTodayHabit from "../UserTodayHabit";

import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

import { useState, useEffect } from "react";
import axios from "axios";

import dayjs from "dayjs";
import "dayjs/locale/en";

export default function TodayPage() {
  const { token, percentageToday, setPercentageToday } =
    useContext(UserContext);

  const [reload, setReload] = useState(false);

  const [todayHabitData, setTodayHabitData] = useState([]);

  useEffect(() => {
    setReload(false);
    const url=process.env.API_URL;
    const request = axios.get(
      `${url}/habits/today`,
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    
   
    request.then((answer) => {
      setTodayHabitData(answer.data);
      setPercentageToday(nanPreventEvent(answer.data));
    });

    request.catch((answer) => {
      console.log(answer.data.message);
    });

    // eslint-disable-next-line
  }, [reload]);

  function nanPreventEvent(data) {
    if (
      isNaN(
        parseInt(
          (data.filter((el) => el.done === true).length / data.length) * 100
        )
      )
    ) {
      return 0;
    } else {
      return parseInt(
        (data.filter((el) => el.done === true).length / data.length) * 100
      );
    }
  }

  let today = dayjs().locale("en").format("dddd, DD/MM/YYYY");

  return (
    <TodayStyled>
      <Header />
      <TitleWrapper>
        <h1><span>Date:</span>{today}</h1>
     
      <br/>
     

        {percentageToday === 0 ? (
          <p> No Habits Completed yet</p>
        ) : (
          <p>
            <mark>Total Habits Completed(in %):{percentageToday}%</mark>
          </p>
        )}
        <h2>List of Habits today:</h2>
      </TitleWrapper>
      <HabitsList>
        
        {todayHabitData.map((el, id) => (
          <UserTodayHabit key={id} data={el} reloadFunction={setReload} />
        ))}
      </HabitsList>
      <Background />
      <Footer></Footer>
    </TodayStyled>
  );
}

const TodayStyled = styled.div`
  width: 100%;
  height: 100%;

  padding: 77px 0px;
`;
const HabitsList = styled.div`
padding: 24px 18px 80px 18px;
min-height:60vh;
position:fixed;
top:41vh;
left:11vw;
min-width:25%;
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 92px;

  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;

  padding: 29px 18px;

  h1 {
    font-style: normal;
    font-weight: normal;
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
    width:450px;

  }
  h2{
padding:10px 0px;
    color:purple;
    font-size:2rem!important;
  }

  span {
    font-style: normal;
    font-weight: normal;
    font-size: 2rem;
    line-height: 22px;
    color: orange!important;
   
  }
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 17.976px;
    line-height: 22px;
    color: navyblue;
   
  }

  mark {
    all: unset;
    color: brown;
  }
`;
