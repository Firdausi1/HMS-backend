const Accountant = require("../models/accountant.model");
const bcrypt = require("bcryptjs");

const getAccountant = (req, res) => {
    if (req.query.username) {
        Accountant.find({username: req.query.username},{password: 0, __v: 0})
    .then((resp) => {
      res.send({
        type: "success",
        status_code: 200,
        data: { id:resp._id, firstName: resp.firstName, lastName: resp.lastName, email: resp.email, username: resp.username, phoneNo: resp.phoneNo, address: resp.address }
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
} else{
    Accountant.find({}, {password: 0, __v: 0})
    .then((resp) => {
      res.send({
        type: "success",
        status_code: 200,
        data: resp.map(accountant => ({
          id: accountant._id,
          firstName: accountant.firstName,
          lastName: accountant.lastName,
          email: accountant.email,
          username: accountant.username,
          phoneNo: accountant.phoneNo,
          address: accountant.address
        }))
      });
    })
    .catch((err) => {
        console.log(err.message);
      });
}
};

const getSingleAccountant = async (req, res) => {
    try {
        const id = req.params.id;
        const my_accountant = await Accountant.findById(id);
        res.send({
            type: "success",
            status_code: 200,
            data: my_accountant,
        });
}catch (err) {
    res.send({ type: "error", message: "could not get single Accountant", error:err.message});
}
};

const AccountantRegister = async (req, res) => {
    try {
        const find_accountant = await Accountant.findOne({email: req.body.email});
        if (find_accountant) {
            res.send({ type: "error", status_code: 401, message: "Accountant Already Exists" });
            return;
        }
        const encrypt_password = await bcrypt.hash(req.body.password, 12)
        const accountant = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            phoneNo: req.body.phoneNo,
            password: encrypt_password,
            address: req.body.address
        };
        const create_accountant = new Accountant(accountant);
        const resp = await create_accountant.save();
        res.send({
            type: "success",
            status_code: 201,
            data: { id:resp._id, firstName: resp.firstName, lastName: resp.lastName, email: resp.email, username: resp.username, phoneNo: resp.phoneNo, address: resp.address }
        })
    }catch (err) {
        res.send({ type: "error", message: "could not create Accountant", error:err.message});
    }
};

const loginAccountant = async(req, res) => {
    try{
        const accountant_email = req.body.email;
        const accountant_password = req.body.password;
        if(accountant_email && accountant_password) {
            const find_accountant = await Accountant.findOne({email: accountant_email});
            if(!find_accountant){
                res.send({ type: "error", message: "Accountant Not Found"});
                return;
            }
            const find_password = await bcrypt.compare(accountant_password, find_accountant.password);
            if(!find_password){
                res.send({ type: "error", message: "Invalid email or Password"});
                return;
                }
                res.send({
                    type: "success",
                    message: "Accountant Login Successful",
                    data: {id: find_doctor._id, firstName: find_doctor.firstName, email: find_doctor.email},
                })
        } else{
            res.send({ type: "error", message: "Invalid Credentials"});
        }
}catch (err) {
    res.send({ type: "error", message: "Could not Login Accountant", error:err.message});
}
};  

const deleteAccountant = async (req, res) => {
    try{
        const id = req.params.id;
        await Accountant.findByIdAndDelete(id);
        res.send({
            type: "success",
            status_code: 200,
            message: "Accountant Deleted Successfully",
        });
}catch (err) {
    res.send({ type: "error", message: "Could not delete Accountant", error:err.message});
}
};

const updateAccountant = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone, address } = req.body;
    const updatedAccountant = await Accountant.findByIdAndUpdate(id, { name, email, phone, address }, { new: true });
    res.send({ type: "success", status_code: 200, data: updatedAccountant });
}



module.exports = {getAccountant, getSingleAccountant, AccountantRegister, loginAccountant, deleteAccountant, updateAccountant};
