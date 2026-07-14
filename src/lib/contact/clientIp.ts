import { headers } from "next/headers";

const UNKNOWN_IP = "unknown";

function firstForwardedAddress(
  value: string | null,
) {
  if (!value) {
    return null;
  }

  return value
    .split(",")
    .map((address) => address.trim())
    .find(Boolean);
}

export async function getClientIp() {
  const requestHeaders = await headers();

  return (
    requestHeaders.get("cf-connecting-ip") ??
    requestHeaders.get("x-real-ip") ??
    firstForwardedAddress(
      requestHeaders.get("x-forwarded-for"),
    ) ??
    UNKNOWN_IP
  );
}