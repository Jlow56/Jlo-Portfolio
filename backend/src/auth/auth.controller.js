import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/error.middleware.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError.js";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m", issuer: "jlowdev-portfolio", audience: "portfolio-admin" }
  );

  const refreshToken = jwt.sign(
    { sub: user._id.toString() , version: user.refreshTokenVersion },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d", issuer: "jlowdev-portfolio", audience: "portfolio-admin" }
  );

  return { accessToken, refreshToken };
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Invalid credentials", 401);
  }
  if (user.role !== "admin") throw new AppError("Access denied", 403);

  const { accessToken, refreshToken } = generateTokens(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth/refresh", 
  });

  res.status(200).json({ data: { message: "Logged in" }, error: null });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new AppError("No refresh token", 401);

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
      issuer: "jlowdev-portfolio",
      audience: "portfolio-admin"
    });
  } catch {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const user = await User.findById(decoded.sub);
  if (!user) throw new AppError("User not found", 401);

  if (decoded.version !== user.refreshTokenVersion) {
    throw new AppError("Token révoqué", 401);
  }

  await User.findByIdAndUpdate(user._id, { $inc: { refreshTokenVersion: 1 } });

  const updatedUser = await User.findById(user._id);
  const { accessToken, refreshToken } = generateTokens(updatedUser);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth/refresh",
  });

  res.status(200).json({ data: { message: "Token refreshed" }, error: null });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict", });
  res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict", path: "/api/auth/refresh" });
  res.status(200).json({ data: null, error: null });
})
