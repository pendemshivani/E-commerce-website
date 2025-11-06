// small helper to standardize error responses - use in controllers if needed
exports.handleError = (res, err, message = 'Server error', code = 500) => {
  console.error(message, err);
  return res.status(code).json({ error: message });
};
