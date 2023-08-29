export const resultToString = (
  resultString: string,
  eventId: string,
  format: string,
) => {
  let result = +resultString;
  if (eventId === "333fm") {
    switch (format) {
      case "single":
        return result.toString();
      case "average":
        return (result / 100).toFixed(2).toString();
      default:
        throw new Error(`Wrong format ${format}`);
    }
  } else if (eventId === "333mbf") {
    const missed = result % 100;
    result = Math.floor(result / 100);
    const timeSeconds = result % 100000;
    result = Math.floor(result / 100000);
    const difference = 99 - (result % 100);
    const solved = difference + missed;
    const attempted = solved + missed;
    const formattedTime = centisecondsToClockFormat(timeSeconds * 100).replace(
      /\.00$/,
      "",
    );
    return `${solved}/${attempted} ${formattedTime}`;
  } else {
    return centisecondsToClockFormat(result).toString();
  }
};

export const centisecondsToClockFormat = (centiseconds: number) => {
  if (!Number.isFinite(centiseconds)) {
    throw new Error(
      `Invalid centiseconds, expected positive number, got ${centiseconds}.`,
    );
  }
  return new Date(centiseconds * 10)
    .toISOString()
    .substr(11, 11)
    .replace(/^[0:]*(?!\.)/g, "");
};

export const decodeMultiResult = (result: number) => {
  if (result <= 0) return "DNF";
  const missed = result % 100;
  const seconds = Math.floor(result / 100) % 1e5;
  const points = 99 - (Math.floor(result / 1e7) % 100);
  const solved = points + missed;
  const attempted = solved + missed;
  const centiseconds = seconds * 100;
  const formattedTime = centisecondsToClockFormat(centiseconds).replace(
    /\.00$/,
    "",
  );
  return `${solved}/${attempted} ${formattedTime}`;
};
