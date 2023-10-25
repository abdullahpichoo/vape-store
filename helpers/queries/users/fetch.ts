import { useQuery } from "@tanstack/react-query";

import { usersTag } from "@/contants/tags";
import { getPaginatedUsers } from "@/helpers/network/users";
import { Pagination } from "@/types";
import { UserType } from "@/types/api/user";

type AdminUsers = {
  users: UserType[];
  pagination: Pagination;
};

export const useFetchUsers = (
  params: string,
  onSuccess?: (data: AdminUsers) => void,
  onError?: (error: unknown) => void
) =>
  useQuery<AdminUsers>(
    [usersTag, params],
    async () => {
      const { users, pagination } = await getPaginatedUsers(params);
      return {
        users: users,
        pagination: pagination,
      };
    },
    {
      onSuccess,
      onError,
    }
  );
