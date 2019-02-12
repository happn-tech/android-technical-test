const utils = {
    sendError: function (res, error, code) {
        res.status(code).send(
            { error: error }
        )
    },
    missingParameters: function (res, parameters, code) {
        this.sendError(res, `Missing parameters ${parameters}`, 400)
    }
}

module.exports = utils