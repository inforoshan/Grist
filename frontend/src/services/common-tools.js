class CommonTools {

    numberFormat(value) {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR'
        }).format(value);
    }
}

export default new CommonTools();