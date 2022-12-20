const { Land, Admin } = require('../models');

exports.summary = async (req, res) => {
   try {
      const landsCount = await Land.countDocuments();
      const numberOnePlanLands = await Land.find({ numberPlan: 1 });
      const numberTwoPlanLands = await Land.find({ numberPlan: 2 });
      const users = await Admin.find({ role: 'user' });

      const summary = {
         landsCount,
         numberOnePlanLands: numberOnePlanLands.length,
         numberTwoPlanLands: numberTwoPlanLands.length,
         users: users.length
      }

      res.status(200).json({ summary });
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}