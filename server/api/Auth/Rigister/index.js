const UserModel = require('../model');


const Register = async (req, res) => {
    const { body: { username, password, phone, email } } = req;
    try {
        await UserModel.insertMany({
            username,
            password,
            phone,
            email,
            identity: 1
        });
    } catch (error) {
        res.status(200).json({
            code: 1,
            message: error,
        });
    }
    res.status(200).json({
        code: 0,
        message: 'success',
    });

}

module.exports = Register;