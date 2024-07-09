import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Drawer from './components/Drawer';
// import { Button } from "@/components/ui/button"
// import { Button } from './components/ui/Button';
// import { Button } from "./components/ui/button"

// import { Button } from "@/components/ui/button"
import HomePage from './Pages/HomePage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/trends" element={<PollTrends />} /> */}
          {/* <Drawer /> */}
          {/* <Button /> */}
        </Routes>

      </Router>
    </>

  )
}

export default App
