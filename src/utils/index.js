import os from 'os'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function isMac() {
    const platform = os.platform()
    return platform === 'darwin'
}

const ToastType = {
   Success : 0 ,
   Failed : 1 
}

function showToast(type, msg, duration) {
  duration = duration|| 1000; 
  var bgColor = "linear-gradient(to right, #00b09b, #96c93d)"
  if (type != ToastType.Success) {
    bgColor = "linear-gradient(to right, #DC143C, #FF1493)"
  }

  Toastify({
    text: msg,
    position: 'center',
    backgroundColor: bgColor,
    className: "info",
    duration: duration
  }).showToast();
}

export {
    isMac,
    showToast,
    ToastType,
}