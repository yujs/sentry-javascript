/**
 * Returns the current timestamp in seconds since the UNIX epoch.
 */
export function timestampInSeconds(): number {
  // Implementation note
  //
  // Among other uses, this function is used to get timestamps for the start and end of spans and transactions.
  //
  // In theory, it sounds like the perfect opportunity to use the Performance Web API [1] for using a higher precision
  // monotonic clock. In practice, it runs into problems that make it unsuitable to derive absolute timestamps [2].
  //
  // While prone to unexpected clock changes and with possibly lower precision, Date.now seems to be the best API at the
  // moment.
  //
  // [1]: https://developer.mozilla.org/en-US/docs/Web/API/Performance
  // [2]: https://github.com/getsentry/sentry-javascript/issues/2590
  return Date.now() / 1000;
}

// Re-exported with an old name for backwards-compatibility.
export { timestampInSeconds as timestampWithMs };
