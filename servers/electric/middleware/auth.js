const adminId = process.env.USER_UID;

const isAdmin = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (adminId === userId) {
      next();
    } else {
      return res.send("Access Denied!");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = isAdmin;
