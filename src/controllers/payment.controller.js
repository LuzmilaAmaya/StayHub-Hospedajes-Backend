import {
  createPaymentPreference,
  confirmPaymentAndCreateReservation,
} from "../services/payment.service.js";

export const createPayment = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, guestId } = req.body;

    const response = await createPaymentPreference(
      roomId,
      checkIn,
      checkOut,
      guestId
    );

    res.json(response);
  } catch (error) {
    console.error("ERROR CREATE PAYMENT:", error);
    res.status(500).json({ error: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { paymentId, id, guestId, checkIn, checkOut } = req.body;

    const reservation = await confirmPaymentAndCreateReservation(
      paymentId,
      id,
      guestId,
      checkIn,
      checkOut
    );

    res.json(reservation);
  } catch (error) {
    console.error("ERROR CONFIRM PAYMENT:", error);
    res.status(400).json({
      message: error.message,
    });
  }
};