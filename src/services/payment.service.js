import dotenv from "dotenv";
dotenv.config();

import { MercadoPagoConfig, Preference } from "mercadopago";
import Room from "../models/Room.js";

console.log("ACCESS TOKEN:", process.env.MP_ACCESS_TOKEN);

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const createPaymentPreference = async (
  roomId,
  checkIn,
  checkOut,
  guestId
) => {
  const room = await Room.findById(roomId);

  if (!room) throw new Error("Habitación no encontrada");

  const nights =
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

  const total = room.pricePerNight * nights;

  const preference = new Preference(client);

  const body = {
    items: [
      {
        title: `Reserva ${room.name}`,
        quantity: 1,
        unit_price: Number(total),
        currency_id: "ARS",
      },
    ],
    back_urls: {
      success: "http://localhost:5173/payment-success",
      failure: "http://localhost:5173/payment-failure",
      pending: "http://localhost:5173/payment-pending",
    },
    payer: {
      email: "test_user_8475459195496725640@testuser.com",
    },
  };

  const result = await preference.create({ body });

  return result;
};
export const confirmPaymentAndCreateReservation = async () => {
  return { message: "Pago confirmado y reserva creada" };
};