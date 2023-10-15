// import { headers, cookies } from "next/headers";

import { userTag, usersTag } from "@/contants/tags";
import { usersApiRoute } from "@/routes/api";

export const getUsers = async () => {
  try {
    const response = await fetch(usersApiRoute, {
      next: { revalidate: 3600, tags: [usersTag, userTag] },
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};
