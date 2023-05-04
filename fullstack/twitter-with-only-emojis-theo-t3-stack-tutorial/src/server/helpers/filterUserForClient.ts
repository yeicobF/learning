import type { User } from "@clerk/nextjs/dist/api";

// Al filtar los datos de un usuario respecto a lo que se recibe del servidor,
// mandamos menos carga al cliente, por lo que es más eficiente.
export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};
