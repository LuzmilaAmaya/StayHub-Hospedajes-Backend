import mongoose from "mongoose";
import dotenv from "dotenv";
import Room from "../src/models/Room.js";
import { connectDB } from "../src/config/db.js";

// Cargar variables de entorno
dotenv.config();

const rooms = [
  {
    name: "Suite Ejecutiva 101",
    type: "suite",
    capacity: 2,
    pricePerNight: 150,
    active: true,
  },
  {
    name: "Suite Premium 301",
    type: "suite",
    capacity: 3,
    pricePerNight: 200,
    active: true,
  },
  {
    name: "Suite Presidencial 401",
    type: "suite",
    capacity: 4,
    pricePerNight: 350,
    active: true,
  },
  {
    name: "Habitación Doble 205",
    type: "doble",
    capacity: 2,
    pricePerNight: 100,
    active: true,
  },
  {
    name: "Habitación Doble 206",
    type: "doble",
    capacity: 2,
    pricePerNight: 100,
    active: true,
  },
  {
    name: "Habitación Doble 207",
    type: "doble",
    capacity: 2,
    pricePerNight: 100,
    active: true,
  },
  {
    name: "Habitación Doble 208",
    type: "doble",
    capacity: 2,
    pricePerNight: 110,
    active: true,
  },
  {
    name: "Habitación Simple 102",
    type: "simple",
    capacity: 1,
    pricePerNight: 80,
    active: true,
  },
  {
    name: "Habitación Simple 103",
    type: "simple",
    capacity: 1,
    pricePerNight: 80,
    active: true,
  },
  {
    name: "Habitación Simple 104",
    type: "simple",
    capacity: 1,
    pricePerNight: 85,
    active: true,
  },
  {
    name: "Habitación Simple 105",
    type: "simple",
    capacity: 1,
    pricePerNight: 85,
    active: false,
  },
];

const seedRooms = async () => {
  try {
    // Conectar a MongoDB usando la función connectDB
    await connectDB();

    // Limpiar colección existente
    await Room.deleteMany({});
    console.log("🗑️  Habitaciones anteriores eliminadas");

    // Insertar nuevas habitaciones
    const createdRooms = await Room.insertMany(rooms);
    console.log(`✨ ${createdRooms.length} habitaciones creadas exitosamente`);

    // Mostrar las habitaciones creadas
    console.log("\n📋 Habitaciones creadas:");
    createdRooms.forEach((room) => {
      console.log(
        `   - ${room.name} (${room.type}) - $${room.pricePerNight}/noche - Capacidad: ${room.capacity}`
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

seedRooms();
