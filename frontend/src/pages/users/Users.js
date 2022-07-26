import React, { useState, useEffect } from "react";
import { popAlert } from "../../utils/alert";
import { getApi } from "../../utils/axios";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from "react-router-dom";
import Popup from "../../common/Popup";
import { BiSearchAlt } from "react-icons/bi";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [key, setKey] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);
  const [popBtn, setPopBtn] = useState(false);

  useEffect(() => {
    setLoader(true);

    const source = axios.CancelToken.source();
    const getUsers = () => {
      getApi()
        .get(`/user/getAll`, {
          cancelToken: source.token,
        })
        .then((res) => {
          setUsers(res.data);

          setLoader(false);
        })
        .catch((err) => {
          popAlert("Error!", err.response.data.message, "error", "ok");
          setLoader(false);
        });

      return () => {
        source.cancel();
      };
    };

    getUsers();
  }, [key, refresh]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "2rem",
          marginLeft: "1rem",
        }}
      >
        <h1>User Details</h1>
        <div>
          <input
            placeholder="    search user"
            style={{
              width: "300px",
              height: "40px",
              border: "none",
              borderRadius: "5px",
              fontFamily: "poppins",
            }}
          />
          <BiSearchAlt
            fontSize={35}
            style={{
              marginBottom: "-0.9rem",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <button className="adduser-btn" onClick={() => navigate("/addUser")}>
          Add User
        </button>
      </div>

      {loader ? (
        <div className="loader">
          <SyncLoader color="green" size={60} />
        </div>
      ) : (
        <div className="grid-container">
          {users.map((user) => {
            return (
              <div key={user.sid}>
                <div className="grid-item" onClick={() => setPopBtn(true)}>
                  <p>
                    <span style={{ fontWeight: "bold" }}>id </span> - {user.sid}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>email </span> -
                    {user.email}
                  </p>
                  {user.status === true ? (
                    <p>
                      <span style={{ fontWeight: "bold" }}>status </span> -{" "}
                      <span style={{ color: "red" }}>not updated</span>
                    </p>
                  ) : (
                    <p>
                      {" "}
                      <span style={{ fontWeight: "bold" }}>status</span> -{" "}
                      <span style={{ color: "green" }}>updated</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Popup trigger={popBtn} setTrigger={setPopBtn}>
        <h2>User Details</h2>
        <h2>Student ID {users.email}</h2>
        <h2>First Name</h2>
        <h2>Last Name</h2>
        <h2>Email</h2>
        <h2>Mobile</h2>
        <h2>Date of Birth</h2>
        <h2>Status</h2>
      </Popup>
    </div>
  );
};

export default Users;
