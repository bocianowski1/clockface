import clock from "clock";
import document from "document";
// show battery level, steps, and heart rate
import { battery, charger } from "power";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

clock.granularity = "minutes";

// Get a handle on the <text> element
const timeLabel = document.getElementById("timeLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();

  hours = zeroPad(hours);
  let mins = zeroPad(today.getMinutes());
  timeLabel.text = `${hours}:${mins}`;
};

// show battery level
const batteryLabel = document.getElementById("batteryLabel");
batteryLabel.text = `${Math.floor(battery.chargeLevel)}%`;

battery.onchange = () => {
  batteryLabel.text = `${Math.floor(battery.chargeLevel)}%`;
};

// show date
const dateLabel = document.getElementById("dateLabel");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Nov",
  "Dec",
];
const todayDate = new Date();
const month = months[todayDate.getMonth() - 1];
const date = todayDate.getDate();
dateLabel.text = `${date}. ${month}`;

// show heart rate
const hrm = new HeartRateSensor();
hrm.start();
const heartRateLabel = document.getElementById("heartRateLabel");
hrm.onreading = () => {
  heartRateLabel.text = `${hrm.heartRate}`;
};

// show steps
const stepsLabel = document.getElementById("stepsLabel");
stepsLabel.text = `${today.local.steps}`;

today.local.onchange = () => {
  stepsLabel.text = `${today.local.steps}`;
};

const divider = document.getElementById("divider");
divider.text = "|";
