
const CustomerSchema = require("../Models/user.model");
const bcrypt = require('bcrypt');
const userRouter = require('express').Router();

userRouter.post("/add_customer", async (request, response) => {

    const { email, f_Name, l_Name, password, gender, phone } = request.body
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new CustomerSchema;
    user.f_Name = f_Name;
    user.l_Name = l_Name;
    user.email = email;
    user.password = hashedPassword;
    user.gender = gender;
    user.phone = phone;

    const loginUser = await CustomerSchema.findOne({ email })

    if (loginUser) {
        response.status(200).send({ message: "User email already exists" })
    }
    else {
        user.save().then((data) => {
            response.status(200).send({ message: "User Register successfully", data: data })
        })
            .catch((err) => {
                response.status(400).send({ message: err.message })
            })
    }
})

userRouter.get("/customer_list", async (req, res) => {
    try {
        const allUsers = await CustomerSchema.aggregate([
            {
                $group:
                {
                    _id: "$_id",
                    firstName: { "$first": "$f_Name" },
                    lastName: { "$first": "$l_Name" },
                    phone: { "$first": "$phone" },
                    email: { "$first": "$email" },
                    gender: { "$first": "$gender" },
                    accountType: {"$first": "$accountType"},
                    updatedAt: { "$first": "$updatedAt" },
                    status: { "$first": "$status" }
                }
            }
        ]).sort({ updatedAt: -1 })
        res.status(200).send({
            message: 'Customer list get successfully!',
            data: allUsers,
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

})

userRouter.get('/:id', async (req, res) => {
    try {
        const getByUser = await CustomerSchema.findById({ _id: req.params.id })
        res.status(200).send({
            status: 'User get by id successfully',
            data: getByUser
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

userRouter.put('/edit_customer/:id', async (req, res) => {
    
    try {
        const updateresult = await CustomerSchema.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        // console.log(updateresult)
        res.status(200).send({
            message: 'Customer updated successfully',
            data: updateresult,
        })
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }

})


/********common login router****** */
userRouter.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body

        const loginUser = await CustomerSchema.findOne({ email })
        const passwordMatch = await bcrypt.compare(password, loginUser.password);

        if (loginUser) {
            if (!passwordMatch) {
                res.send({ status: 401, message: "password is incorrect!" })
            }
            else {
                res.send({ status: 200, message: "Login successfully!", data: loginUser })
            }
        }
        else {
            res.send({ status: 400, message: "Invalid user login!" })
        }
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

})


module.exports = userRouter;