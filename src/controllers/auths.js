const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.json({
          error: err,
        });
      }
      const { name, email, phone } = req.body;
      let user = new Users({
        name,
        email,
        phone,
        isAdmin: false,
        password: hashedPass,
      });
      user
        .save()
        .then((response) => {
          res.json({
            message: "User Added Successfully!",
          });
        })
        .catch((error) => {
          res.status(400).json({ message: "User Added Unsuccessfully!" });
        });
    });
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const login = (req, res, next) => {
  try {
    var username = req.body.username;
    var password = req.body.password;
    Users.findOne({ $or: [{ email: username }, { phone: username }] }).then(
      (user) => {
        if (user) {
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
              res.json({
                error: err,
              });
            }
            if (result) {
              let token = jwt.sign({ name: user.name }, "secretValue", {
                expiresIn: "1h",
              });
              res.json({
                message: "Login Successfully!",
                token,
                userId: user._id,
                userName: user.name,
                isAdmin: user.isAdmin,
              });
            } else {
              res.status(400).json({ message: "Password does not matched!" });
            }
          });
        } else {
          res.status(400).json({ message: "No user found!" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const getUserById = (req, res, next) => {
  try {
    const userId = req.params.id
    Users.findById(userId)
      .then(response => {
        res.json({
          response
        })
      })
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!'
    })
  }
}

const editInfo = (req, res, next) => {
  try {
    let userId = req.params.id;
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    Users.findByIdAndUpdate(userId, req.body, {
      useFindAndModify: false,
    }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Product was not found!`,
        });
      } else res.send({ message: "Updated product successfully." });
    });
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

module.exports = {
  register,
  login,
  getUserById,
  editInfo
};
