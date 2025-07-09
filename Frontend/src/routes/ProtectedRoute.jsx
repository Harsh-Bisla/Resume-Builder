import { useContext } from "react";
import { Navigate, replace } from "react-router-dom";
import { resumeStore } from "../context/resumeContext";

export const IsAuthenticated = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export const IsResume = ({ children }) => {
  const { resumes } = useContext(resumeStore);
  const token = localStorage.getItem("token");
  if (token) {
    return children;
  }
  return <Navigate to="/dashboard" replace />;
};
