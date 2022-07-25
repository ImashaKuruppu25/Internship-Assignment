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
          </Routes>
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
