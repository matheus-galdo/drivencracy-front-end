import { styled } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateChoicePage from './pages/CreateChoicePage';
import HomePage from './pages/HomePage';
import CreatePollPage from './pages/CreatePollPage';
import Header from './components/Header';
import PollResultPage from './pages/PollResultPage';
import ChoiceVotePage from './pages/ChoiceVotePage';

export default function App() {
    return (
        <PagesContainer>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/poll/:pollId" element={<ChoiceVotePage />} />
                    <Route path="/poll/:pollId/result" element={<PollResultPage />} />
                    <Route path="/criar-poll" element={<CreatePollPage />} />
                    <Route path="/poll/:pollId/criar-choices" element={<CreateChoicePage />} />
                </Routes>
            </BrowserRouter>
        </PagesContainer>
    )
}

const PagesContainer = styled.main`
    width: calc(100vw - 50px);
    margin: auto;
    max-height: 100vh;
    padding: 25px;
`