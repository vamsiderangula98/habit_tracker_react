import styled from "styled-components";
import WeekdayBox from "../WeekdayBox";
import trashCanIcon from "../../assets/trashcan-icon.svg"
//newly added habit
export default function UserSavedHabit(Props) {
  
  return (
    Props.isLoading?"Loading..."
  :
    <UserHabitBox>
      <h1 className="habit-name">{Props.data.name}</h1>
      <div className="week-list">
        {Array.from(Array(7).keys()).map((el) => <WeekdayBox key={el} state={Props.data} createMode={false} weekday={el} />)}
      </div>
      <img onClick={() => Props.deleteFunction(Props.data.id)} className="delete-icon" src={trashCanIcon} alt="delete habit" />
    </UserHabitBox>
  )

}

const UserHabitBox = styled.div`

width: 370px;
height: 97px;

background:#1d4054;
border-radius:1rem 1rem;
padding: 13px;
margin-top: 10px;

position: relative;

h1{
font-style: normal;
font-weight: normal;
font-size: 19.976px;
line-height: 25px;

}
.habit-name{
  color:lightgreen;
}

.delete-icon{
  position: absolute;
  top: 11px;
  right: 11px;
  background-color:wheat;


}
.week-list{
  padding-top: 8px;
  display: flex;
  gap: 4px;
}

`