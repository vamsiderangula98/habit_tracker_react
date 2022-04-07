import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components/macro";

import SignInPage from "./Components/SignInPage";
import SignUpPage from "./Components/SignUpPage";
import TodayPage from "./Components/TodayPage";
import HabitsPage from "./Components/HabitsPage";
import HistoryPage from "./Components/HistoryPage";
import HistoryDatePage from "./Components/HistoryDatePage";

import UserContext from "./contexts/UserContext";
import { useEffect } from "react";

const AppStyled = styled.div`


font-family: 'Lexend Deca', sans-serif;
width: 100vw;
height: 100vh;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`

export default function App() {

  const [token, setToken] = useState([])
  const [percentageToday, setPercentageToday] = useState([0])

  useEffect(() => {
    const tokenOnLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

    setToken(tokenOnLocalStorage)
  }, []);


  return (
    <BrowserRouter>
      <AppStyled>
        <UserContext.Provider value={{ token, setToken, percentageToday, setPercentageToday }}>
          <Routes>
            <Route path="/" element={<SignInPage sessionToken={setToken} />}></Route>
            <Route path="/register" element={<SignUpPage />}></Route>
            <Route path="/today" element={<TodayPage />}></Route>
            <Route path="/habits" element={<HabitsPage />}></Route>
            <Route path="/history" element={<HistoryPage />}></Route>
            <Route path="/history/:dateId" element={<HistoryDatePage />}></Route>
          </Routes>
        </UserContext.Provider>
      </AppStyled>
    </BrowserRouter >
  );
}


