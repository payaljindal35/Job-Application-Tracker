import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";
const STATUSES = ["Applied", "OA", "Interview", "Rejected", "Offer"];

function App() {

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(API_URL);
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async () => {
    if (!company || !role) {
      alert("Please fill in company and role");
      return;
    }
    try {
      await axios.post(API_URL, { company, role, status });
      setCompany("");
      setRole("");
      setStatus("Applied");
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = jobs.filter((j) => j.status === s).length;
    return acc;
  }, {});

  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        CareerFlow
      </h1>

      {/* Dashboard counters */}
      <div className="row mb-4 g-2">
        {STATUSES.map((s) => (
          <div className="col" key={s}>
            <div className="card text-center h-100">
              <div className="card-body py-2">
                <div className="text-muted small">{s}</div>
                <div className="fs-4 fw-bold">{counts[s]}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="col">
          <div className="card text-center h-100 bg-light">
            <div className="card-body py-2">
              <div className="text-muted small">Total</div>
              <div className="fs-4 fw-bold">{jobs.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add application form */}
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
        {STATUSES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <button className="btn btn-primary mb-4" onClick={addJob}>
        Add Application
      </button>

      {/* Applications list */}
      <h3 className="mb-3">Applications</h3>

      {jobs.length === 0 ? (
        <p className="text-muted">No applications yet.</p>
      ) : (
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={job.status}
                    onChange={(e) => updateStatus(job._id, e.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td>{new Date(job.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteJob(job._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default App;

