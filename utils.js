/**
 * parse one url query, return a object
 * @param {String} query url query str
 */
const parseUrlQuery = (query) => {
    const paramsArr = query.split('&')
    const reg = /^.*\=.*$/
    const obj = {}
    paramsArr.forEach(current => {
        if (reg.test(current)) {
            const [key, val] = current.split('=')
            obj[key] = val
        }
    })

    return obj
}

module.exports = {
    parseUrlQuery
}