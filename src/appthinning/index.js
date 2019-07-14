import path from 'path'
import child_process from 'child_process';

const isDevelopment = process.env.NODE_ENV !== 'production'

function appthinning(projectPath, types, miniSize, maxSize) {
    const cmdPath = srcPath("appthinning/index.js")
    var cmd = "node "+cmdPath+" -d " + projectPath + " -t "+ "\"" + types +"\""
    if (miniSize != null) {
        cmd += " -s " + miniSize
    }
    if (maxSize != null) {
      cmd += " -m " + maxSize
    }

    child_process.exec(cmd, function(error, stdout, stderr) {
        if(error){
            console.log(error);
        }else{
            console.log("成功 :" + stdout);
        }
        if(stderr) {
          console.log(stderr);
        }
    })
}

function srcPath(subPath) {
  if (isDevelopment) {
    return path.join(__dirname,'../../node_modules/',subPath)
  }
  return path.join(__dirname,'/node_modules/', subPath)
}

export default appthinning