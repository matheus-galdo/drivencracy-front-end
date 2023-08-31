import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import logoDrivencracy from "../assets/drivencracy-logo.svg";

export default function HomePage() {
  const [polls, setPolls] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/poll`)
      .then(response => setPolls(response.data))
      .catch();
  }, []);

  return (
    <HomeContainer>
      <Header>
        <img src={logoDrivencracy} alt="Logo drivencracy" />
        <h1>DrivenCracy</h1>
      </Header>

      <PollsContainer>
        {polls?.map(poll => <Poll poll={poll} />)}

      </PollsContainer>


        <button>
          <Link to="/criar-poll">
            <p>Nova <br /> poll</p>
          </Link>
        </button>

    </HomeContainer>
  )
}

function Poll({ poll }) {
  return <PollContainer>
    <Link to={`/poll/${poll._id}`}>
      {poll.title}
    </Link>
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