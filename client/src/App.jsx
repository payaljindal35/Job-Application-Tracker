import { useState } from "react";
import axios from "axios";

function App() {

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const addJob = async () => {
    console.log("Button Clicked");
    try {

      await axios.post(
        "http://localhost:5000/api/jobs",
        {
          company,
          role,
          status
        }
      );

      alert("Application Added!");

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        CareerFlow
      </h1>

      <input
        className="form-control mb-3"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <select
        className="form-control mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>OA</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <button className="btn btn-primary" onClick={addJob}>
        Add Application
      </button>

    </div>
  );
}

export default App;

