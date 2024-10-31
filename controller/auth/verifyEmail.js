const {User} = require("../..//models/user");

const {HttpError} = require("../..//helpers");

const {FRONTEND_URL} = process.env;

const verifyEmail = async (req, res) => {
  const {verificationToken} = req.params;

  const user = await User.findOne({verificationToken});

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  // res.json({
  //   status: "OK",
  //   code: 200,
  //   message: "Verification successful",
  // });

  res.redirect(`${FRONTEND_URL}/verify?success=true`);
};

module.exports = verifyEmail;
