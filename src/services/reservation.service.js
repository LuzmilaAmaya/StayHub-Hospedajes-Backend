import Reservation from "../models/Reservation.js";
import Room from "../models/Room.js";

export const createReservation = async (data) => {
  const { room, guest, checkIn, checkOut } = data;

  const roomData = await Room.findById(room);
  if (!roomData || !roomData.active) {
    throw new Error("Habitación no disponible");
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (start >= end) {
    throw new Error("Las fechas son inválidas");
  }

  // Verificar solapamiento
  const conflict = await Reservation.findOne({
    room,
    status: { $ne: "cancelled" },
    $or: [{ checkIn: { $lt: end }, checkOut: { $gt: start } }],
  });

  if (conflict) {
    throw new Error("La habitación ya está reservada en esas fechas");
  }

  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  const totalPrice = nights * roomData.pricePerNight;

  return await Reservation.create({
    room,
    guest,
    checkIn: start,
    checkOut: end,
    nights,
    pricePerNight: roomData.pricePerNight,
    totalPrice,
  });
};

export const getReservations = async () => {
  return Reservation.find().populate("room").sort({ createdAt: -1 });
};

export const getReservationById = async (id) => {
  const reservation = await Reservation.findById(id).populate("room");
  if (!reservation) throw new Error("Reserva no encontrada");
  return reservation;
};

export const cancelReservation = async (id) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) throw new Error("Reserva no encontrada");

  reservation.status = "cancelled";
  await reservation.save();

  return reservation;
};
