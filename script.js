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

// Changing .giveaway text and adding the futureDate----------------------------------------------------------------------
giveaway.textContent = `Giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}pm`;
// Sets the text of the element stored in the giveaway variable using the textContent property.
// It displays: "Giveaway ends on ..." using a template literal with values from the futureDate (10 days from the current date).

// Future time in millisecond-----------------------------------------------------------------------------------------
const futureTime = futureDate.getTime(); // The getTime() method gets the time value (in milliseconds since January 1, 1970) from the futureDate object and stores it in the futureTime variable.

function getRemainingTime() {
  // This function runs **every second** to update the countdown.
  const today = new Date().getTime(); // The getTime() method gets the current time value (in milliseconds since January 1, 1970) from a new Date object and stores it in the variable today.
  const time = futureTime - today; // Calculates the remaining time by subtracting the current time (today) from the futureTime variable.
  // 1s = 1000ms
  // 1min = 60secs
  // 1hr = 60mins
  // 1day = 24hrs

  // Value in milliseconds-----------------------------------------------------------------------------------------
  const oneDay = 24 * 60 * 60 * 1000; // 24hrs * 60mins * 60secs * 1000millisecs = oneDay in milliseconds
  const oneHour = 60 * 60 * 1000; // 60mins * 60secs * 1000millisecs = oneHour in milliseconds
  const oneMinute = 60 * 1000; // 60mins * 1000millisecs = oneMinute in milliseconds

  // Calculate all values--------------------------------------------------------------------
  // Converting total milliseconds to days
  let days = time / oneDay; // Divides the total milliseconds by the number of milliseconds in a day. This gives us the total number of days left, including fractions (e.g., 4.75 days).
  days = Math.floor(days); //  Removes the decimal part (rounds down) so we only get whole days left (e.g., 4 days).

  // Finding the remaining hours, minutes, seconds--------------------------------------------------------
  let hours = Math.floor((time % oneDay) / oneHour); // (time % oneDay) - finds the leftover milliseconds after removing all full days and (/ oneHour) converts that leftover fraction of a day into hours. Math.floor(...) - keeps only the whole hours.
  let minutes = Math.floor((time % oneHour) / oneMinute); // (time % oneHour) - finds the leftover milliseconds after removing all full hours and (/ oneMinute) converts that leftover into minutes. Math.floor(...) - keeps only the whole minutes.
  let seconds = Math.floor((time % oneMinute) / 1000); // (time % oneMinute) -  finds the leftover milliseconds after removing all full minutes and (/ 1000) converts milliseconds to seconds. Math.floor(...) - keeps only the whole seconds.

  // Set values array
  const values = [days, hours, minutes, seconds]; // Creates an array named values that contains the current countdown time parts: days, hours, minutes, and seconds.

  function format(item) {
    // This function takes a number (item) as a parameter.
    if (item < 10) {
      // If the number is less than 10, add a "0" in front of it.
      return (item = `0${item}`); // So that it always shows two digits (e.g., 5 becomes "05").
    }
    return item; // Otherwise, just return the number as it is.
  }

  items.forEach(function (item, index) {
    // Loops through each element in items. Function (item, index) is a callback function run for each element: item - the current HTML element being looped over. index - the position number of that element in the list (0 for the first, 1 for the second, etc.).
    item.innerHTML = format(values[index]); // Gets the matching countdown value (e.g., days, hours, minutes, seconds) from the values array. Format() makes sure that value is displayed as two digits (e.g., 5 becomes "05"). item.innerHTML = updates the HTML content of the <h4> with that formatted value.
  });
  if (time < 0) {
    // Checks if time is less than 0 (meaning the future date has already passed).
    clearInterval(countDown); // Stops the countdown timer from running anymore.
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired...</h4> `; // Replaces the whole .deadline section with a message saying the giveaway expired.
  }
}
// Countdown
let countDown = setInterval(getRemainingTime, 1000); // Calls a function repeatedly every 1000 milliseconds (1 second). The return value from setInterval() (stored in countDown) is an ID that can later be pass to clearInterval() to stop it.

getRemainingTime();
