import styled from "styled-components"
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getPollChoices, postChoice } from "../service/choiceService";
import { axiosErrorHandler } from "../service/errorHandler";

//erros validados pelo back-end no POST /choice
const postChoiceErrorMessages = {
    403: 'Enquete expirada! Você não pode criar novas opções',
    404: 'Enquete não existe',
    409: 'Opção já existe',
    422: 'Título da opção é obrigatório',
};

//erros validados pelo back-end no GET /poll/:id/choice
const getChoicesErrorMessages = {
    404: 'Enquete não existe',
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
            .catch(error => axiosErrorHandler(error, getChoicesErrorMessages));
    }, []);

    function createChoice(event) {
        event.preventDefault();

        postChoice({ ...pollForm, pollId })
            .then(response => setChoices([...choices, response.data]))
            .catch(error => axiosErrorHandler(error, postChoiceErrorMessages));
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
