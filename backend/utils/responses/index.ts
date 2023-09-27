export const responseGenerator = (message: string) => {
  return {
    body: {
      success: false,
      status: 400,
      message: message,
    },
  };
};
