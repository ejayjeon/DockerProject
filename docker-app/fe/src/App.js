import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");
  const inputHandler = (e) => {
    setValue(e.currentTarget.value);
  };
  const submitHandler = (e) => {
    // 버튼 누르면 일어나는 이벤트 버블링을 막아줌
    e.preventDefault();
    axios.post("/api/value", { value: value }).then((response) => {
      // success : true로 보냈기 때문
      if (response.data.success) {
        console.log(`response.data: ${response.data}`);
        // 원래 있던 리스트 다음에 넣어주어야 하기 때문에
        setLists([...lists, response.data]);
        setValue("");
      } else {
        alert("값을 저장하는 데 실패했습니다");
      }
    });
  };
  useEffect(() => {
    // DB에 있는 값을 가져옴
    axios.get("/api/values").then((response) => {
      console.log(`response: ${response.data}`);
      setLists(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists &&
            lists.map((l, i) => {
              return <li key={i}>{l.value}</li>;
            })}
          <form className="example" onSubmit={submitHandler}>
            <input
              onChange={inputHandler}
              type="text"
              placeholder="내용을 입력해 주세요"
              value={value}
            />
            <button type="submit">OK</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
