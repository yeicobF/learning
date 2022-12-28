const baseUrl = "/api/users";

const getUserRole = async (userId) => {
  const res = await fetch(`${baseUrl}/role/${userId}`);

  // { roles }
  return await res.json();
};

export { getUserRole };
