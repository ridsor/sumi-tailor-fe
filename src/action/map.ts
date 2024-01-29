"use server";

export const getGoogleMapsApiKey = async () =>
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
