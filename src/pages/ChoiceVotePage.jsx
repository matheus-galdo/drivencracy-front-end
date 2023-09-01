import styled from "styled-components"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getPollChoices, voteChoice } from "../service/choiceService";
import Choice from "../components/Choice";
import { useNavigate } from 'react-router-dom';

export default function ChoiceVotePage() {
    const [choices, setChoices] = useState([]);
    const [selectedChoiceId, setSelectedChoiceId] = useState(null);
    const { pollId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPollChoices(pollId)
            .then(response => setChoices(response.data))
            .catch();
    }, []);

    function submitVote(event) {
        event.preventDefault();

        voteChoice(selectedChoiceId)
            .then(response => navigate(`/poll/${pollId}/result`))
            .catch();
    }

    // criando uma lista de props pra passar no componente Choice, fica mais fácil usar assim
    const choiceProps = { selectedChoiceId, setSelectedChoiceId };

    return <ChoiceVoteContainer>
        {choices.length > 0 ?
            <>
                <form onSubmit={submitVote}>
                    {choices.map(choice => <Choice key={choice._id} choice={choice} {...choiceProps} />)}

                    <VoteButton disabled={!selectedChoiceId}>
                        {selectedChoiceId ? "Votar" : "Escolha uma opção"}
                    </VoteButton>
                </form>

            </>
            :
            <>Esta enquete ainda não tem nenhuma opção para votar</>
        }
    </ChoiceVoteContainer>;
}

const ChoiceVoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  padding: 16px;
`;

const VoteButton = styled.button`
    ${({ disabled }) => disabled && "background-color: lightgray;"}
`;
