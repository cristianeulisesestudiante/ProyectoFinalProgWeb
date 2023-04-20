exports.DateTime = (value) => {
    let date = new Date(value);
   return date.toDateString() + " at " + date.toLocaleTimeString();
};
