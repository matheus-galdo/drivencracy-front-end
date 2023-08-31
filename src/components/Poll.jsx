import styled from "styled-components";
import { Link } from 'react-router-dom';

export default function Poll({ poll }) {
    return <PollContainer>
        <Link to={`/poll/${poll._id}`}>
            {poll.title}
        </Link>
    </PollContainer>;
}

const PollContainer = styled.article`
  border: 1px solid black;
`;