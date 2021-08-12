function isEmptyObject(object) {

    for (var key in object) {
        return false;
    }
    return true;
}

module.exports = isEmptyObject;