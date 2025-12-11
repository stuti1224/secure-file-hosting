import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  uploadFile,
  getMyFiles,
  getPublicFiles,
  deleteFile,
  downloadFile,
} from "../api/fileApi";

function Dashboard() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [privacy, setPrivacy] = useState("private");
  const [myFiles, setMyFiles] = useState([]);
  const [publicFiles, setPublicFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      loadFiles();
    }
  }, [navigate]);

  async function loadFiles() {
    try {
      const [myRes, publicRes] = await Promise.all([
        getMyFiles(),
        getPublicFiles(),
      ]);
      setMyFiles(myRes.data);
      setPublicFiles(publicRes.data);
    } catch (err) {
      console.error(err);
      alert("Error loading files");
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please choose a file");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("privacy", privacy);

      await uploadFile(formData);
      alert("File uploaded");
      setSelectedFile(null);
      e.target.reset();
      setPrivacy("private");
      loadFiles();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this file?")) return;
    try {
      await deleteFile(id);
      setMyFiles((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  async function handleDownload(id, filename) {
    try {
      const blob = await downloadFile(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      {/* Upload section */}
      <section style={{ marginTop: "30px" }}>
        <h2>Upload a File</h2>
        <form onSubmit={handleUpload}>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>
              Privacy:{" "}
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </section>

      {/* My files */}
      <section style={{ marginTop: "40px" }}>
        <h2>My Files</h2>
        {myFiles.length === 0 ? (
          <p>No files yet.</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th>
                <th>Size (KB)</th>
                <th>Privacy</th>
                <th>Actions</th>
                <th>Share Link</th>
              </tr>
            </thead>
            <tbody>
              {myFiles.map((file) => (
                <tr key={file._id}>
                  <td>{file.filename}</td>
                  <td>{Math.round(file.size / 1024)}</td>
                  <td>{file.privacy}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDownload(file._id, file.filename)
                      }
                    >
                      Download
                    </button>{" "}
                    <button onClick={() => handleDelete(file._id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <small>
                      {`http://localhost:4000/api/files/download/${file._id}`}
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Public files */}
      <section style={{ marginTop: "40px" }}>
        <h2>Public Files</h2>
        {publicFiles.length === 0 ? (
          <p>No public files yet.</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Size (KB)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {publicFiles.map((file) => (
                <tr key={file._id}>
                  <td>{file.filename}</td>
                  <td>{file.user}</td>
                  <td>{Math.round(file.size / 1024)}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDownload(file._id, file.filename)
                      }
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
