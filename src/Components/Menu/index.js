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
        <TodayBar>
          <h1 className="bar-text">Today</h1>
        
        </TodayBar>
      </Link>
      <Link style={{ textDecoration: 'none' }} to="/history">
        <h1>History</h1>
      </Link>
    </HeaderStyled>
  )

}

const HeaderStyled = styled.nav`

width: 60%;
height: 69px;
border-top:2px solid grey;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
position:fixed;
left:32%;
top:0px;
z-index:10;
padding: 0px 29px;
display: flex;
align-items: center;
justify-content: flex-end;

h1{
font-style: normal;
font-weight: normal;
font-size: 17px !important;
line-height: 20px;
text-align: center;
color: greenyellow !important;
}

`
const TodayBar = styled.div`

width: 88px;
height: 88px;
position: relative;

.bar-text{
  position: absolute;
font-style: normal;
font-weight: normal;
font-size: 17.976px;
line-height: 22px;
text-align: center;
color: greenyellow !important;
bottom: 34px;
left:20px;
}

`

