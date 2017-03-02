function _log(...args) {
    console.log(...args)
}

module.exports = {
    trace(...args) {
        _log(...['[TRACE]:', ...args])
    },
    debug(...args) {
        _log(...['[DEBUG]:', ...args])
    },
    info(...args) {
        _log(...['[INFO]:', ...args])
    },
    warn(...args) {
        _log(...['[WARN]:', ...args])
    },
    error(...args) {
        _log(...['[ERROR]:', ...args])
    },
}
