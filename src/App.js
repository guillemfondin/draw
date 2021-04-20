import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import {rand} from "./utils/rand";

function App() {
  const [count, setCount] = useState(0);
  const [startLength, setStartLength] = useState(0);
  const [saveStart, setSaveStart] = useState([]);
  const [drawStart, setDrawStart] = useState(false);
  const [value, setValue] = useState("");
  const [peoples, setPeoples] = useState([]);
  const [result, setResult] = useState([]);

  const handleChange = e => {
    setValue(e.target.value);
  }

  const handleReset = () => {
    setPeoples([]);
    setResult([]);
    setSaveStart([]);
    setValue("");
    setDrawStart(false);
    setCount(0);
    setStartLength(0);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setPeoples([...peoples, value]);
    setValue("");
  }

  const handleDraw = () => {
    setDrawStart(!drawStart);
    setSaveStart(peoples);
    setStartLength(peoples.length);
  }

  useEffect(() => {
    if (!drawStart || !peoples.length || count > startLength) {
      setDrawStart(false);
      return;
    }

    setTimeout(() => {
      setCount(count + 1);

      const index = rand(0, peoples.length - 1);

      setResult([...result, peoples[index]]);
      setPeoples(peoples.filter((people) => people !== peoples[index]));
    }, 2000);
  }, [peoples, drawStart])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form onSubmit={handleSubmit}>
          <input value={value} onChange={handleChange} placeholder={'Enter a name'} />
          <button className={'send__button'} type={'submit'}>Send</button>
        </form>

        {!!peoples.length && <button className={'run__button'} onClick={handleDraw}>Tirer au sort !</button>}
        {!peoples.length && result.length === startLength && (
          <button className={'run__button'} onClick={handleReset}>Reset</button>
        )}

        <div className={'row'}>
          <div className={'col toDraw'}>
            {!!peoples.length ? (
              <>
                <h2>En attente du tirage</h2>
                {peoples.map((name, index) => <p key={index}>{name}</p>)}
              </>
            ) : !peoples.length && !!saveStart.length ? (
              <>
                <h2>Liste initiale</h2>
                {saveStart.map((name, index) => <p key={index}>{name}</p>)}
              </>
            ) : <></>}
          </div>

          <div className={'col result'}>
            {!!result.length && (
              <>
                <h2>Résultats</h2>
                {result.map((name, index) => <p key={index}>{index+1}. {name}</p>)}
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
