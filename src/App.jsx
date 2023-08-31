import { styled } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateChoicePage from './pages/CreateChoicePage';
import HomePage from './pages/HomePage';
import CreatePollPage from './pages/CreatePollPage';

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/criar-poll" element={<CreatePollPage />} />
          <Route path="/poll/:pollId/criar-choices" element={<CreateChoicePage />} />
          
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`