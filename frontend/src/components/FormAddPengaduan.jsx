import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FormAddPengaduan = () => {
  const [isi_laporan, setIsi_laporan] = useState("");
  const [tanggapan, setTanggapan] = useState("");
  const [picture, setPicture] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };
  const savePengaduan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isi_laporan",isi_laporan);
    try {
      await axios.post("http://localhost:5000/pengaduans",formData, {
        isi_laporan: isi_laporan,
        tanggapan: tanggapan,
        picture: picture,
        headers:{ "Content-type": "multipart/form-data",}
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
      <h1 className="title">Pengaduan</h1>
      <h2 className="subtitle">Add New Pengaduan</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={savePengaduan}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Isi Laporan</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={isi_laporan}
                    onChange={(e) => setIsi_laporan(e.target.value)}
                    placeholder="apa yang akan anda laporkan"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Image</label>
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input
                        type="file"
                        className="file-input"
                        onChange={loadImage}
                      />
                      <span className="file-cta">
                        <span className="file-label">Choose a file...</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {preview ? (
                <figure className="image is-128x128">
                  <img src={preview} alt="Preview Image" />
                </figure>
              ) : (
                ""
              )}
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>)}
    </div>
  );
};

export default FormAddPengaduan;
