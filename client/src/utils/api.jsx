export const userData = JSON.parse(localStorage.getItem("user"));

const request = async (
  route,
  method,
  body = null,
  isPrivate = false,
  headers = {}
) => {
  const options = {
    method,
    cache: "default",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  // Add Authorization header for private requests
  if (isPrivate) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authorization token found!");
    options.headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`/api/${route}`, options);
  return await response.json();
};

// Generic HTTP methods that can handle both public and private requests
export const getRequest = (route, isPrivate = false, headers = {}) =>
  request(route, "GET", null, isPrivate, headers);

export const postRequest = (route, body, isPrivate = false, headers = {}) =>
  request(route, "POST", body, isPrivate, headers);

export const putRequest = (route, body, isPrivate = false, headers = {}) =>
  request(route, "PUT", body, isPrivate, headers);

export const patchRequest = (route, body, isPrivate = false, headers = {}) =>
  request(route, "PATCH", body, isPrivate, headers);

export const deleteRequest = (route, isPrivate = false, headers = {}) =>
  request(route, "DELETE", null, isPrivate, headers);
