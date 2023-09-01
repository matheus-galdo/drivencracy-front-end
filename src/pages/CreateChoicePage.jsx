import styled from "styled-components"
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getPollChoices, postChoice } from "../service/choiceService";
import axiosErrorHandler from "../service/errorHandler";

//error validados pelo back-end no POST Choice
const errorMessages = {
  403: 'Enquete expirada! Você não pode criar novas opções',
  404: 'Enquete não existe',
  409: 'Opção já existe',
  422: 'Título da opção é obrigatório',
};

export default function CreateChoicePage() {
  const [pollForm, setPollForm] = useState({});
  const [choices, setChoices] = useState([]);

  const { pollId } = useParams();

  useEffect(() => {
    getPollChoices(pollId)
      .then(response => {
        setChoices(response.data);
      })
      .catch(error => {
        alert("Ocorreu um erro ao acessar essa enquete, confira se o back-end está funcionando corretamente");
        console.log(error.response);
      });
  }, []);

  function createChoice(event) {
    event.preventDefault();

    postChoice({ ...pollForm, pollId })
      .then(response => setChoices([...choices, response.data]))
      .catch(error => axiosErrorHandler(error, errorMessages));
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

      {choices.length > 0 ?
        <>
          {choices.map(choice => <p key={choice._id}>{choice.title}</p>)}
        </>
        :
        <>Você ainda não criou nenhuma opção para essa enquete</>
      }

      <Link to="/">Home</Link>
    </CreateChoiceContainer>
  )
}

const CreateChoiceContainer = styled.section`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
