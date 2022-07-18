const client = require("./client")

module.exports = {
    ...require("./users"),
    ...require("./genres"),
    ...require("./posts"),
}