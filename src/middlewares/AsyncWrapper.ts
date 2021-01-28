export const AsyncWrapper = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch((next));
