import Menu from "../Menu";
import styled from "styled-components"
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
export default function Header() {

  const { token } = useContext(UserContext);

  return (
    <HeaderStyled>
       <p>Habit Tracking</p>
       <Menu></Menu>
      <UserPicture>
       
       <img src={token.image} alt="Avatar" /> 
      </UserPicture>
    </HeaderStyled>
  )

}

const HeaderStyled = styled.header`
p{
  font-size:35px;
  font-family:monospace;
  color:yellow;
}
width: 100%;
height: 70px;

background: navy;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

position:fixed;
top: 0px;
left: 0px;

padding: 0px 18px;

display: flex;
align-items: center;
justify-content: space-between;
z-index:10;
`

const UserPicture = styled.div`
  height: 53px;
  width: 53px;
display: flex;
align-items: center;
justify-content: center;
overflow:hidden;
background-color: yellow;
border-radius:100%;

img{
  height: 51px;
  object-fit: contain;

}

`