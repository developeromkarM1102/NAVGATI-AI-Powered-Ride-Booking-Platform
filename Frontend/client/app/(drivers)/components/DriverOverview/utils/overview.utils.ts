// FORMAT CURRENCY
export const formatCurrency = (value: number = 0) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};