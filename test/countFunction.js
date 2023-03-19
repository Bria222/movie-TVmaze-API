const countObj = (_dataArray) => {
  const count = [];
  for (let i = 0; i < _dataArray.length; i += 1) {
    count.push(_dataArray[i]);
  }
  return count.length;
};

export default countObj;