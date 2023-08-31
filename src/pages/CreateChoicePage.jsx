import styled from "styled-components"
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";

export default function CreateChoicePage() {
  const [pollForm, setPollForm] = useState({});
  const [choices, setChoices] = useState([]);
  const { pollId } = useParams();

  const errorMessages = {
    404: 'Enquete não existe',
    409: 'Opção já existe',
    422: 'Título da opção é obrigatório',
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/poll/${pollId}/choice`)
      .then(response => setChoices(response.data))
      .catch();
  }, []);

  console.log(choices);

  function createChoice(event) {
    event.preventDefault();

    axios.post(`http://localhost:5000/choice`, { ...pollForm, pollId })
      .then(response => {
        setChoices([...choices, response.data])
      })
      .catch(error => {
        if (error.response.status in errorMessages) {
          alert(errorMessages[error.response.status])
        } else {
          alert('Ocorreu um erro inesperado')
        }
      });
  }

  function handleForm(event) {
    setPollForm({ ...pollForm, [event.target.name]: event.target.value })
  }

  return (
    <CreateChoiceContainer>
      <form onSubmit={createChoice}>
        <input placeholder="Opção" type="text" name="title" required onChange={handleForm} />
        <button>Criar</button>
      </form>

      <Link>
        listar choices criadas
      </Link>

      {choices.map(choice => <p>{choice.title}</p>)}
      <Link to="/home">Home</Link>
    </CreateChoiceContainer>

  )
}

const CreateChoiceContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
