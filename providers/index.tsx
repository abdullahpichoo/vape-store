"use client";

import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = (props: ProvidersProps) => {
  const { children } = props;

  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
