export const isCookieExpired = (cookieName) => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName));

  if (!cookie) {
    // Cookie not found
    return true;
  }

  const [, value] = cookie.split("="); // Get the value of the cookie
  const expirationDate = new Date(value); // Convert the value to a Date object

  // Check if the expiration date is in the past
  return expirationDate < new Date();
};

export const ValidateFields = (object) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validating email
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Regex for validating password (minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number)

  for (const key in object) {
    const value = object[key];
    switch (key) {
      case "email":
        if (typeof value !== "string" || !emailRegex.test(value)) {
          return false; // Invalid email
        }
        break;
      case "password":
        if (
          typeof value !== "string" ||
          value.trim() === "" ||
          !passwordRegex.test(value)
        ) {
          return false; // Invalid password
        }
        break;
      default:
        if (typeof value !== "string" || value.trim() === "") {
          return false; // Invalid string field
        }
    }
  }
  return true; // All fields are valid
};
