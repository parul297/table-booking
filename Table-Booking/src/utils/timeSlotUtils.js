const generateTimeSlots = (start, end, interval) => {
    const slots = [];
    let current = start;
    while (current < end) {
      slots.push(current);
      current += interval;
    }
    return slots;
  };
  
  module.exports = { generateTimeSlots };
  