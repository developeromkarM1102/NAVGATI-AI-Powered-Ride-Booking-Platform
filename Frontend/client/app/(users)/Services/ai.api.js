import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

export async function AnalyzeRide({ text }) {

  try {

    const response = await api.post("api/ride-requests/analyze", {
      text,
    });

    return response.data;

  } catch (err) {
    // console.error("Ride Analyze Error:", err);

    return {
      error:
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong",
    };
  }
}

export async function BookRide({
  driverId,
  pickup,
  destination,
  rideType,
  passengers,
  luggage,
  distance,
  estimatedDuration,
  fare,
  status,
  pickupCoordinates,
  destinationCoordinates,
}) {
  try {
    const response = await api.post("/api/bookings/rideBooking", {
      driverId,

      pickup: {
        address: pickup,
        latitude: pickupCoordinates?.latitude,
        longitude: pickupCoordinates?.longitude,
      },

      destination: {
        address: destination,
        latitude: destinationCoordinates?.latitude,
        longitude: destinationCoordinates?.longitude,
      },

      rideType,
      passengers,
      luggage,
      distance,
      estimatedDuration,
      fare,
      status,
    });

    return response.data;

  } catch (err) {
    // console.error("Ride Booking Error:", err);

    // console.error(
    //   "Backend error:",
    //   err.response?.data
    // );

    return {
      error:
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong",
    };
  }
}

export async function GetBookingStatus({ bookingID }) {
  try {
    const response = await api.get(
      `/api/bookings/${bookingID}`
    );

    return response.data;
  } catch (err) {
    // console.error("Get Booking Status Error:", err);

    return {
      error:
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong",
    };
  }
}

export async function cancelBooking({ bookingId }) {
  try {
    const response = await api.post(
      `/api/bookings/cancel/${bookingId}`
    );
    return response.data;

  } catch (err) {
    // console.error("Booking cancel Error:", err);

    return {
      error:
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong",
    };
  }
}

export async function getMyBookings() { 
  
    try { 
        const response = await api.get( 
            "/api/bookings/myBookings" 
        ); 
 
        return response.data; 
 
    } catch (err) { 
        // console.error(
        //     "Get bookings Error:",
        //     err
        // );
 
        return { 
            error: 
                err.response?.data?.message || 
                err.response?.data?.error || 
                err.message || 
                "Failed to fetch bookings" 
        }; 
    } 
}



