import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const FormEditPengaduan = () => {
  const [isi_laporan, setIsi_laporan] = useState("");
  const [tanggapan, setTanggapan] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const getPengaduanById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/pengaduans/${id}`
        );
        setTanggapan(response.data.tanggapan);
        setStatus(response.data.status);
        setIsi_laporan(response.data.isi_laporan);
        // setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPengaduanById();
  }, [id]);

  const updatePengaduan = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/pengaduans/${id}`, {
        isi_laporan: isi_laporan,
        tanggapan: tanggapan,
        status: "selesai",
      });
      navigate("/pengaduans");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      {user && user.role === "user" && (
        <div>
          {" "}
          <h1 className="title">Pengaduan</h1>
          <h2 className="subtitle">Edit Laporan Anda</h2>
          <div className="card is-shadowless">
            <div className="card-content">
              <div className="content">
                <form onSubmit={updatePengaduan}>
                  <p className="has-text-centered">{msg}</p>
                  <div className="field">
                    <label className="label">Isi Laporan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={isi_laporan}
                        onChange={(e) => setIsi_laporan(e.target.value)}
                        placeholder="laporan anda"
                      />
                    </div>
                    <div className="field">
                      <label className="label">Foto</label>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button type="submit" className="button is-success">
                        Edit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && user.role === "admin" && (
        <div>
          <h1 className="title">Pengaduan</h1>
          <h2 className="subtitle">Tanggapi</h2>
          <div className="card is-shadowless">
            <div className="card-content">
              <div className="content">
                <form onSubmit={updatePengaduan}>
                  <p className="has-text-centered">{msg}</p>
                  <div className="field">
                    <label className="label">Tanggapan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={tanggapan}
                        onChange={(e) => setTanggapan(e.target.value)}
                        placeholder="Tanggapan anda"
                      />
                    </div>
                    <div className="field">
                      <label className="label">Validasi</label>
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="0">0</option>
                            <option value="proses">Proses</option>
                            <option value="selesai">Selesai</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button type="submit" className="button is-success">
                        Tanggapi
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && user.role === "officer" && (
        <div>
          <h1 className="title">Pengaduan</h1>
          <h2 className="subtitle">Tanggapi</h2>
          <div className="card is-shadowless">
            <div className="card-content">
              <div className="content">
                <form onSubmit={updatePengaduan}>
                  <p className="has-text-centered">{msg}</p>
                  <div className="field">
                    <label className="label">Tanggapan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={tanggapan}
                        onChange={(e) => setTanggapan(e.target.value)}
                        placeholder="Tanggapan anda"
                      />
                    </div>
                    <div className="field">
                      <label className="label">Validasi</label>
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="proses">Proses</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button type="submit" className="button is-success">
                        Tanggapi
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormEditPengaduan;
