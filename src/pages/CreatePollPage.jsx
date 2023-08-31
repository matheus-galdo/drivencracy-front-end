import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";



export default function CreatePollPage() {
  const [pollForm, setPollForm] = useState({});
  const navigate = useNavigate();

  function createPoll(event) {
    event.preventDefault();

    axios.post(`http://localhost:5000/poll`, pollForm)
      .then(response => navigate(`/poll/${response.data._id}/criar-choices`))
      .catch();
  }
  
  function handleForm(event) {
    setPollForm({ ...pollForm, [event.target.name]: event.target.value })
  }

  return (
    <TransactionsContainer>
      <h1>Nova ENQUETE</h1>
      <form onSubmit={createPoll}>
        <input placeholder="Título" type="text" name="title" required onChange={handleForm} />
        <input placeholder="Expira em" type="datetime-local" name="expireAt" onChange={handleForm} />
        <button>Criar ENQUETE</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
