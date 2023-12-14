import { useState, useEffect } from "react";
import "./App.css";
import { useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@$#&%^_-=`~*{}[]()+/";

    for (let i = 1; i <= length; i++) {
      let idx = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(idx);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <div className="max-w-lg mx-auto bg-gray-700 p-10 my-10 rounded-lg space-y-2">
      <h1 className="text-white text-4xl text-center">Password Generator</h1>
      <div className="flex">
        <input
          type="text"
          value={password}
          placeholder="Password"
          className="outline-none p-4 rounded-l-lg w-full text-orange-500"
          readOnly
        />
        <button className="bg-orange-400 px-5 rounded-r-lg">Copy</button>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-orange-400">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed(!numberAllowed)}
          />
          <label className="text-orange-400">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed(!charAllowed)}
          />
          <label className="text-orange-400">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
