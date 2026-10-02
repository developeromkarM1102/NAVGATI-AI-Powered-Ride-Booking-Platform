import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

export const getDriverEarnings = async () => {
    try {
        const response = await api.get(
            "/api/driver/bookings/driver-earnings"
        );

        return response.data;
    } catch (error) {
        return {
            success: false,
            error:
                error?.response?.data?.message ||
                "Failed to fetch driver earnings",
        };
    }
};

export const updateDriverAvailability = async (isAvailable) => {
    try {
        const response = await api.patch(
            "/api/driver/bookings/availability",
            {
                isAvailable,
            }
        );

        return response.data;
    } catch (error) {
        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "Failed to update driver availability",
        };
    }
};

export const PendingBooking = async () => {
    try {
        const response = await api.get(
            "/api/driver/bookings/pending"
        );

        return response.data;
    } catch (error) {
        return {
            success: false,
            error:
                error?.response?.data?.message ||
                "Failed to fetch pending bookings",
        };
    }
};

export const CurrentBooking = async () => {
    try {
        const response = await api.get(
            "/api/driver/bookings/current"
        );

        return response.data;
    } catch (error) {
        return {
            success: false,
            error:
                error?.response?.data?.message ||
                "Failed to fetch current booking",
        };
    }
};

export const StartBooking = async ({ bookingID }) => {
  try {
    const response = await api.patch(`/api/driver/bookings/${bookingID}/start`);

    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to start booking",
    };
  }
};

export const AcceptBooking = async ({ bookingID }) => {
    try {
        const response = await api.patch(
            `/api/driver/bookings/${bookingID}/accept`
        );

        return response.data;
    } catch (error) {
        return {
            success: false,
            error:
                error?.response?.data?.message ||
                "Failed to accept booking",
        };
    }
};

export const RejectBooking = async ({ bookingID }) => {
    try {
        const response = await api.patch(
            `/api/driver/bookings/${bookingID}/reject`
        );

        return response.data;
    } catch (error) {
        return {
            success: false,
            error:
                error?.response?.data?.message ||
                "Failed to reject booking",
        };
    }
};

export const CancelBooking = async ({ bookingID }) => {
    try {
        const response = await api.patch(
            `/api/driver/bookings/${bookingID}/cancel`
        );

        return response.data;
    } catch (error) {
        return {
            success: false,
            error:
                error?.response?.data?.message ||
                "Failed to cancel booking",
        };
    }
};

export const CompleteBooking = async ({ bookingID }) => {
    try {
        const response = await api.patch(
            `/api/driver/bookings/${bookingID}/complete`
        );

        return response.data;
    } catch (error) {
        return {
            success: false,
            error:
                error?.response?.data?.message ||
                "Failed to complete booking",
        };
    }
};