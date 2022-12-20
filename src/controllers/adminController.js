const CryptoJS = require('crypto-js')
const { Admin } = require('../models')
const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose')

exports.login = async (req, res) => {
   try {
      const {
         username,
         password
      } = req.body

      const admin = await Admin.findOne({ username });

      if(!admin) {
         return res.status(400).json({ message: "Username yoki parol noto'g'ri"})
      }

      const decryptedPass = CryptoJS.AES.decrypt(
         admin.password,
         process.env.PASSWORD_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8)

      if(password !== decryptedPass) {
         return res.status(400).json({ message: "Username yoki parol noto'g'ri" })
      }

      const token = jwt.sign({
         id: admin._id
      }, process.env.TOKEN_SECRET_KEY)

      admin.password = undefined;

      const adminInfo = {
         fullName: admin.fullName,
         username: admin.username,
         role: admin.role,
         token: token
      }

      res.status(200).json({ admin: adminInfo });
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.register = async (req, res) => {
   try {
      const {
         fullName,
         username,
         password
      } = req.body;

      const admin = await Admin.findOne({ username });

      if(admin) {
         return res.status(400).json({ message: "Bunday foydalanuvchi oldin ro'yxatdan o'tgan" });
      }

      const newAdmin = new Admin({
         username,
         password: CryptoJS.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET_KEY
         ),
         fullName,
         role: "user"
      })

      await newAdmin.save();

      res.status(201).json({ message: "Muvaffaqqiyatli ro'yxatdan o'tildi" });

   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.getAll = async (req, res) => {
   try {
      const admins = await Admin.find().sort({ createdAt: -1 }).populate('areas');

      if(!admins) {
         return res.status(404).json({ message: "Userlar mavjud emas" })
      }

      res.status(200).json({ admins })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

exports.getMyData = async (req, res) => {
   try {
      const id = req.admin.id;

      if(!isValidObjectId(id)) {
         return res.status(400).json({ message: 'error_id' })
      }

      const isAdmin = await Admin.findById(id).populate('areas');

      if(!isAdmin) {
         return res.status(404).json({ message: 'Admin  topilmadi' })
      }

      const decryptedPass = CryptoJS.AES.decrypt(
         isAdmin.password,
         process.env.PASSWORD_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8)
      
      const admin = {
         password: decryptedPass,
         username: isAdmin.username,
         fullName: isAdmin.fullName
      };

      res.status(200).json({ admin })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.update = async (req, res) => {
   try {
      const id = req.admin.id

      if(!isValidObjectId(id)) {
         return res.status(400).json({ message: 'error_id' })
      }

      const admin = await Admin.findById(id);

      if(!admin) {
         return res.status(404).json({ message: 'Admin  topilmadi' })
      }

      if(req.body.password) {
         const encryptedPassword = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SECRET_KEY
         ).toString()

         await Admin.findByIdAndUpdate(id, { password: encryptedPassword });
      }

      if(req.body.username) {
         const adminExist = await Admin.findOne({ username: req.body.username });

         console.log(adminExist);

         if(adminExist) {
            if(adminExist?.id !== id) {
               return res.status(400).json({ message: 'Bunday foydalanuvchi mavjud' })
            }
         }

         await Admin.findByIdAndUpdate(id, { username: req.body.username })  
      }

      await Admin.findByIdAndUpdate(id, { fullName: req.body.fullName }, { new: true })

      res.status(200).json({ message: "Muvaffaqqiyatli saqlandi!" })
   } catch(err) {
      res.status(501).json({ message: err.message })
   }
}