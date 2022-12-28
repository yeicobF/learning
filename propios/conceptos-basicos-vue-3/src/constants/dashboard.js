const DASHBOARD_STATUS = {
  // No ha sido autorizado para acceder ni registrarse al dashboard.
  NO_AUTORIZADO: -1,
  // Ha sido autorizado para acceder al dashboard pero no ha sido registrado.
  NO_REGISTRADO: 0,
  // Ha sido autorizado para acceder al dashboard y ha sido registrado pero no
  // ha sido verificado. Su documentación se encuentra en revisión y está
  // pendiente su primer depósito.
  REGISTRADO_SIN_VERIFICAR: 1,
  // No está en la documentación, pero creo que sería conveniente tener este estado.
  VERIFICANDO_DOCUMENTACION: 3,
  // Ha sido autorizado para acceder al dashboard, ha sido registrado y ha sido
  // verificado. Ahora puede ver toda la información del dashboard.
  APROBADO: 2,
};

const statusByValue = Object.entries(DASHBOARD_STATUS).reduce(
  (rolesObj, [name, roleNumber]) => {
    rolesObj[roleNumber] = name;
    return rolesObj;
  },
  {}
);

export { DASHBOARD_STATUS, statusByValue };
