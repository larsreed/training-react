import { toast } from 'react-toastify';

export default function ShowError(what: string, errorObj: any) {
  // console.log(errorObj)
  if (errorObj.response) toast.error(what + ' failed: ' + errorObj);
  else if (errorObj.message) toast.error(what + ' failed: ' + errorObj.message);
  else toast.error(what + ' failed');
}

export function ShowInfo(msg: string) {
  toast.info(msg);
}

export function ShowWarning(msg: string) {
  toast.warning(msg);
}

export function ShowToaster(content: any, options: any) {
  // See https://fkhadra.github.io/react-toastify/introduction/
  toast(content, options);
}
