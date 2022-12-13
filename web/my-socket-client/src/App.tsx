import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const mySocket = new WebSocket("wss://733l6u90dc.execute-api.us-west-2.amazonaws.com/dev");

function App() {
  const [name, setName] = useState('')
  const [tableName, setTableName] = useState('')

  useEffect(()=>{
    
    mySocket.onopen = (e) => {
      console.log('OPEN: ');
      console.log(e);
    }

    mySocket.onmessage = (e) => {
      console.log('MESSAGE: ');
      console.log(e);
    }

    mySocket.onclose = (e) => {
      console.log('CLOSED: ')
      console.log(e)
    }
  }, []);

const myAction = {
  action: 'jointable',
  tableName: tableName,
  userName: name
}

const handleClick = () => {
  mySocket.send(JSON.stringify(myAction));
}

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        Name:<input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="false"></input><br></br>
        Table:<input type="text" id="table" value={tableName} onChange={(e) => setTableName(e.target.value)} autoComplete="false"></input>
        <br></br>
        <button onClick={handleClick}>
          Join Table
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
