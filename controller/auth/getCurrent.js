const getCurrent = async (req, res) => {
  const {email, name, subscription} = req.user;
  console.log("name", name);
  res.json({
    status: "OK",
    code: 200,
    data: {
      user: {
        email,
        subscription,
        name,
      },
    },
  });
};

module.exports = getCurrent;
