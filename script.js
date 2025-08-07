// These arrays are just lists of month names and day names.
// JavaScript gives months and weekdays as numbers, so we use these arrays to get the actual names like "March" or "Wednesday".
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// This code is grabbing elements from the HTML page using their class names.------------------------------------------------
// "querySelector" returns the first matching element, not all and "querySelectorAll" returns all matching elements.
const giveaway = document.querySelector(".giveaway"); // Getting/selecting the first element with the class ".giveaway" and assigning it to the variable giveaway.
const deadline = document.querySelector(".deadline"); // Getting/selecting the first element with the class ".deadline" and assigning it to the variable deadline.
const items = document.querySelectorAll(".deadline-format h4"); // Getting/selecting all the h4 elements inside any element with the class "deadline-format" and assigning them to the variable items.

// Creating the future Date (10 days from now)--------------------------------------------------------------
let tempDate = new Date(); // The new Date() creates a Date object with the current date and time, and it’s stored in tempDate variable.
let tempYear = tempDate.getFullYear(); // The getFullYear() method extracts the current full year (e.g., 2025) from the tempDate object and stores it in the variable tempYear.
let tempMonth = tempDate.getMonth(); // The getMonth() method extracts the current month number (0–11) from the tempDate object and stores it in the variable tempMonth.
let tempDay = tempDate.getDate(); // The getDate() method extracts the current day of the month (1–31) from the tempDate object and stores it in the variable tempDay.
// let futureDate = new Date(2025, 11, 24, 17, 30, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 17, 30, 0); // Creating a new Date object by adding 10 to tempDay, with the time set to 17:30 and storing it in the variable futureDate.
const year = futureDate.getFullYear(); // The getFullYear() method extracts the full year (e.g., 2025) from the futureDate object and stores it in the variable year.
const hours = futureDate.getHours(); // The getHours() method extracts the hour (0–23, e.g. 17) from the futureDate object and stores it in the variable hours.
const minutes = futureDate.getMinutes(); // The getMinutes() method extracts the minute (0-59, e.g. 30) from the futureDate object and stores it in the variable minutes.

let month = futureDate.getMonth(); // The getMonth() method extracts the month number (0-11) from futureDate and stores it in the variable month.
month = months[month]; // The number stored in the variable month (0–11) is used to get the matching month name from the months array and reassigning/updating the variable month to now hold that name.
const date = futureDate.getDate(); // The getDate() method extracts the day of the month (1-31) from the futureDate object and stores it in the variable date.

const weekday = weekdays[futureDate.getDay()]; // The getDay() method extracts the day of the week (0–6) from the futureDate object, which is used to find the matching day name from the weekdays array and stores it in the variable weekday.

// Changing .giveaway text and adding the futureDate
giveaway.textContent = `Giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}pm`; // Editing the text on the element that is assigned to the variable giveaway using textContent property to "Giveaway ends on (current date 10 days in the future)", using template a literal.

// Future time in millisecond
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;
  // 1s = 1000ms
  // 1min = 60secs
  // 1hr = 60mins
  // 1day = 24hrs

  // Value in milliseconds
  const oneDay = 24 * 60 * 60 * 1000; // 24hrs * 60mins * 60secs * 1000millisecs = oneDay in milliseconds
  const oneHour = 60 * 60 * 1000; // 60mins * 60secs * 1000millisecs = oneHour in milliseconds
  const oneMinute = 60 * 1000; // 60mins * 1000millisecs = oneMinute in milliseconds

  // Calculate all values
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // Set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });
  if (t < 0) {
    clearInterval(countDown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired...</h4> `;
  }
}
// Countdown
let countDown = setInterval(getRemainingTime, 1000);

getRemainingTime();
