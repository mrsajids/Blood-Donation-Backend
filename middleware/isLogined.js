
function isLogined(req, res, next) {
    if (req.headers['authorization'])
        next()
    else
        res.status(404).json({
            message: "Forbidden"
        })
}

module.exports = isLogined;
