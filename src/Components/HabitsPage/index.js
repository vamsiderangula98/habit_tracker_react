import Header from "../Header";
import Footer from "../Footer";
import Background from "../Background";
import InputBox from "../Input";
import WeekdayBox from "../WeekdayBox";
import SaveButton from "../SaveButton";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import UserSavedHabit from "../UserSavedHabit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function HabitsPage() {

  const [creationMode, setCreationMode] = useState(false)

  const [habitsData, setHabitsData] = useState([]);

  const { token } = useContext(UserContext);

  const [loading, setLoading] = useState(false)

  const [reload, setReload] = useState([false])

  const [newHabit, setNewHabit] = useState({
    name: "",
    days: []
  })

  useEffect(() => {

    setReload([false])
    setCreationMode(false)
    setLoading(false)
    setNewHabit({
      name: "",
      days: []
    })
const url=process.env.API_URL;
    const request = axios.get(`${url}/habits`, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    });
   
    request.then(answer => {
      setHabitsData(answer.data);

    })


      ;
    // eslint-disable-next-line
  }, reload);

  function handleHabitsContent() {

    if (habitsData.length === 0) {

      return (
        <p>No habits registered yet. Add a  new habit to start tracking!</p>
      )
    }

    else {

      return (
        <>
          {habitsData.map((el, id) => <UserSavedHabit key={id} data={el} deleteFunction={removeHabit} />)}
        </>
      )
    }

  }

  function addHabit(event) {

    event.preventDefault()

    setLoading(true)
const url=process.env.API_URL;
    const request = axios.post(`${url}/habits`, newHabit, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    })

    request.then(requestSuccess);

    request.catch(requestFail)

  }

  function removeHabit(id) {

    const confirmBox = window.confirm("Do you want to delete Habit?")

    if (confirmBox === true) {


      setLoading(true)
      const url=process.env.API_URL;

      const request = axios.delete(`${url}/habits/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`
        }
      })

      request.then(requestSuccess);

      request.catch(requestFail)
    }

    else {
      return
    }

  }


  function requestSuccess() {
    setReload([true])

  }

  function requestFail(answer) {
    console.log(answer.response.status)

    notify("OOPS! Something went wrong.Try Again");
    setLoading(false)

  }

  const notify = (text) => toast.error(`${text}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });



  function handleCreationForm() {

    return (
      <NewHabitBox isLoading={loading}>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <form onSubmit={addHabit}>
          <InputBox
            type="text"
            placeholder="Name of the habit"
            value={newHabit.name}
            onChange={setNewHabit}
            inputState={newHabit}
            stateKey="name"
            isLoading={loading}
          />
          <div className="week-list">
            {Array.from(Array(7).keys()).map((el) => <WeekdayBox key={el} state={newHabit} setState={setNewHabit} createMode={true} weekday={el} />)}
          </div>
          <div className="create-option-wrapper">
            <h1 onClick={() => { setCreationMode(false) }}>Calendar</h1>
            <SaveButton text="ADD" isLoading={loading} />
          </div>
        </form>
      </NewHabitBox>
    )

  }


  return (
    <HabitsStyled>
      <Header></Header>
      
      <TitleWrapper>
        
        <AddButton onClick={() => { setCreationMode(true) }}>Add Habit</AddButton>
      </TitleWrapper>
      <HabitsList>
      <h2>My Habits</h2>
        {creationMode === true ? handleCreationForm() : ""}
        {handleHabitsContent()}
      </HabitsList>
   
      <Background></Background>
      <Footer></Footer>
    </HabitsStyled>
  )


}


const NewHabitBox = styled.section`

width: 500px;
height: 200px;

background:#acb9b9;
border-radius:1rem 1rem;
border:solid 2px lightgreen ;

padding: 18px;

display: flex;
flex-wrap: wrap;
flex-direction: column;
left:37%;
position: relative;

${props => props.isLoading ? "pointer-events: none;" : ""}

.week-list{
  padding-top: 8px;
  display: flex;
  gap: 15px;
  color:black;
}

.create-option-wrapper{
  display: flex;
  position: absolute;
  bottom: 18px;
  right: 18px;
  align-items: center;
  gap: 23px;

  h1{

    font-style: normal;
    font-weight: normal;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: darkgreen!important;
    opacity: ${props => props.isLoading ? 0.7 : 1}
  }
}

`

const HabitsStyled = styled.section`

width: 100%;
height: 100%;

padding: 76px 0px;

`

const HabitsList = styled.div`

padding: 0px 19px 78px 19px;
h2{
  font-style: normal;
font-weight: normal;
font-size: 22.976px;
line-height: 29px;

color: darkgreen;
}
p{
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 22px;

color: black;
}

`

const TitleWrapper = styled.div`

width:100%;
height: 74px;

display: flex;
align-items: center;
justify-content: space-between;
flex-direction:column;
padding: 0px 19px;



`
const AddButton = styled.div`

width: 158px;
height:35px;
left: 317px;
top: 92px;

background: darkgreen;
border-radius:1rem 1rem;

padding-bottom: 0.1em;

display: flex;
align-items:center;
justify-content:center;


font-style: normal;
font-weight: normal;
font-size: 26px;
line-height: 34px;
text-align: center;
align-self:center;
color:wheat;

`