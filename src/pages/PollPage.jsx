import styled from "styled-components"
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";

export default function PollPage() {
  const [choices, setChoices] = useState([]);
  const [pollResult, setPullResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const { pollId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/poll/${pollId}/result`)
      .then(response => {
        setPullResult(response.data);
        setLoading(false);
      })
      .catch();
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/poll/${pollId}/choice`)
      .then(response => {
        setChoices(response.data);
        setLoading(false);
      })
      .catch();
  }, []);

  return (
    <HomeContainer>

      {loading ? <>Carregando...</> : <>
        {choices.length > 0 ?
          <>
            {choices.map(choice => <Choice choice={choice} />)}
          </>
          :
          <>Esta enquete ainda não tem nenhuma opção para votar</>
        }
      </>}

    </HomeContainer>
  )
}

function Choice({ choice }) {
  function voteOnChoice(event) {
    axios.post(`http://localhost:5000/choice/${choice._id}/vote`)
      .then(response => {
        // setChoices(response.data);
        // setLoading(false);
      })
      .catch();
  }

  return <PollContainer>
    {choice.title}
    <button onClick={voteOnChoice}>Votar</button>
  </PollContainer>;
}

const PollContainer = styled.article`
  border: 1px solid black;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: black;

  img{
    width: 50px;
  }
`
const PollsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`