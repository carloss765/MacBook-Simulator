
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Desktop from './Desktop.jsx'

function App() {

  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Desktop />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
