// const User = require("../models/user.model");

// exports.register = asyncHandler(async (req, res) => {
//   res.status(200).json({
//     success: true,
//     user: req.body,
//   });
// });
// exports.findUser = (req, res) => {
//     const user = req.params.user
//   User.findByUser(req.params.pass, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `${req.params.pass}PASS buruuu`,
//         });
//       } else {
//         res.status(500).send({
//           message:
//             +req.params.id + "id-тай харилцагчийг олж авахад алдаа гарлаа",
//         });
//       }
//     } else res.send(data);
//   });
// };
