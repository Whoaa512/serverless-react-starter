function _log(...args) {
    console.log(...args) // eslint-disable-line
}

export default {
    error(...args) {
        _log(...['[error]:', ...args])
    },
    warn(...args) {
        _log(...['[warn]:', ...args])
    },
    info(...args) {
        _log(...['[info]:', ...args])
    },
    debug(...args) {
        _log(...['[debug]:', ...args])
    },
    trace(...args) {
        _log(...['[trace]:', ...args])
    },
}
