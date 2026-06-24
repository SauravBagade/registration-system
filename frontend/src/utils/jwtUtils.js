export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRole = () => {

  const token = getToken();

  if (!token) return null;

  try {

    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    return payload.role;

  } catch (error) {

    console.error(error);

    return null;
  }
};

export const getEmail = () => {

  const token = getToken();

  if (!token) return null;

  try {

    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    return payload.sub;

  } catch (error) {

    console.error(error);

    return null;
  }
};

export const isTokenExpired = () => {

  const token = getToken();

  if (!token) return true;

  try {

    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    return payload.exp * 1000 < Date.now();

  } catch (error) {

    console.error(error);

    return true;
  }
};

export const logoutUser = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("role");
};