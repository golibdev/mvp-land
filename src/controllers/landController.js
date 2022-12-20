const { Land, Admin } = require('../models');
const { isValidObjectId } = require('mongoose');

exports.getAll = async (req, res) => {
   try {
      const lands = await Land.find().sort({ createdAt: -1 }).populate('user');

      if(!lands) {
         return res.status(404).json({ message: "Yerlar mavjud emas" });
      }

      res.status(200).json({ lands });
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

exports.create = async (req, res) => {
   try {
      const user = req.admin._id;
      const {
         area,
         resultProducts,
         numberPlan
      } = req.body

      const newLand = await Land.create({
         numberPlan,
         area,
         resultProducts,
         user
      })

      await Admin.findByIdAndUpdate(user, {
         $push: {
            areas: newLand._id
         }
      }, { new: true })

      res.status(201).json({ message: "Bazaga qo'shildi" });
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

exports.update = async (req, res) => {
   try {
      const id = req.params.id;

      if(!isValidObjectId(id)) {
         return res.status(400).json({ message: "ID xato" });
      }

      const land = await Land.findById(id);

      if(!land) {
         return res.status(404).json({ message: "Yer topilmadi" });
      }

      const updateLand = await Land.findByIdAndUpdate(id, {
         area: req.body.area ? req.body.area : land.area,
         resultProducts: req.body.resultProducts ? req.body.resultProducts : land.resultProducts,
         numberPlan: req.body.numberPlan ? req.body.numberPlan : land.numberPlan,
      }, { new: true });

      res.status(200).json({ message: "Muvaffaqqiyatli tahrirlandi", land: updateLand })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}