import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  function decodeToken(token) {
    try {
      const payload = token.split(".")[1];
      // decode base64 string to normal string
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error("failed to decode token", error);
      return null;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser(decodedUser);
      }
    }
  }, []);

  const login = (token) => {
    // store token in localStorage
    localStorage.setItem("token", token);
    // store current user instance into context
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser(decodedUser);
        console.log("successfully login in authContext");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
