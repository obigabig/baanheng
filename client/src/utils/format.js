exports.phone = (number) => {
    if (!number) return '';
    // NNN-NNN-NNNN
    const splitter = /.{1,3}/g;
    number = number.substring(0, 10);
    return number.substring(0, 7).match(splitter).join('-') + number.substring(7);
};

exports.numberWithCommas = (x) => {
  if(x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return 0;
}