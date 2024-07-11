import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SprintsPage from './Pages/SprintsPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sprints" element={<SprintsPage />} />
        </Routes>

      </Router>
    </>

  )
}

export default App
