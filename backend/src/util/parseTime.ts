const pattern = /^(?<hours>\d{2,}):(?<minutes>[0-5]\d):(?<seconds>[0-5]\d)$/;

export default function parseTime(time: string) {
  const groups = time.match(pattern);

  if (!groups || !groups.groups) {
    throw new Error(`Invalid time: ${time}`);
  }

  const { hours, minutes, seconds } = groups.groups;

  return {
    hours: parseInt(hours, 10),
    minutes: parseInt(minutes, 10),
    seconds: parseInt(seconds, 10),
  };
}
