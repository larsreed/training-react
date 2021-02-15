import { toast } from 'react-toastify';

export default function ShowError(what, errorObj) {
  // console.log(errorObj)
  if (errorObj.response) toast.error(what + ' failed: ' + errorObj);
  else if (errorObj.message) toast.error(what + ' failed: ' + errorObj.message);
  else toast.error(what + ' failed');
}

export function ShowInfo(msg) {
  toast.info(msg);
}
export function ShowWarning(msg) {
  toast.warning(msg);
}