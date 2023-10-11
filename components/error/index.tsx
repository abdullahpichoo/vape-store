import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ErrorProps {
  message: string;
}

const ErrorPage = (props: ErrorProps) => {
  const { message } = props;

  return (
    <div className="flex flex-col items-center justify-center gap-5 my-16">
      <FontAwesomeIcon
        icon={faExclamationCircle}
        className="text-red-500 text-[8rem]"
      />
      <h1 className=" text-red-500">Server Error</h1>
      <p className="text-gray-400 font-semibold">{message}</p>
    </div>
  );
};

export default ErrorPage;
