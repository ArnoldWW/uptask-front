import toast from "react-hot-toast";

const defaultOptions = {
  duration: 2000,
  position: "top-center7"
};

const toastBlank = (msg = "Message", options = defaultOptions) => {
  return toast(msg, options);
};

const toastSuccess = (msg = "Correct!", options = defaultOptions) => {
  return toast.success(msg, options);
};

const toastError = (msg = "Error!", options = defaultOptions) => {
  return toast.error(msg, options);
};

export default toastBlank;
export { toastBlank, toastError, toastSuccess };
