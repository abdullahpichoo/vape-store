import ErrorPage from "@/components/error";

const AccessDenied = () => {
  return <ErrorPage message="You are not authorized to access this page." />;
};

export default AccessDenied;
