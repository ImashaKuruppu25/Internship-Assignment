import React, { useState, useEffect } from "react";
import { popAlert } from "../../utils/alert";
import { getApi } from "../../utils/axios";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [key, setKey] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "white",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
      <button onClick={() => navigate("/addUser")}>Add User</button>
      {loader ? (
        <div className="loader">
          <SyncLoader color="green" size={60} />
        </div>
      ) : (
        users.map((user) => {
          return (
            <Box sx={{ width: "100%" }} key={user.sid}>
              <Stack spacing={2}>
                <Item>
                  <div style={{ display: "flex", gap: "5rem" }}>
                    <p>id={user.sid}</p>
                    <p>first name={user.firstName}</p>
                    <p>last name={user.lastName}</p>
                    <p>email={user.email}</p>
                    <p>mobile={user.mobile}</p>
                    {user.status === true ? (
                      <p>status = first time</p>
                    ) : (
                      <p>status = not</p>
                    )}
                  </div>
                </Item>
              </Stack>
            </Box>
          );
        })
      )}
    </div>
  );
};

export default Users;
