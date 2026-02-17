import * as reservationService from "../services/reservation.service.js";

export const createReservation = async (req, res) => {
  try {
    const reservation = await reservationService.createReservation({
      ...req.body,
      user: req.user.id, 
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getReservations(
      req.user.id
    );

    res.json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(
      req.params.id
    );

    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const reservation = await reservationService.cancelReservation(
      req.params.id
    );

    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
