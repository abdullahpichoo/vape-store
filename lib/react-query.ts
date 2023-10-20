import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
