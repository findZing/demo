import db from '../../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'

require('dotenv').config()

// const http = require('http');

// function parseCookies(request) {
//     const list = {};
//     const cookieHeader = request.headers?.cookie;
//     if (!cookieHeader) return list;

//     cookieHeader.split(`;`).forEach(function (cookie) {
//         let [name, ...rest] = cookie.split(`=`);
//         name = name?.trim();
//         if (!name) return;
//         const value = rest.join(`=`).trim();
//         if (!value) return;
//         list[name] = decodeURIComponent(value);
//     });

//     return list;
// }

const authController = {
    hashPassword: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync((12)))
    },

    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: '30s' }
        )
    },

    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_REFRESH_TOKEN,
            { expiresIn: '30d' }
        )
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = await req.cookies.refreshToken
        // console.log('refreshToken', req)
        if (!refreshToken) return res.status(200).json({
            err: 1,
            msg: req.cookies
        })

        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if (err) {
                return res.status(200).json({
                    err: 1,
                })
            }

            console.log(user)
            // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            //create new access token, refresh token and send to user
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            // refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({
                err: 0,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
    },

    registerUser: async (req, res) => {
        try {
            const checkUser = await db.User.findOne({
                where: { email: req.body.email },
                raw: true
            })

            console.log(checkUser)
            if (checkUser) return res.status(404).json('User has been registered')

            const newUser = await db.User.create({
                email: req.body.email,
                name: req.body.name,
                password: authController.hashPassword(req.body.password),
                isAdmin: false,
            })

            const accessToken = authController.generateAccessToken(newUser)
            const refreshToken = authController.generateRefreshToken(newUser)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                samSite: "strict"
            })

            // console.log(newUser)
            return res.status(200).json({err:0, newUser, accessToken, refreshToken })
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await db.User.findOne({
                where: { email: req.body.email },
                raw: true
            })

            if (!user) {
                return res.status(404).json("Incorrect username")
            }

            const validPassword = bcrypt.compareSync(req.body.password, user.password)

            if (!validPassword) {
                return res.status(404).json("Incorrect password")
            }

            const accessToken = authController.generateAccessToken(user)
            const refreshToken = authController.generateRefreshToken(user)

            await res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                samSite: "strict"
            })

            return res.status(200).json({err:0, user, accessToken, refreshToken })

        } catch (err) {
            return res.status(500).json(err)
        }
    },

    logOutUser: async (req, res) => {
        res.clearCookie('refreshToken')
        res.status(200).json({err:0, msg:"Logged out successfully"})
    },

}

export default authController