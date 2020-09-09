const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')

//Models
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')

//Config
const keys = require('../config/keys')

module.exports = {
    userRegister: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const user = await User.findOne({ email })
            if (user) {
                //errors.email = "Email already exist"
                //return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await new User({
                name,
                email,
                password: hashedPassword,
            })
            await newUser.save()
            res.status(200).json({ message: newUser})
        }
        catch (err) {
            console.log("Error in userRegister", err.message)
            return res.status(400).json({message:`Error in userRegister ${err.message}`})
        }
    },
    userLogin: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email })
            if (!user) {
                return 
            }
            const isCorrect = await bcrypt.compare(password, user.password)
            if (!isCorrect) {
                // errors.password = 'Invalid Credentials';
                // return res.status(404).json(errors);
            }
            const payload = { id: user.id, user: user }
            jwt.sign(
                payload,
                keys.secretKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );

        }
        catch (err) {
            console.log("Error in userLogin", err.message)
            return res.status(400).json({ message: `Error in userLogin ${err.message}` })
        }
    },
    uploadPost: async (req, res, next) => {
        try {
            const { name } = req.user
            const { title, description, email} = req.body;
            const imgUrl = await bufferConversion(req.file.originalname, req.file.buffer)
            const imgResponse = await cloudinary.uploader.upload(imgUrl)
            const user = await User.findOne({ email })
            const newPost = await new Post({
                title,
                description,
                imgUrl: imgResponse.secure_url,
                author: name,
                user: user._id
            })
            await newPost.save()
            user.posts.push(user._id)
            await user.save()
            return res.status(200).json({message: newPost})
        }
        catch (err) {
            console.log("Error in uploadPost", err.message)
            return res.status(400).json({ message: `Error in uploadPost ${err.message}` })
        }
    },
    deletePost: async (req, res, next) => {
        try {
            const { postId } = req.params 
            const requiredPost = await Post.findByIdAndDelete({ _id: postId })
            res.status(200).json({message:"Successfully Post is deleted"})
        }
        catch (err) {
            console.log("Error in deletePost", err.message)
            return res.status(400).json({ message: `Error in deletePost ${err.message}` })
        }
    },
    commentOnSomeonePost: async (req, res, next) => {
        try {
            const { postId, commentBody } = req.body;
            const { _id } = req.user
            
            const newComment = await new Comment({
                commentBody,
                commentedBy: _id,
            })
            await newComment.save()
            const post = await Post.findById({ _id: postId })
            post.comments.push(newComment._id)
            await post.save()
        }
        catch (err) {
            console.log("Error in commentOnSomeonePost", err.message)
            return res.status(400).json({ message: `Error in commentOnSomeonePost ${err.message}` })
        }
    },
    likeSomeonePost: async (req, res, next) => {
        try {

        }
        catch (err) {
            console.log("Error in likeSomeonePost", err.message)
            return res.status(400).json({ message: `Error in likeSomeonePost ${err.message}` })
        }
    },
    getAllPost: async (req, res, next) => {
        try {
            const allPosts = await Post.find({})
            if (allPosts.length === 0) {
                return res.status(200).json({message: "No post found"})
            }
            return res.status(200).json({ message: allPosts})

        }
        catch (err) {
            console.log("Error in getAllPost", err.message)
            return res.status(400).json({ message: `Error in getAllPost ${err.message}` })
        }
    },
    getUsersPost: async (req, res, next) => {
        try {
            const {_id} = req.user
            const allPosts = await Post.find({user:_id})
            if (allPosts.length === 0) {
                return res.status(200).json({ message: "No post found" })
            }
            return res.status(200).json({ message: allPosts })

        }
        catch (err) {
            console.log("Error in getAllPost", err.message)
            return res.status(400).json({ message: `Error in getAllPost ${err.message}` })
        }
    }
}