import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  uploadFile,
  getMyFiles,
  getPublicFiles,
  deleteFile,
  downloadFile,
} from "../api/fileApi";

export default function Dashboard() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [privacy, setPrivacy] = useState("private");
  const [myFiles, setMyFiles] = useState([]);
  const [publicFiles, setPublicFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  if (!localStorage.getItem("token")) {
    navigate("/login");
    return;
  }

  loadFiles();
}, []);

const loadFiles = async () => {
  try {
    const my = await getMyFiles();
    setMyFiles(my.data);

    const pub = await getPublicFiles();
    setPublicFiles(pub.data);

  } catch (err) {
    alert("Error loading files");
    console.log("Load files error:", err);
  }
};


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

      alert("file uploaded");

      setSelectedFile(null);
      setPrivacy("private");

      loadFiles();
    } catch (err) {
      console.log(err);
      alert("upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("delete file?")) return;

    try {
      await deleteFile(id);
      loadFiles();
    } catch (err) {
      alert("delete failed");
    }
  }

  async function handleDownload(id, name) {
    try {
      const blob = await downloadFile(id);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("download failed");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>

      <button onClick={logout}>Logout</button>

      {/* Upload Section */}
      <section style={{ marginTop: "30px" }}>
        <h2>Upload File</h2>

        <form onSubmit={handleUpload}>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <br />

          <label>
            Privacy:
            <select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </label>
          <br />

          <button type="submit" disabled={loading}>
            {loading ? "uploading..." : "upload"}
          </button>
        </form>
      </section>

      {/* My Files */}
      <section style={{ marginTop: "40px" }}>
        <h2>My Files</h2>

        {myFiles.length === 0 ? (
          <p>No files yet</p>
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
                    <button onClick={() => handleDownload(file._id, file.filename)}>
                      Download
                    </button>
                    <button onClick={() => handleDelete(file._id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    http://localhost:4000/api/files/download/{file._id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Public Files */}
      <section style={{ marginTop: "40px" }}>
        <h2>Public Files</h2>

        {publicFiles.length === 0 ? (
          <p>No public files yet</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th>
                <th>Size (KB)</th>
                <th>Owner</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {publicFiles.map((file) => (
                <tr key={file._id}>
                  <td>{file.filename}</td>
                  <td>{Math.round(file.size / 1024)}</td>
                  <td>{file.user}</td>
                  <td>
                    <button onClick={() => handleDownload(file._id, file.filename)}>
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