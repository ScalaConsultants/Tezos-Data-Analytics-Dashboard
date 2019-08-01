export const stableSort = (array: any, cmp: any): any => {
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any) => el[0]);
};



export const getSorting = (order: any, orderBy: any) => {
  return order === 'desc' ? (a: any, b: any) => desc(a, b, orderBy) : (a: any, b: any) => -desc(a, b, orderBy);
};

export const desc = (a: any, b: any, orderBy: any) => {
  if(!b[orderBy] || !a[orderBy]) return 0;

  // console.log(typeof a[orderBy]);

  let aVal = typeof(a[orderBy]) === "string" ? a[orderBy].toLowerCase() : a[orderBy];
  let bVal = typeof(b[orderBy]) === "string" ? b[orderBy].toLowerCase() : b[orderBy];

  if ( bVal < aVal) {
    return -1;
  }
  else if (bVal > aVal) {
    return 1;
  }
  else return 0;
};
