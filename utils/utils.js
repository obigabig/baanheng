//asc,desc
exports.sortByKeyValue = (arr, key, type = 'asc') => {
    var to_s = Object.prototype.toString;
    var valid_arr = to_s.call(arr) === '[object Array]';
    var valid_key = typeof key === 'string';
  
    if (!valid_arr || !valid_key) {
      return;
    }
  
    arr = arr.slice();
  
    return arr.sort(function(a, b) {
      var a_key = String(a[key]);
      var b_key = String(b[key]);
      var n = a_key - b_key; 
      if(type === 'desc')
       n = b_key - a_key;
      return !isNaN(n) ? n : a_key.localeCompare(b_key);
    });
  }