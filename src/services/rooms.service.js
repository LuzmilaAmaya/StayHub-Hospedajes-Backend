import Room from "../models/Room.js";

export const createRoom = (data) => {
  return Room.create(data);
};

export const getAllRooms = () => {
  return Room.find();
};

export const getRoomById = (id) => {
  return Room.findById(id);
};

export const updateRoom = (id, data) => {
  return Room.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRoom = (id) => {
  return Room.findByIdAndDelete(id);
};
