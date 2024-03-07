export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("access_token");
  }
};

export const removeAccessTokenFromStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("access_token");
  }
};

export const setAccessTokenToStorage = (accessToken) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("access_token", accessToken);
  }
};
