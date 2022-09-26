const LOG_PREFIX = "[👁️ dirty-scraper]"

export const log = (...args) => console.log(LOG_PREFIX, ...args)
export const time = (string = "") => {
  const timeString = `${LOG_PREFIX}${string}`
  console.time(timeString)

  return () => console.timeEnd(timeString)
}
