const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // ❌ No header
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // ✅ Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Invalid token format" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // 🔥 available in controllers
    next();

  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};
