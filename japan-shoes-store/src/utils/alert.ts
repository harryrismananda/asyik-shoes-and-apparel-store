import Swal, { SweetAlertResult } from "sweetalert2";

export const showSuccessLogin = (): Promise<SweetAlertResult> => {
  const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
return Toast.fire({
  icon: "success",
  title: "Signed in successfully"
});
}

export const showError = (message: string): Promise<SweetAlertResult> => {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
}

export const showSuccessRegister = (): Promise<SweetAlertResult> => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: "Register success, please login",
  });
}