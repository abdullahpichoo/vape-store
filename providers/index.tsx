"use client";

import { SessionProvider } from "next-auth/react";

import { QueryClientProvider, queryClient } from "@/lib/react-query";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = (props: ProvidersProps) => {
  const { children } = props;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
