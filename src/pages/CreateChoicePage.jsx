import styled from "styled-components"
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getPollChoices, postChoice } from "../service/choiceService";

export default function CreateChoicePage() {
  const [pollForm, setPollForm] = useState({});
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { pollId } = useParams();

  useEffect(() => {
    getPollChoices(pollId)
      .then(response => {
        setChoices(response.data);
        setLoading(false);
      })
      .catch();
  }, []);

  function createChoice(event) {
    event.preventDefault();

    postChoice({ ...pollForm, pollId })
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


      {loading ? <>Carregando...</> : <>
        { choices.length > 0 ?
          <>
            {choices.map(choice => <p>{choice.title}</p>)}
          </>
          :
          <>Você ainda não criou nenhuma opção para essa enquete</>
        }
      </>}

      <Link to="/">Home</Link>
    </CreateChoiceContainer>

  )
}

const errorMessages = {
  404: 'Enquete não existe',
  409: 'Opção já existe',
  422: 'Título da opção é obrigatório',
};

const CreateChoiceContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
