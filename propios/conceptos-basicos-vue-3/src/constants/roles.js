export const ROLES = {
  ADMIN: 0,
  EDITOR: 1,
  // Valor por defecto -> Usuario invitado
  USUARIO_INVITADO: 2,
  AHORRADOR: 3,
  INVERSIONISTA: 4,
  COMPRADOR: 5,
};

export const rolesByValue = Object.entries(ROLES).reduce(
  (rolesObj, [name, roleNumber]) => {
    rolesObj[roleNumber] = name;
    return rolesObj;
  },
  {}
);
