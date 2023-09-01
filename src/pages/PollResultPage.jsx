import styled from "styled-components"
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getPollChoices, voteChoice } from "../service/choiceService";
import { getPollResult } from "../service/pollService";

export default function PollResultPage() {
    const [choices, setChoices] = useState([]);
    const [pollResult, setPullResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const { pollId } = useParams();

    useEffect(() => {
        getPollResult(pollId)
            .then(response => {
                setPullResult(response.data);
                setLoading(false);
            })
            .catch();
    }, []);

    useEffect(() => {
        getPollChoices(pollId)
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
                    </>
                    :
                    <>Esta enquete ainda não tem nenhuma opção para votar</>
                }
            </>}

        </HomeContainer>
    )
}

const PollContainer = styled.article`
    border: 1px solid black;
`;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
`