export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, googleId, photo } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName,
        email,
        googleId,
        photo,
        role: "user",
      });
    }

    const isAdmin = user.email === process.env.ADMIN_EMAIL;

    if (isAdmin && user.role !== "admin") {
      user.role = "admin";
      await user.save();

      user = await User.findById(user._id);
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};