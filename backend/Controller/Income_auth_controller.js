module.exports = function() {
    require('../service/Income_auth_service')()
    this.apiincomeServicesAuthCtrl = (request) => {
        return new Promise(function(resolve) {
            try {
                var headers = request.headers
                var role = headers.role
                var auth = request.params.auth
                if (role === 'user') {
                    this.Incomeauthservice(auth, (result) => {
                        var response = {}
                        if (result.error == 'true') {
                            response.error = "true"
                            response.msg = result.msg
                        } else {
                            response.error = "false"
                            response.msg = result.msg
                            response.data = result.data
                        }
                        resolve(response)
                    })
                } else {
                    var response = {}
                    response.error = "true"
                    response.msg = 'UNAUTHORIZED'
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.msg = 'OOPS'
                resolve(err)
            }
        })
    }
}