function _throw(msg) {
    throw new Error(msg);
}
const Assert = {
    /**
     * Assert o is not undefined
     * @param {any} o
     * @param {string} msg
     */
    isDefined(o, msg = '') {
        if (o === undefined)
            _throw(msg);
    },
    /**
     * Assert o is undefined
     * @param {any} o
     * @param {string} msg
     */
    isUndefined(o, msg = '') {
        if (o !== undefined)
            _throw(msg);
    },
    /**
     * Assert o is true
     * @param {boolean} o
     * @param {string} msg
     */
    isTrue(o, msg = '') {
        if (o !== true)
            _throw(msg);
    },
    /**
     * Assert o is false
     * @param {boolean} o
     * @param {string} msg
     */
    isFalse(o, msg = '') {
        if (o !== false)
            _throw(msg);
    }
};
export default Assert;
