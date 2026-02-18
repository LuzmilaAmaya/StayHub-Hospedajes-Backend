import Room from "../models/Room.js";

export const createRoom = async (data) => {
  const newRoom = new Room(data);
  return await newRoom.save();
};

export const getAllRooms = async () => {
  return await Room.find();
};

export const getRoomById = async (id) => {
  return await Room.findById(id);
};

export const updateRoom = async (id, data) => {
  return await Room.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRoom = async (id) => {
  return await Room.findByIdAndDelete(id);
};
