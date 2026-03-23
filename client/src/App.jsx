import './App.css'
import AllRoutes from './AllRoutes/AllRoutes.jsx'
import { DialogueProvider } from './Components/Common/Dialogue/DialogueContext.jsx';

function App() {

  return (
    <DialogueProvider>
      <AllRoutes>
        {}
      </AllRoutes>
    </DialogueProvider>
  )
}

export default App
