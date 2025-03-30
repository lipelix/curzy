import './App.css'
import HomePage from './components/HomePage'
import { SupportMe } from './components/SupportMe'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HomePage />
      </header>
      <div className="App-footer">
        <SupportMe />
      </div>
    </div>
  )
}

export default App
