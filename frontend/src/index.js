import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store";
import Navbar from "./common/Navbar";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import Home from "./pages/home/Home";
import MyNotes from "./pages/MyNotes";
import AddUser from "./pages/users/AddUser";
import UpdateUser from "./pages/users/UpdateUser";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/notes" element={<MyNotes />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/updateUser" element={<UpdateUser />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
