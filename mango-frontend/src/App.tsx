import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SprintsPage from './Pages/SprintsPage';
import SprintDetail from './Pages/SprintDetail';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sprints" element={<SprintsPage />} />
          <Route path="/sprints/:sprint_id" element={<SprintDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
