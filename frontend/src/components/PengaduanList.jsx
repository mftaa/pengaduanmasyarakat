import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const PengaduanList = () => {
  const [pengaduans, setPengaduans] = useState([]);
  const [status, setStatus] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate;
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  useEffect(() => {
    getPengaduans();
  }, []);

  useEffect(() => {
    const getPengaduanById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/pengaduans/${id}`
        );

        setStatus(response.data.status);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPengaduanById();
  }, [id]);
  const getPengaduans = async () => {
    const response = await axios.get("http://localhost:5000/pengaduans");
    setPengaduans(response.data);
  };
  // const updatePengaduan = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.patch(`http://localhost:5000/pengaduans/${id}`, {
  //       status: "proses",
  //     });
  //     navigate("/pengaduans");
  //   } catch (error) {
  //     if (error.response) {
  //       setMsg(error.response.data.msg);
  //     }
  //   }
  // };
  const deletePengaduan = async (pengaduanId) => {
    await axios.delete(`http://localhost:5000/pengaduans/${pengaduanId}`);
    getPengaduans();
  };
console.log(pengaduans)
  return (
    <div>
      {user && user.role === "user" && (
        <div>
          <h1 className="title">Pengaduan</h1>
          <h2 className="subtitle">List of Pengaduan</h2>
          <Link to="/pengaduans/add" className="button is-primary mb-2">
            Add New
          </Link>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>isi laporan</th>
                <th>foto</th>
                <th>Tanggapan</th>
                <th>Validasi</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pengaduans.map((pengaduan, index) => (
                <tr key={pengaduan.uuid}>
                  <td>{index + 1}</td>
                  <td>{pengaduan.isi_laporan}</td>
                  <td>
                    
                    <img src={pengaduan?.url} alt="Image" width={30} />
                  </td>
                  <td>{pengaduan.tanggapan}</td>
                  <td>{pengaduan.status}</td>
                  <td>{pengaduan.user.name}</td>
                  <td>
                    <Link
                      to={`/pengaduans/edit/${pengaduan.uuid}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePengaduan(pengaduan.uuid)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {user && user.role === "officer" && (
        <div>
          <h1 className="title">Pengaduan</h1>
          <h2 className="subtitle">List of Pengaduan</h2>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>isi laporan</th>
                <th>foto</th>
                <th>Tanggapan</th>
                <th>Validasi</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pengaduans.map((pengaduan, index) => (
                <tr key={pengaduan.uuid}>
                  <td>{index + 1}</td>
                  <td>{pengaduan.isi_laporan}</td>
                  <td>
                    {" "}
                    <img src={pengaduan?.url} alt="Image" width={30} />
                  </td>
                  <td>{pengaduan.tanggapan}</td>
                  <td>{pengaduan.status}</td>
                  <td>{pengaduan.user.name}</td>
                  <td>
                    {/* <button onClick={updatePengaduan}>Proses</button> */}
                    <Link
                      to={`/pengaduans/edit/${pengaduan.uuid}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePengaduan(pengaduan.uuid)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {user && user.role === "admin" && (
        <div>
          <h1 className="title">Pengaduan</h1>
          <h2 className="subtitle">List of Pengaduan</h2>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>isi laporan</th>
                <th>foto</th>
                <th>Tanggapan</th>
                <th>Validasi</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pengaduans.map((pengaduan, index) => (
                <tr key={pengaduan.uuid}>
                  <td>{index + 1}</td>
                  <td>{pengaduan.isi_laporan}</td>
                  <td>
                    {" "}
                    <img src={pengaduan?.url} alt="Image" width={30} />
                  </td>
                  <td>{pengaduan.tanggapan}</td>
                  <td>{pengaduan.status}</td>
                  <td>{pengaduan.user.name}</td>
                  <td>
                    <Link
                      to={`/pengaduans/edit/${pengaduan.uuid}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePengaduan(pengaduan.uuid)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PengaduanList;
