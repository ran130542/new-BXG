function getpath(paths) {
  var pathstr = location.search.slice(1);
  var patharr = pathstr.split('&');
  var obj = {};
  for(var i=0;i<patharr.length;i++){
    var arr = patharr[i].split('=');
    
    obj[arr[0]] = arr[1];
    console.log(obj);
  }
  return paths?obj[paths]:obj;
}
module.exports.getpath = getpath;