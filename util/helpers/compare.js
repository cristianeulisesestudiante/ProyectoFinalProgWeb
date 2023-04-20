exports.EqualValue = (value, equalvalue) => {
   return value === equalvalue;
};

exports.hasFoto = (img) => {
    if (img === "" || img === undefined || img === null) return false;
    return true;
};
