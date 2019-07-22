import os from 'os'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import * as url from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

// see https://github.com/electron-userland/electron-webpack/issues/99#issuecomment-459251702
function getStatic(val) {
  if (isDevelopment) {
    return url.resolve(window.location.origin, val)
  }
  return path.resolve(__static, val)
}

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
    getStatic
}