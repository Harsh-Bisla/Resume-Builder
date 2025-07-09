import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import UserProvider from "./context/userContext";
import "./App.css";
import ResumeProvider from "./context/resumeContext";
import Footer from "./components/Footer";

const App = () => {
  const [authModel, setAuthModel] = useState(false);
  const [authState, setAuthState] = useState("login");
  return (
    <UserProvider>
      <ResumeProvider>
        <Navbar setAuthModel={setAuthModel} />
        <Outlet context={{ setAuthModel }} />
        {authModel && (
          <>
            {authState === "login" && (
              <Login setAuthModel={setAuthModel} setAuthState={setAuthState} />
            )}
            {authState === "signup" && (
              <SignUp setAuthModel={setAuthModel} setAuthState={setAuthState} />
            )}
          </>
        )}
        <Toaster />
        <Footer/>
      </ResumeProvider>
    </UserProvider>
  );
};

export default App;
