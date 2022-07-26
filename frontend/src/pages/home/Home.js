import React from "react";
import { useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userType = useSelector((state) => state.auth.userType);
  const userStatus = useSelector((state) => state.auth.userStatus);

  return (
    <div>
      {isLoggedIn ? (
        <button
          onClick={() => {
            dispatch(authActions.logout());
            navigate("/");
          }}
        >
          Logout
        </button>
      ) : (
        ""
      )}

      {isLoggedIn && userType === "Admin" ? (
        <button onClick={() => navigate("/users")}>Users</button>
      ) : isLoggedIn && userType === "Student" && userStatus === true ? (
        <button onClick={() => navigate("/updateUser")}>Update Profile</button>
      ) : isLoggedIn && userType === "Student" && userStatus === false ? (
        <button onClick={() => navigate("/notes")}>Notes</button>
      ) : (
        ""
      )}
      {!isLoggedIn ? (
        <button onClick={() => navigate("/login")}>Login</button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
