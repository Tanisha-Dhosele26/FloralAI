const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (err) {

    const isQuotaError =
    err.status === "RESOURCE_EXHAUSTED" ||
    err.message?.includes("Quota exceeded");

    // ❌ DO NOT RETRY quota errors
    if (isQuotaError) {
        throw err;
    }

    const shouldRetry =
      err.message.includes("timeout") ||
      err.code === "ETIMEDOUT" ||
      err.code === "ECONNRESET" ||
      err.response?.status >= 500;
      !err.response;

    if (!shouldRetry || retries <= 0) {
      throw err;
    }

    console.warn(`🔁 Retrying... Attempts left: ${retries}`);

    await wait(delay);

    return retry(fn, retries - 1, delay * 2);
  }
};

module.exports = retry;
