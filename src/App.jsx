import { styled } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateChoicePage from './pages/CreateChoicePage';
import HomePage from './pages/HomePage';
import CreatePollPage from './pages/CreatePollPage';
import PollPage from './pages/PollPage';
import Header from './components/Header';

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/poll/:pollId" element={<PollPage />} />
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