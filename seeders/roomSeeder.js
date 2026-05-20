import dotenv from "dotenv";
import Room from "../src/models/Room.js";
import { connectDB } from "../src/config/db.js";

dotenv.config();

const rooms = [
  {
    name: "Suite Presidencial",
    type: "suite",
    capacity: 2,
    pricePerNight: 320,
    description:
      "La experiencia máxima en lujo. Sala privada, jacuzzi panorámico, terraza exclusiva y servicio de mayordomo 24hs.",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    ],
    active: true,
  },
  {
    name: "Suite Ejecutiva 301",
    type: "suite",
    capacity: 2,
    pricePerNight: 240,
    description:
      "Suite de diseño contemporáneo con escritorio ejecutivo, vista a la ciudad y baño en mármol con ducha lluvia.",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    ],
    active: true,
  },
  {
    name: "Suite Junior 210",
    type: "suite",
    capacity: 3,
    pricePerNight: 195,
    description:
      "Suite amplia con zona lounge integrada, cama king size y minibar premium. Ideal para viajes de negocios o románticos.",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    ],
    active: true,
  },

  {
    name: "Habitación Doble Deluxe",
    type: "doble",
    capacity: 2,
    pricePerNight: 130,
    description:
      "Habitación doble de categoría superior con dos camas queen, decoración nórdica y balcón privado.",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
    ],
    active: true,
  },
  {
    name: "Habitación Doble Estándar 205",
    type: "doble",
    capacity: 2,
    pricePerNight: 100,
    description:
      "Cómoda habitación doble con cama matrimonial, smart TV y baño completo. Todo lo que necesitás para una estadía perfecta.",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
    ],
    active: true,
  },
  {
    name: "Habitación Doble Vista al Jardín",
    type: "doble",
    capacity: 2,
    pricePerNight: 110,
    description:
      "Habitación doble orientada al jardín interior. Luminosa, tranquila y con acceso directo a la terraza verde.",
    images: [
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80",
    ],
    active: true,
  },

  {
    name: "Habitación Simple Premium 108",
    type: "simple",
    capacity: 1,
    pricePerNight: 90,
    description:
      "Habitación individual de diseño moderno con cama king, escritorio de trabajo y amenities de primera.",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=800&q=80",
    ],
    active: true,
  },
  {
    name: "Habitación Simple Estándar 102",
    type: "simple",
    capacity: 1,
    pricePerNight: 75,
    description:
      "Habitación individual funcional y acogedora. Ideal para viajeros solos que buscan confort y buen precio.",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    ],
    active: true,
  },
  {
    name: "Habitación Simple Económica 105",
    type: "simple",
    capacity: 1,
    pricePerNight: 60,
    description:
      "La opción más accesible del hotel. Limpia, cómoda y con todo lo esencial para una buena noche.",
    images: [
      "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800&q=80",
    ],
    active: false,
  },
];

export const seedRooms = async () => {
  try {
    await connectDB();

    console.log("🌱 Running PRO seed (idempotent upsert)...");

    let created = 0;
    let updated = 0;

    for (const room of rooms) {
      const result = await Room.findOneAndUpdate(
        { key: room.key }, // 👈 identidad estable
        { $set: room },
        {
          upsert: true, // crea si no existe
          new: true,
        }
      );

      if (result.createdAt && result.updatedAt && result.createdAt.getTime() === result.updatedAt.getTime()) {
        created++;
      } else {
        updated++;
      }
    }

    console.log(`
✅ SEED PRO COMPLETADO
- creadas: ${created}
- actualizadas: ${updated}
- total definidas: ${rooms.length}
    `);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedRooms();