import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [file, setFile] = useState();
  const [list, setList] = useState([]);

  function uploadNow() {
    const f = new FormData();
    f.append("file", file);
    axios.post("http://localhost:4000/api/files/upload", f, {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
    }).then((r) => {
      alert("uploaded");
      load();
    }).catch(() => alert("err upload"));
  }

  function load() {
    axios.get("http://localhost:4000/api/files", {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
    }).then((res) => {
      setList(res.data);
    })
  }

  function d(id) {
    axios.get("http://localhost:4000/api/files/download/" + id, {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
      responseType: "blob"
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "file";
      a.click();
    })
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ margin: "50px" }}>
      <h2>DASHBOARD</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
      <button onClick={uploadNow}>UPLOAD</button>

      <h3>FILES:</h3>
      <ul>
        {list.map((f, i) =>
          <li key={i}>
            {f.filename} 
            <button onClick={() => d(f._id)}>download</button>
          </li>
        )}
      </ul>

      <p style={{ cursor: "pointer", color: "red" }} onClick={() => {
        localStorage.removeItem("token");
        window.location="/";
      }}>LOGOUT</p>
    </div>
  );
}

export default Dashboard;