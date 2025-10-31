export const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const titleHeight = "50px";
export const rightHeight = `calc(100vh - 120px - ${titleHeight})`;
export const paginationTableHeight = `calc(100vh - 120px - ${titleHeight} - 50px)`;
export const halfRightHeight = `calc((100vh - 120px - ${titleHeight}) / 2 - 8px)`;
