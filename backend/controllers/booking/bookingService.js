import { sendMail } from "../../services/mailer.js";
import config from "../../config/config.js";
import { DEV_EMAILS } from "../../config/devConfig.js";
import { validateBooking } from "./bookingValidation.js";
import { getBookingTemplate } from "./bookingTemplate.js";
import {
  checkTodayBooking,
  insertBooking,
  getAllBookings,
} from "./bookingRepository.js";


const { emailAdmin1, emailAdmin2 } = config;

export const submitBookingService = async (data) => {
  const { fullName, email, phone, fieldOfPreparation } = data;

  const normalizedEmail = email?.trim().toLowerCase();

  //Change Name to Proper case e.g. vaibhav -> Vaibhav
  const formattedFullNameOfUser = fullName
  ?.trim()
  .toLowerCase()
  .split(" ")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

  // validation
  validateBooking({
    fullName,
    email: normalizedEmail,
    phone,
    fieldOfPreparation,
  });

  // duplicate check
  if (!DEV_EMAILS.includes(normalizedEmail)) {
    const exists = await checkTodayBooking(normalizedEmail);

    if (exists) {
      const error = new Error(
        "You have already submitted today. Try again tomorrow."
      );
      error.statusCode = 400;
      throw error;
    }
  }

  // insert
  await insertBooking({
    fullName,
    email: normalizedEmail,
    phone,
    fieldOfPreparation,
  });

  // mail to Admin and user
  await sendMail({
    to: `${emailAdmin1}, ${emailAdmin2}`,
    subject: `New Seat Booking Request: ${formattedFullNameOfUser}`,
    html: getBookingTemplate({
      fullName,
      email: normalizedEmail,
      phone,
      fieldOfPreparation,
    }),
    replyTo: `${formattedFullNameOfUser} <${normalizedEmail}>`,
    isAdmin: true,
});

  return { message: "Booking submitted successfully." };
};

export const getBookingsService = async () => {
  return await getAllBookings();
};