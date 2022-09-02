import React from "react";
import { Player } from "./pages/player";
import { Videos } from "./pages/videos";
import { Account } from "./pages/account";
import { Navbar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import logo from "./assets/logo.svg";

const navElements = [
  { label: "Player", path: "/" },
  { label: "Videos", path: "/videos" },
  { label: "Account", path: "/account" }
];

const routesPages = [
  { label: "Error", path: "*", page: <p> not found... </p> },
  { label: "Player", path: "/", page: <Player /> },
  { label: "Videos", path: "/videos", page: <Videos /> },
  { label: "User", path: "/account", page: <Account /> }
];

const App = () => {
  return (
    <div className="App">
      <Navbar logo={logo} navElements={navElements} />
      <Routes>
        {routesPages.map((e, i) => (
          <Route key={i} path={e.path} element={e.page} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
