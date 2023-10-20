import { headers, cookies } from "next/headers";

import { userTag, usersTag } from "@/contants/tags";
import { usersApiRoute } from "@/routes/api";
import { UserFormValues } from "@/types/api/user";

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
