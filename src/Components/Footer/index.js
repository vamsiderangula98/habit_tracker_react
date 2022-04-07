import styled from "styled-components"

export default function Footer() {


  return (
    <FooterStyled>
       <p>@Created by Vamsi Krishna Derangula</p>
       
    </FooterStyled>
  )

}

const FooterStyled = styled.footer`
p{
  font-size:19px;
  text-align:right;
  font-family:monospace;
  color:yellow;
  position:fixed;
  right:0;
}
width: 100%;
height: 35px;

background: navy;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

position:fixed;
bottom:0px;
left: 0px;

padding: 0px 18px;

display: flex;
align-items: center;
justify-content: space-between;
z-index:10;
`

