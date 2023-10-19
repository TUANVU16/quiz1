
import Quiz from './Quiz'
import { jsquizz } from './constants'


function App() {
  return( 
  <Quiz questions={jsquizz.questions} />
  )
}

export default App
