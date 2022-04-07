import styled from "styled-components"
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";


export default function Menu() {

  const { percentageToday } = useContext(UserContext);

  const percentage = percentageToday;
  console.log(percentage);


  return (
    <HeaderStyled>
      <Link style={{ textDecoration: 'none' }} to="/habits">
        <h1> My Habits</h1>
      </Link>
      <Link style={{ textDecoration: 'none' }} to="/today">
        <TodayProgressBar>
          <h1 className="progress-bar-text">Today</h1>
        
        </TodayProgressBar>
      </Link>
      <Link style={{ textDecoration: 'none' }} to="/history">
        <h1>History</h1>
      </Link>
    </HeaderStyled>
  )

}

const HeaderStyled = styled.nav`

width: 100%;
height: 70px;
border-top:2px solid grey;
background: aquamarine;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
position:fixed;
bottom: 0px;
left: 0px;
z-index:10;
padding: 0px 18px;
display: flex;
align-items: center;
justify-content: space-between;

h1{
font-style: normal;
font-weight: normal;
font-size: 17.976px !important;
line-height: 22px;
text-align: center;
color: brown !important;
}

`
const TodayProgressBar = styled.div`

width: 91px;
height: 91px;
position: relative;
bottom: 20px;

.progress-bar-text{
  position: absolute;
font-style: normal;
font-weight: normal;
font-size: 17.976px;
line-height: 22px;
text-align: center;
color: yellow !important;
bottom: 34px;
left:23px;
}

`

