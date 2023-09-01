import styled from "styled-components"
import dayjs from "dayjs";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getPollResult } from "../service/pollService";
import LinkButton from "../components/LinkButton";

export default function PollResultPage() {
    const [pollResult, setPullResult] = useState(null);
    const { pollId } = useParams();

    useEffect(() => {
        getPollResult(pollId)
            .then(response => {
                setPullResult(response.data);
            })
            .catch();
    }, []);

    const pollIsExpired = new Date() > new Date(pollResult?.expireAt);

    return (
        <PollResultContainer>
            {pollResult && <>
                <h1>{pollResult.title}</h1>
                <h2>
                    {pollIsExpired ? "Enquete encerrada" : `Enquete encerra em ${dayjs(pollResult.expireAt).format('DD/MM/YYYY HH:mm')}`}
                </h2>


                <PollResult>
                    <p>Vencedor da enquete:</p>
                    <p>
                        <strong>{pollResult.result.title}:</strong>
                        <span>{pollResult.result.votes} votos</span>
                    </p>
                </PollResult>
            </>}
            
            <LinkButton path="/">Voltar pra home</LinkButton>
        </PollResultContainer>
    )
}

const PollResult = styled.p`
padding-top: 16px;
display: flex;
flex-direction: column;
align-items: center;
    strong{
        font-weight: bold;
        margin-right: 5px;
    }
    span{
        font-size: 28px;
    }
`;

const PollResultContainer = styled.div`
    padding: 16px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 50px);
`