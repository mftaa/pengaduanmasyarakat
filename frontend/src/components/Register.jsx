import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Register = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: "user",
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <section className="hero is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form onSubmit={saveUser} className="box">
                  {isError && <p className="has-text-centered">{message}</p>}
                  <h1 className="title is-2">Sign In</h1>
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="your name"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="******"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">confirm Password</label>
                    <div className="control">
                      <input
                        type="password"
                        className="input"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        placeholder="******"
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button
                      type="submit"
                      className="button is-success is-fullwidth"
                    >
                      {isLoading ? "Loading..." : "Register"}
                    </button>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
