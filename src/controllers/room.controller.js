import * as RoomService from "../services/rooms.service.js";

export const createRoom = async (req, res) => {
  try {
    const room = await RoomService.createRoom(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getRooms = async (req, res) => {
  const rooms = await RoomService.getAllRooms();
  res.json(rooms);
};

export const getRoom = async (req, res) => {
  const room = await RoomService.getRoomById(req.params.id);
  res.json(room);
};

export const updateRoom = async (req, res) => {
  const room = await RoomService.updateRoom(req.params.id, req.body);
  res.json(room);
};

export const deleteRoom = async (req, res) => {
  await RoomService.deleteRoom(req.params.id);
  res.json({ message: "Habitación eliminada" });
};
