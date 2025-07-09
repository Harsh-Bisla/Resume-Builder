import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const userStore = createContext();

function UserProvider({ children }) {
  const [user, setuser] = useState({});
  const succMsg = (msg) => toast.success(msg);
  const errMsg = (msg) => toast.error(msg);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Register the user
  const userSignup = async (signUpInfo, avatar, setAuthModel) => {
    try {
      if (!signUpInfo.fullName) {
        errMsg("fullName is required");
        return;
      }
      if (!signUpInfo.email) {
        errMsg("email is required");
        return;
      }
      if (!signUpInfo.password) {
        errMsg("password is required");
        return;
      }

      const formData = new FormData();
      formData.append("fullName", signUpInfo.fullName);
      formData.append("email", signUpInfo.email);
      formData.append("password", signUpInfo.password);
      formData.append("avatar", avatar);
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/signup`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        succMsg(data.message);
        localStorage.setItem("token", data.token);
        setAuthModel(false);
        navigate("/dashboard");
      } else {
        errMsg(data.message);
      }
    } catch (error) {
      errMsg(error.message);
    }
  };

  // Login the user
  const userLogin = async (email, password, setAuthModel) => {
    try {
      if (!email) {
        errMsg("email is required");
        return;
      }

      if (!password) {
        errMsg("password is required");
        return;
      }
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        succMsg(data.message);
        localStorage.setItem("token", data.token);
        setAuthModel(false);
        navigate("/dashboard");
      } else {
        errMsg(data.message);
      }
    } catch (error) {
      errMsg(error.message);
    }
  };

  // user logout
  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // get user profile
  const getUserProfile = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/get-profile`,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      const data = await res.json();
      if (data.success) setuser(data.user);
    } catch (error) {
      errMsg(error.message);
    }
  };

  useEffect(() => {
    localStorage.getItem("token") && getUserProfile();
  }, [localStorage.getItem("token")]);

  return (
    <userStore.Provider value={{ userSignup, userLogin, user, logoutUser, loading }}>
      {children}
    </userStore.Provider>
  );
}

export default UserProvider;
