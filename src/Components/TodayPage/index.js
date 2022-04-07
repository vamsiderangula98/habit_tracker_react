import styled from "styled-components";
import Header from "../Header";
import Menu from "../Menu";
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

    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`,
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

  let today = dayjs().locale("en").format("dddd, DD/MM");

  return (
    <TodayStyled>
      <Header />
      <TitleWrapper>
        <h1>{today}</h1>
        {percentageToday === 0 ? (
          <p>completed yet</p>
        ) : (
          <p>
            <mark>{percentageToday}% of complete habits</mark>
          </p>
        )}
      </TitleWrapper>
      <HabitsList>
        {todayHabitData.map((el, id) => (
          <UserTodayHabit key={id} data={el} reloadFunction={setReload} />
        ))}
      </HabitsList>
      <Background />
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
  height: 75px;

  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;

  padding: 24px 18px;

  h1 {
    font-style: normal;
    font-weight: normal;
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 17.976px;
    line-height: 22px;
    color: darkgreen!important;
  }

  mark {
    all: unset;
    color: #8fc549;
  }
`;
