import { useState } from 'react'
import Loading from './components/Loading/Loading'
import Medical from './components/Medical/Medical'
import Submission from './components/Submission/Submission'
import Completion from './components/Completion/Completion'
import './App.css';

const App: React.FC = () => {
  const [stage, setStage] = useState<string>('medical');
  const [loading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<{[index: string]: string}>({});

  return (
    <div className="App">
      <h1>London Foot & Ankle Surgery</h1>
      <h2>Medical Form</h2>
      <div className="medical-container">
      {
        loading ?
          <Loading /> :
            stage === 'medical' ?
              <Medical 
                setStage={(stage: string) => setStage(stage)}
                setFields={(fields) => setFields(fields)}
                fields={fields}
                /> :
                stage === 'submission' ?
                  <Submission 
                    setStage={(stage: string) => setStage(stage)}
                    setFields={(fields) => setFields(fields)}
                    fields={fields}
                    setLoading={(value: boolean) => setLoading(value)}
                    /> :
                    <Completion /> 
      }
      </div>
    </div>
  );
}

export default App;
