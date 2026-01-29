// exports.allowRoles = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Access denied",
//             });
//         }
//         next();
//     };
// };
// Example: only allow one role
const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.sendStatus(403);
        }
        next();
    };
};

module.exports = roleMiddleware;

