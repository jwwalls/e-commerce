import React from "react";
import { Route, Routes } from "react-router-dom";
import Activities from "../Pages/Activities";
import Home from "../Pages/Home";
import LogInRegister from "./LogInRegister";
import MyRoutines from "../Pages/MyRoutines";
import PostActivity from "./PostActivity";
import Routines from "../Pages/Routines";
import "../App.css";


const RRoutes = ({ token, setToken, user, setUser }) => {
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Home token={token} />}></Route>
        <Route
          path="/activities"
          element={<Activities token={token} />}
        ></Route>
        <Route
          path="/postActivity"
          element={<PostActivity token={token} />}
        ></Route>

        <Route
          path="/login"
          element={
            <LogInRegister
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
            />
          }
        ></Route>
        <Route
          path="/myRoutines"
          element={
            <MyRoutines
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
            />
          }
        ></Route>
        <Route
          path="/routines"
          element={<Routines token={token} />}
          state={{}}
        />
      </Routes>
    </div>
  );
};

export default RRoutes;