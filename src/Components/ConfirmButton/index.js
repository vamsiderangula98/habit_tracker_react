import styled from "styled-components";


export default function ConfirmButton(Props) {
  return (
    <ButtonStyled
      isLoading={Props.isLoading}
      type="submit"
      disabled={Props.isLoading}
    >
      {Props.isLoading ?
        "Loading..."
      : 
        Props.text
      }
    </ButtonStyled>
  );
}
//styling the button
const ButtonStyled = styled.button`
  width: 303px;
  height: 45px;
  left: 36px;
  top: 381px;

  background:navy;
  border-radius: 5px;

  font-style: normal;
  font-weight: normal;
  font-size: 21px;
  line-height: 26px;
  text-align: center;

  color: lightgreen;
  opacity: ${(props) => (props.isLoading ? 0.7 : 1)};
`;
