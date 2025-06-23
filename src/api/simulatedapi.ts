const simulatedApi = (
  data: any
): Promise<{ success: boolean; data?: FormData; message?: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject({ message: "Server error occurred. Please try again." });
      } else {
        resolve({ success: true, data });
      }
    }, 1000);
  });
};

export default simulatedApi;
