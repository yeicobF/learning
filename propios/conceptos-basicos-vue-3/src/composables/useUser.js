import { API_URLS } from "@/constants/api";
import { rolesByValue } from "@/constants/roles";
import { authService } from "@/services/auth";
import { capitalizeSentence } from "@/utils/capitalize";
import { computed } from "vue";
import useSWRV from "swrv";
import { getOnlyDate } from "@/utils/date";
import { statusByValue } from "@/constants/dashboard";

const { currentUser } = API_URLS;
const { authenticateUserSession } = authService;

export const useUser = () => {
  const {
    data: user,
    error,
    mutate,
    isValidating,
  } = useSWRV(currentUser, authenticateUserSession);

  const isLoading = computed(() => !user.value && !error.value);

  const name = computed(() => {
    return user.value?.name ?? user.value?.userInfo?.name;
  });

  const lastName = computed(() => {
    return user.value?.lastname ?? user.value?.userInfo?.lastname;
  });

  const fullName = computed(() => {
    if (!name.value && !lastName.value) return null;

    return [name.value, lastName.value].join(" ");
  });

  const roles = computed(() => {
    const roleNumbers = user.value?.rol ?? [user.value?.userInfo?.rol];

    if (!roleNumbers || roleNumbers.every((role) => !role)) return null;

    return roleNumbers?.map((userRole) => {
      const role = rolesByValue[userRole];

      return capitalizeSentence(role, false, {
        splitSeparator: "_",
      });
    });
  });

  const dashboardStatus = computed(() => {
    const status =
      user.value?.dashboardStatus ?? user.value?.userInfo?.dashboardStatus;

    const statusString = capitalizeSentence(statusByValue[status], false, {
      splitSeparator: "_",
    });

    return statusString;
  });

  const registerDate = computed(() => {
    const date = user.value?.dateRegister ?? user.value?.userInfo?.dateRegister;

    if (!date) return null;

    return getOnlyDate(new Date(date));
  });

  const computedUser = computed(() => {
    if (error.value) return null;

    return user.value?.err ? null : user.value;
  });

  // const mutateUser = async (newUser) => {
  //   await mutate(authenticateUserSession, {
  //     forceRevalidate: true,
  //   });
  // };

  return {
    originalUser: user,
    user: computedUser,
    name,
    fullName,
    roles,
    registerDate,
    dashboardStatus,
    isLoading,
    isValidating,
    error,
    mutateUser: mutate,
  };
};
