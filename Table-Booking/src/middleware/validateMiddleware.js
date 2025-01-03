exports.validateBooking = (req, res, next) => {
    const { date, time, guests, name, contact } = req.body;
    if (!date || !time || !guests || !name || !contact) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    next();
  };
  