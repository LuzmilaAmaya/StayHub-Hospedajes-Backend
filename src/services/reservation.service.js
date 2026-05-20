import Reservation from "../models/Reservation.js";

export const createReservation = async (data) => {
  const reservation = new Reservation(data);
  return await reservation.save();
};

export const getReservations = async (userId) => {
  return await Reservation.find({ user: userId }).populate("room");
};

export const getAllReservations = async () => {
  return await Reservation.find()
    .populate("room")
    .populate("user", "fullName email");
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
export const updateReservation = async (
  id,
  data
) => {
  return await Reservation.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};