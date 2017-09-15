function keSelect (opts) {
    if (opts.target instanceof jQuery) {

    }else{
        throw('请添加jQuery对象！')
    }

    this.target = opts.target
    this.data = opts.data || []
    this.cb = opts.cb || function () {}


}

keSelect.prototype.reload = function () {
    console.log(123456)
}