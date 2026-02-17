import Reservation from "../models/Reservation.js";

export const createReservation = async (data) => {
  const reservation = new Reservation(data);
  return await reservation.save();
};

export const getReservations = async (userId) => {
  return await Reservation.find({ user: userId }).populate("room");
};

export const getReservationById = async (id) => {
  return await Reservation.findById(id).populate("room");
};

export const cancelReservation = async (id) => {
  return await Reservation.findByIdAndUpdate(
    id,
    { status: "cancelled" },
    { new: true }
  );
};
