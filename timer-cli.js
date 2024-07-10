const scriptName = "timer-cli";
const usageText = `Please specify time

format:
	${scriptName} XXhXXmXXs
	${scriptName} XXmXXs
	${scriptName} XXs
Example:
	${scriptName} 1h30m20s`;
function countdownTimer(durationInSeconds) {
  let timer = durationInSeconds;

  const interval = setInterval(() => {
    // Clear current line
    process.stdout.write("\x1B[2K");

    // Calculate minutes and seconds
    let minutes = Math.floor(timer / 60);
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    let seconds = timer % 60;

    // Format hours, minutes, and seconds to ensure two digits
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    // Print the timer
    process.stdout.write(`Time remaining: ${hours}:${minutes}:${seconds}`);

    // Move cursor to the beginning of the line
    process.stdout.write("\x1B[0G");

    // Decrease the timer
    timer--;

    if (timer < 0) {
      clearInterval(interval);
      process.stdout.write("\nTime's up!\n");
      setInterval(() => process.stdout.write("\x07"), 1000);
    }
  }, 1000); // 1 seond interval
}

const arg = process.argv[process.argv.length - 1];
const timeBreakdown = arg.split(/(h|m|s)/g).filter((v) => v !== "");
let time = 0;
for (let i = 0; i < timeBreakdown.length; i += 2) {
  const num = Number(timeBreakdown[i]);
  if (Number.isNaN(num)) {
    console.log(usageText);
    process.exit(-1);
  }
  switch (timeBreakdown[i + 1]) {
    case "s":
      time += num;
      break;
    case "m":
      time += num * 60;
      break;
    case "h":
      time += num * 60 * 60;
      break;
    default: {
      console.log(usageText);
      process.exit(-1);
    }
  }
}
countdownTimer(time);
