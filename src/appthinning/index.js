import path from 'path'
import child_process from 'child_process';

const isDevelopment = process.env.NODE_ENV !== 'production'

function appthinning(projectPath, types, miniSize, maxSize, compression, key) {
    const cmdPath = srcPath("appthinning/index.js")
    var cmd = nodePath()+" "+cmdPath
    if (projectPath) {
      cmd += " -d " + projectPath
    }
    if (types) {
      cmd += " -t "+ "\"" + types +"\""
    }
    if (miniSize) {
      cmd += " -s " + miniSize
    }
    if (maxSize) {
      cmd += " -m " + maxSize
    }
    cmd +=" -c " + compression
    if (key) {
      cmd +=" -k " + key
    }

    console.log(cmd);

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

function nodePath() {
  if (isDevelopment) {
    return "node"
  }
  return path.join(__dirname,'/node/node')
}

export default appthinning