const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid");
// const jwt = require("jsonwebtoken");

const {HttpError} = require("../..//helpers");

const {User} = require("../../models/user");

const {sendEmail} = require("../../helpers");

const {BASE_URL, FRONTEND_URL} = process.env;
// const {SECRET_KEY} = process.env;

const register = async (req, res) => {
  const {email, password} = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.findOne({email});
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURLDefault = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatarURLDefault,
    verificationToken,
  });

  // console.log("newUser", newUser);

  const verifyEmail = {
    to: email,
    subject: "Verify  email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  // const token = jwt.sign({id: newUser._id}, SECRET_KEY, {expiresIn: "23h"});
  // await User.findByIdAndUpdate(newUser._id, {token});

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      // token,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        name: newUser.name,
      },
    },
  });
  // res.redirect(`${FRONTEND_URL}/verify`);
};

module.exports = register;
