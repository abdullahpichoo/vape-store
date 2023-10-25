import { userTag, usersTag } from "@/contants/tags";
import { paginatedUserApiRoute, usersApiRoute } from "@/routes/api";
import { SearchParams } from "@/types";
import { UserFormValues } from "@/types/api/user";
import { convertSearchParamsToURL } from "@/utils/client";

export const getUsers = async () => {
  try {
    const response = await fetch(usersApiRoute, {
      credentials: "include",
      next: { revalidate: 3600, tags: [usersTag, userTag] },
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};

export const getPaginatedUsers = async (params: string) => {
  try {
    const response = await fetch(paginatedUserApiRoute(params), {
      credentials: "include",
    });

    const data = await response.json();
    return {
      users: data.body.payLoad,
      pagination: data.body.pagination,
    };
  } catch {
    throw new Error();
  }
};

export const addNewUser = async (user: UserFormValues) => {
  try {
    const response = await fetch(usersApiRoute, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(user),
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};
