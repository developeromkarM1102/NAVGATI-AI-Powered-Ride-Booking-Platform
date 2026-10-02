// FORMAT CURRENCY
export const formatCurrency = (value: number = 0) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

// FORMAT DISTANCE
export const formatDistance = (value: number = 0) => {
    return `${Number(value || 0).toFixed(1)} km`;
};

// FORMAT TIME
export const formatTime = (value: string) => {
    if (!value) {
        return "--";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "--";
    }

    return date.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
    });
};