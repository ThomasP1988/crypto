class Converter {
    static weiToEther(value) {
        return value / Math.pow(10, 18);
    }
}

module.exports = Converter;