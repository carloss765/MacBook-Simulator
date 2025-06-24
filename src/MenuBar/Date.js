// Function to get the current formatted date
export function getCurrentDate() {
  const now = new Date();
  // Options for formatting the date to "Sun May 25 2025" style
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  // Format the date using 'en-US' locale and remove any commas
  const formattedDate = now
    .toLocaleDateString("en-US", options)
    .replace(/,/g, "");
  return formattedDate;
}

// Function to get the current formatted time
export function getCurrentTime() {
  const now = new Date();
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  // Format the time to "10:30 AM" style
  return now.toLocaleTimeString("en-US", options);
}
