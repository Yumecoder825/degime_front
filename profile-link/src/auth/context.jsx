import {createContext, useContext, useEffect, useState,} from "react";
import {getAccessToken, removeAccessTokenFromStorage, setAccessTokenToStorage,} from "./index";
import {Apis} from "../api";

const defaultContext = {
  loading: true,
  user: null,
  isAdmin: false,
  setUserInfo: () => null,
  resetUserInfo: () => null,
  reAuth: () => null,
};

const AuthContext = createContext(defaultContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reload, setReload] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  function reAuth() {
    setReload(!reload);
  }

  function setUserInfo(user) {
    // set axios header
    if (user.token) {
      Apis.setAuthToken(user.token);
      setAccessTokenToStorage(user.token);
    }

    // set user on context
    setUser(user);
    setIsAdmin(!!user.is_superuser);
  }

  function resetUserInfo() {
    removeAccessTokenFromStorage();
    Apis.setAuthToken("");

    setUser(null);
    setIsAdmin(false);
  }

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      // fetch me
      Apis.me()
        .then((res) => {
          console.log(res);
          if (res.success) {
            // Success
            setUserInfo(res.data);
            setLoading(false);
          } else {
            // Failed
            setUser(null);
            setLoading(false);
            removeAccessTokenFromStorage();
          }
        })
        .catch(() => {
          // Call failed
          setUser(null);
          setLoading(false);
          removeAccessTokenFromStorage();
        });
    } else {
      setLoading(false);
    }
  }, [reload]);

  const values = {
    loading,
    user,
    isAdmin,
    setUserInfo,
    resetUserInfo,
    reAuth,
    showLoginModal,
    setShowLoginModal,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export const useAuthContext = () => useContext(AuthContext);
