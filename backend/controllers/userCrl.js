const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");

const addUser = async (req, res) => {
  const {
    user: { type: requesterType },
  } = req;
  if (requesterType === "Student") {
    throw new NotAllowedError("You're not authorized access ");
  }
  const user = await User.create(req.body);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "shyanne10@ethereal.email", // generated ethereal user
      pass: "h2hQrCfQxuUwPqxned", // generated ethereal password
    },
  });

  const msg = {
    from: '"Imasha Kuruppu👻" <kuruppu@example.com>', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: "User Registration ✔", // Subject line
    text: `Click below link to login to the system. your password:${req.body.password} `, // plain text body
    html: `<button>Login</button>`, // html body
  };

  // send mail with defined transport object
  const info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.status(StatusCodes.CREATED).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    type: user.type,
  });
};

const getUser = async (req, res) => {
  const {
    query: { sid: userId, name: userName, email: email },
    user: { type: requesterType },
  } = req;

  console.log(email, userId, userName);

  const user = await User.findOne({
    $or: [{ firstName: userName }, { sid: userId }, { email: email }],
  });

  console.log(user);

  if (!user) {
    throw new NotFoundError(`No user found`);
  } else {
    if (requesterType === "Student") {
      throw new NotAllowedError("You're not authorized access ");
    }
  }

  res.status(StatusCodes.OK).json({
    _id: user._id,
    name: user.firstName,
    email: user.email,
    type: user.type,
  });
};

module.exports = { addUser, getUser };
