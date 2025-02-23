const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { query } = require("../config/conn");
const { parseDbResponse, sendResponse } = require("../utils/responseHandler");
const crypto = require("crypto");

const loginUser = async (req, res, next) => {
  // Input validation
  const { email, password } = req.body;
  if (!email || !password) {
    return sendResponse(res, 400, "email & password fields are required");
  }

  // const salt = "fixedSalt123"; // Always use the same salt
  const hashedPassword = crypto
    .pbkdf2Sync(password, process.env.SHASALT, 100000, 64, "sha256")
    .toString("hex");

  // const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);

  const procedure = "Call public.userlogincheck($1, $2, $3, $4)";
  const values = ["logincheck", email, hashedPassword, ""];
  const dbResponse = await query(procedure, values);
  let response = parseDbResponse(dbResponse.rows);
  let token = null;
  if (response?.statuscode == 200) {
    token = jwt.sign({ email }, process.env.TOKENSECRET, { expiresIn: '24h' })
  }
  response.token = token;
  console.log(jwt.verify(token, process.env.TOKENSECRET));
  res.status(response.statuscode).json(response);
  // sendResponse(res, response.statuscode, response.message);
};

const registerUser = async (req, res, next) => {
  const { firtname, lastname, email, gender, password } = req.body;
 
  // Input validation
  if (!firtname || !lastname || !email || !gender || !password) {
    return sendResponse(res, 400, "All fields are required");
  }
  //  converting password to hash
  // const salt = "fixedSalt123"; // Always use the same salt
  const hashedPassword = crypto
    .pbkdf2Sync(password, process.env.SHASALT, 100000, 64, "sha256")
    .toString("hex");

  console.log(
    firtname,
    lastname,
    email,
    gender,
    password,
    password,
    hashedPassword
  );
  console.log(hashedPassword);

  // Register a user
  const querys = `CALL public.userregistrationprocedure($1, $2, $3, $4, $5, $6, $7, $8)`;
  const values = [
    "userregistration",
    "0",
    firtname,
    lastname,
    gender,
    email,
    hashedPassword,
    "",
  ];
  try {
    const dbResponse = await query(querys, values);
    const response = parseDbResponse(dbResponse.rows);
    sendResponse(res, response.statuscode, response.message);
  } catch (error) {
    console.error("Error during user registration:", error);
    sendResponse(res, 500, "Internal Server Error");
  }
};

module.exports = { loginUser, registerUser };
