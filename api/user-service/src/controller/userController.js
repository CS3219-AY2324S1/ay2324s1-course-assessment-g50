const db = require('../db/mysql/mysql')
const { DEFAULT_NICK, DEFAULT_BIRTH, DEFAULT_SIGN, DEFAULT_GENDER, DEFAULT_AVATOR } = require('../db/constant/userConstant')
const { uploadImageToServer } = require('../utils/imageUploadUtil')

// DB models
const sequelize = db.sequelize
const User = db.user
const UserInfo = db.userInfo

// For password encryption/decryption.
const MD5Util = require('../utils/MD5Util')
const JsonResponse = require('../common/jsonResponse')

// --------------------------------------- Service logic -------------------------------------------

// Register as a new User
async function addUser(req, res) {
    const { email, password } = req.body

    // check if email already exists in DB
    const dbUser = await User.findOne({ where: { email: email } }).catch(err => {
        return JsonResponse.fail(500, 'Internal error, failed to get user from db').send(res)
    })
    if (dbUser) {
        return JsonResponse.fail(400, 'User already registered, please change email').send(res)
    }

    // Encrypt Password
    const now = new Date()
    const salt = String(now.getTime())
    let rawPassword = password;
    // try {
    //     rawPassword = RSAUtil.decrypt(password);
    // } catch (e) {
    //     return JsonResponse.fail(400, e.message).send(res)
    // }
    const md5Password = MD5Util.sign(rawPassword, salt, "utf8")

    // Create user and default user info in DB.
    let user, userinfo
    sequelize.transaction(async (t) => {
        user = {
            email: email,
            password: md5Password,
            salt: salt,
            role: 'user'
        }
        const createUser = await User.create(user)
        userinfo = {
            userId: createUser.id,
            nickname: DEFAULT_NICK,
            birth: DEFAULT_BIRTH,
            sign: DEFAULT_SIGN,
            gender: DEFAULT_GENDER,
            avatar: DEFAULT_AVATOR,
        }
        await UserInfo.create(userinfo)
    }).then(() => {
        console.log('Transaction has been committed successfully')
        return JsonResponse.success(201, 'User registration successful').send(res)
    }).catch((error) => {
        console.error('Transaction failed, rolled back', error)
        return JsonResponse.fail(500, 'User registration failed').send(res)
    })
}

// login
async function login(req, res) {
    const { email, password } = req.body

    // Find user in DB:
    const dbUser = await User.findOne({ where: { email: email } }).catch(error => {
        return JsonResponse.fail(500, `Failed to query user profile with email=${email}`).send(res)
    })
    if (!dbUser) {
        return JsonResponse.fail(400, `This user does not exists`).send(res)
    }

    // Validate Password:
    let rawPassword = password;
    const salt = dbUser.salt
    // try {
    //     rawPassword = RSAUtil.decrypt(password)
    // } catch (error) {
    //     return JsonResponse.fail(500, error.message).send(res)
    // }
    const md5Password = MD5Util.sign(rawPassword, salt, 'utf8')
    const dbPassword = dbUser.password
    if (md5Password != dbPassword) {
        return JsonResponse.fail(401, `Password does not match. Please check your email or password.`).send(res)
    }

    // Generate user token and user role:
    const userId = dbUser.id
    const userRole = dbUser.role;
    try {
        req.session.userId = userId;
        req.session.userRole = userRole;
        req.session.email = email;
        req.session.passwordLength = rawPassword.length;
        return JsonResponse.success(200, { userRole }).send(res);
    } catch (error) {
        return JsonResponse.fail(500, 'Failed to login').send(res)
    }
}

async function logout(req, res) {
    /* destroys the session in mongodb which basically clears the current user */
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return JsonResponse.fail(500, err).send(res)
        } else {
            return JsonResponse.success(200, 'Logout is sucessful').send(res);
        }
    })
}

// View current user profile
async function getUserById(req, res) {
    const id = req.session.userId;
    // Get user by id
    const userInfo = await UserInfo.findOne({ where: { userId: id } }).catch(err => {
        return JsonResponse.fail(500, 'Internal error, failed to get user from db').send(res)
    })
    if (userInfo) {
        userInfo.dataValues["email"] = req.session.email;
        userInfo.dataValues["passwordLength"] = req.session.passwordLength;
        return JsonResponse.success(200, userInfo).send(res)
    }
    return JsonResponse.fail(404, 'User not found').send(res)
}

// View users profile by filter
async function getUsers(req, res) {
    // Get filtered info:
    const { nickname } = req.query
    // Get target users by nickname
    const userInfos = await UserInfo.findOne({
        where: {
            nickname: {
                [sequelize.Op.like]: nickname
            }
        }
    }).catch(err => {
        return JsonResponse.fail(500, 'Internal error, failed to get users from db').send(res)
    })
    if (userInfos) {
        return JsonResponse.success(200, userInfos).send(res)
    }
    return JsonResponse.fail(404, 'User not found').send(res)
}

// Update current user email or password
async function updateUser(req, res) {
    const id = req.session.userId;
    let newPassword = req.body.password;
    let newEmail = req.body.email;

    let salt;
    let md5Password;
    if (newPassword) {
        //getting the salt
        const dbUser = await User.findOne({ where: { id: id } }).catch(err => {
            return JsonResponse.fail(500, 'Internal error, failed to get user from db').send(res);
        })
        salt = dbUser.salt;
        md5Password = MD5Util.sign(newPassword, salt, 'utf8');
        req.body.password = md5Password;
    }

    await User.update(req.body, { where: { id: id } }).then((num) => {
        if (num == 0) {
            throw new Error("User not found")
        }
        // Retrieving new password and email  
        req.session.email = newEmail === undefined ? req.session.email : newEmail;
        req.session.passwordLength = newPassword === undefined
            ? req.session.passwordLength
            : newPassword.length;
        return JsonResponse.success(201, "User updated successfully").send(res)
    }).catch(err => {
        return JsonResponse.fail(500, 'Failed to update user').send(res)
    })
}

// Update current user profile
async function updateUserInfo(req, res) {
    const id = req.session.userId;

    await UserInfo.update(req.body, { where: { id: id } }).then((num) => {
        if (num == 0) {
            throw new Error("User not found")
        }
        return JsonResponse.success(201, "User info updated successfully").send(res)
    }).catch(err => {
        return JsonResponse.fail(500, 'Failed to update user info').send(res)
    })
}

// Deregister current user from platform
async function deleteUserById(req, res) {
    const id = req.session.userId;

    sequelize.transaction(async (t) => {
        const user = await User.destroy({ where: { id: id } })
        if (user == 0) {
            throw new Error("User not found")
        }
        await UserInfo.destroy({ where: { id: id } })
    }).then(() => {
        console.log('Transaction has been committed successfully')
        return JsonResponse.success(204, "User deregister successfully").send(res)
    }).catch((error) => {
        console.error('Transaction failed, rolled back', error)
        return JsonResponse.fail(500, 'Internal error, transaction failed').send(res)
    })
}

// Edit user's avator by uploading image to cloud
async function updateUserAvatar(req, res) {
    const id = req.session.userId
    // 1. Upload image to cloudinary and get URL
    let imageUrl = ""
    try {
        const dbUser = await UserInfo.findOne({ where: { id: id } }).catch(err => {
            return JsonResponse.fail(500, 'Internal error, failed to get user from db').send(res);
        })
        const prevImgUrl = dbUser.avatar
        imageUrl = await uploadImageToServer(req, prevImgUrl)
    } catch(err) {
        return JsonResponse.fail(500, 'Failed to upload image to server').send(res)
    }

    // 2. Update user info in DB:
    console.log("Image upload successful, link: ", imageUrl)
    await UserInfo.update({ avatar: imageUrl }, { where: { id: id } }).then((num) => {
        if (num == 0) {
            throw new Error("User not found")
        }
        return JsonResponse.success(201, "User info updated successfully").send(res)
    }).catch(err => {
        return JsonResponse.fail(500, 'Failed to update user info').send(res)
    })
}

module.exports = { addUser, login, logout, getUserById, getUsers, updateUser, updateUserInfo, updateUserAvatar: updateUserAvatar, deleteUserById }