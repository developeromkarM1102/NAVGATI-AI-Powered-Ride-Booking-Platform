require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./src/app");
const connectToDB = require("./src/Config/db");

connectToDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  // console.log("Socket connected:", socket.id);

  // Driver joins their personal room so pending ride cancellations reach them.
  socket.on("join-driver", ({ driverId }) => {
    if (!driverId) {
      // console.log("❌ Driver ID missing");
      return;
    }

    const room = `driver_${driverId}`;

    socket.join(room);

    // console.log(`🚗 ${socket.id} joined ${room}`);
  });

  // Join booking room.
  socket.on("join-booking", ({ bookingId }) => {
    if (!bookingId) {
      // console.log("❌ Booking ID missing");
      return;
    }

    const room = `booking_${bookingId}`;

    socket.join(room);

    // console.log(`📍 ${socket.id} joined ${room}`);
  });

  // Broadcast location to the other participant in the booking.
  socket.on("location-update", ({ bookingId, userType, latitude, longitude, accuracy }) => {
    if (!bookingId || !userType || latitude === undefined || longitude === undefined) {
      // console.log("❌ Invalid location data");
      return;
    }

    const room = `booking_${bookingId}`;

    socket.to(room).emit("location-update", {
      bookingId,
      userType,
      latitude,
      longitude,
      accuracy,
    });
  });

  // Broadcast ride started to the passenger.
  socket.on("ride-started", ({ bookingId }) => {
    if (!bookingId) {
      return;
    }

    const room = `booking_${bookingId}`;

    socket.to(room).emit("ride-started", {
      bookingId,
    });
  });

  // Broadcast ride completed to the passenger.
  socket.on("ride-completed", ({ bookingId }) => {
    if (!bookingId) {
      return;
    }

    const room = `booking_${bookingId}`;

    socket.to(room).emit("ride-completed", {
      bookingId,
    });
  });

  
  // Leave booking room.
  socket.on("leave-booking", ({ bookingId }) => {
    if (!bookingId) {
      return;
    }

    const room = `booking_${bookingId}`;

    socket.leave(room);

    // console.log(`🚪 ${socket.id} left ${room}`);
  });

  socket.on("disconnect", (reason) => {
    // console.log(`❌ Socket disconnected: ${socket.id}`);
    // console.log("Reason:", reason);
  });
});

const PORT = process.env.PORT;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});