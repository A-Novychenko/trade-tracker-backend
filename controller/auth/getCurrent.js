const getCurrent = async (req, res) => {
  const {email, subscription} = req.user;
  res.json({
    status: "OK",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;