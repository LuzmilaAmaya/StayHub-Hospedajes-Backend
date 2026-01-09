import mongoose from "mongoose";
import dotenv from "dotenv";
import Reservation from "../src/models/Reservation.js";
import Room from "../src/models/Room.js";
import { connectDB } from "../src/config/db.js";

// Cargar variables de entorno
dotenv.config();

const seedReservations = async () => {
  try {
    // Conectar a MongoDB usando la función connectDB
    await connectDB();

    // Obtener habitaciones existentes
    const rooms = await Room.find({ active: true });

    if (rooms.length === 0) {
      console.log("⚠️  No hay habitaciones en la base de datos.");
      console.log("   Por favor, ejecuta primero: node seeder/roomSeeder.js");
      process.exit(1);
    }

    console.log(`📦 ${rooms.length} habitaciones encontradas`);

    // Limpiar colección existente
    await Reservation.deleteMany({});
    console.log("🗑️  Reservas anteriores eliminadas");

    // Crear fechas para las reservas
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const nextMonth = new Date(today);
    nextMonth.setDate(nextMonth.getDate() + 30);

    // Datos de ejemplo para reservas
    const reservations = [
      {
        room: rooms[0]._id, // Suite Ejecutiva
        guest: {
          name: "María González",
          email: "maria.gonzalez@email.com",
        },
        checkIn: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 2
        ),
        checkOut: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 7
        ),
        nights: 5,
        pricePerNight: rooms[0].pricePerNight,
        totalPrice: rooms[0].pricePerNight * 5,
        status: "confirmed",
      },
      {
        room: rooms[1]._id, // Suite Premium
        guest: {
          name: "Carlos Rodríguez",
          email: "carlos.rodriguez@email.com",
        },
        checkIn: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 4
        ),
        checkOut: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 6
        ),
        nights: 2,
        pricePerNight: rooms[1].pricePerNight,
        totalPrice: rooms[1].pricePerNight * 2,
        status: "pending",
      },
      {
        room: rooms[2]._id,
        guest: {
          name: "Ana Martínez",
          email: "ana.martinez@email.com",
        },
        checkIn: today,
        checkOut: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 3
        ),
        nights: 3,
        pricePerNight: rooms[2].pricePerNight,
        totalPrice: rooms[2].pricePerNight * 3,
        status: "confirmed",
      },
      {
        room: rooms[3]._id,
        guest: {
          name: "Luis Fernández",
          email: "luis.fernandez@email.com",
        },
        checkIn: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
        checkOut: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 2
        ),
        nights: 1,
        pricePerNight: rooms[3].pricePerNight,
        totalPrice: rooms[3].pricePerNight * 1,
        status: "cancelled",
      },
      {
        room: rooms[4]._id,
        guest: {
          name: "Patricia Silva",
          email: "patricia.silva@email.com",
        },
        checkIn: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 10
        ),
        checkOut: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 14
        ),
        nights: 4,
        pricePerNight: rooms[4].pricePerNight,
        totalPrice: rooms[4].pricePerNight * 4,
        status: "pending",
      },
      {
        room: rooms[5]._id,
        guest: {
          name: "Roberto Gómez",
          email: "roberto.gomez@email.com",
        },
        checkIn: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 15
        ),
        checkOut: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 20
        ),
        nights: 5,
        pricePerNight: rooms[5].pricePerNight,
        totalPrice: rooms[5].pricePerNight * 5,
        status: "confirmed",
      },
      {
        room: rooms[0]._id,
        guest: {
          name: "Julia Ramírez",
          email: "julia.ramirez@email.com",
        },
        checkIn: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 20
        ),
        checkOut: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 23
        ),
        nights: 3,
        pricePerNight: rooms[0].pricePerNight,
        totalPrice: rooms[0].pricePerNight * 3,
        status: "pending",
      },
    ];

    // Insertar reservas
    const createdReservations = await Reservation.insertMany(reservations);
    console.log(
      `✨ ${createdReservations.length} reservas creadas exitosamente`
    );

    // Mostrar las reservas creadas con populate
    const reservationsWithRoom = await Reservation.find().populate("room");

    console.log("\n📋 Reservas creadas:");
    reservationsWithRoom.forEach((res) => {
      const checkIn = res.checkIn.toLocaleDateString("es-AR");
      const checkOut = res.checkOut.toLocaleDateString("es-AR");
      console.log(
        `   - ${res.guest.name} | ${
          res.room.name
        } | ${checkIn} → ${checkOut} | ${res.status.toUpperCase()} | $${
          res.totalPrice
        }`
      );
    });

    // Cerrar conexión
    await mongoose.connection.close();
    console.log("\n✅ Seeder completado exitosamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al ejecutar el seeder:", error);
    process.exit(1);
  }
};

seedReservations();
