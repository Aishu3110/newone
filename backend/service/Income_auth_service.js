module.exports = function() {
    var authrespository = require('../repository/Income_auth_respository')
    

    this.Incomeauthservice = async (auth, callback) => {
        var response = {}
        try {
            var authrepository = new authrespository()
            var incomeInfo = await authrepository.addIncomeData(auth)
            if (incomeInfo.error == 'true') {
                response.error = "true"
                response.msg = 'UNAUTHORIZED'
            } else {
                response.error = "false"
                response.msg = 'VALID'
                response.data = incomeInfo.result
            }
            callback(response)
        } catch (err) {
            err.error = "true"
            err.msg = message.OOPS_user_auth_service
            callback(err)
        }
    }
}