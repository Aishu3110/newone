module.exports = function() {

    this.getPayloadFromToken = function(token) {
        var data = {}
        return new Promise(function(resolve) {
            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (err) {
                    data.error = "true"
                    data.data = "null"
                    resolve(data)
                } else {
                    data.error = "false"
                    data.data = payload
                    resolve(data)
                }
            })
        })
    }
}