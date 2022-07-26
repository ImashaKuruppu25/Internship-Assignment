import React, { useState } from "react";
import { getApi } from "../../utils/axios";
import { popAlert } from "../../utils/alert";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

const Adduser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sid, setsid] = useState("");
  const [loader, setLoader] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoader(true);
    getApi()
      .post("/user", {
        sid,
        email,
        password,
      })
      .then((res) => {
        popAlert("Success!", "User Added Successfuly", "success", "Ok").then(
          (res) => {
            navigate("/users");
            setLoader(false);
          }
        );
      })
      .catch((err) => {
        popAlert("Error!", err.response.data.message, "error", "ok");
        setLoader(false);
      });
  };
  return (
    <div>
      {loader ? (
        <div>
          <SyncLoader color="green" size={60} />
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <label>Student ID</label>
          <input
            type="text"
            placeholder="Enter a ID"
            value={sid}
            onChange={(e) => setsid(e.target.value)}
          />

          <br />
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter a valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <input type="submit" />
        </form>
      )}
    </div>
  );
};

export default Adduser;
