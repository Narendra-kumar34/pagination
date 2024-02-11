import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  const fetchData = async () => {
    try {
      let res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setData(res.data);
    } catch (err) {
      console.log("failed to fetch data", err);
      alert("failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totPages = Math.ceil(data.length / 10);
  const firstItemIndex = (currPage - 1) * 10;
  const lastItemIndex = Math.min(currPage * 10 - 1, data.length - 1);
  const currItems = data.slice(firstItemIndex, lastItemIndex + 1);

  const handleNext = () => {
    if (currPage < totPages) {
      setCurrPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currPage > 1) {
      setCurrPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currItems.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => handlePrev()}>Previous</button>
      <span className="pageno">{currPage}</span>
      <button onClick={() => handleNext()}>Next</button>
    </div>
  );
}

export default App;
