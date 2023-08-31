import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { getPolls } from "../service/pollService";
import Poll from "../components/Poll";

export default function HomePage() {
  const [polls, setPolls] = useState(null);

  useEffect(() => {
    getPolls()
      .then(response => setPolls(response.data))
      .catch();
  }, []);

  return (
    <HomeContainer>
      <PollsContainer>
        {polls?.map(poll => <Poll key={poll._id} poll={poll} />)}
      </PollsContainer>

      <button>
        <Link to="/criar-poll">
          <p>Nova <br /> poll</p>
        </Link>
      </button>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;

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
`;