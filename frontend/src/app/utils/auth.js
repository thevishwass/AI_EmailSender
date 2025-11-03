export const isLoggedIn = () => {
  return !!localStorage.getItem('access_token');
};

export const logout = () => {
  localStorage.removeItem('access_token');
  window.location.href = '/login'; // redirect to login after logout
};
