function kePseudoPaging (opts) {
    if (opts.target instanceof jQuery) {

    }else{
        throw('请添加jQuery对象！')
    }
    /*
        属性
        target              JQ DOM
        hashPageName        url上对应的hash值
        totalCount          数据数量
        pageCount           每页展示的数据
        offs                页码偏移量
        cb                  回调函数(唯一参数：当前页)
    */
    this.target = opts.target
    this.hashPageName = opts.hashPageName
    this.totalCount = opts.totalCount || 0
    this.pageCount = opts.pageCount || 10
    this.offs = opts.offs || 4
    this.cb = opts.cb || function () {}

    this.pageNum = Math.ceil(this.totalCount / this.pageCount)
    this.hash = window.location.hash
    this.reg = new RegExp("[#&]" + this.hashPageName + "=(\\d*)")
    this.currentPage = this.hash.match(this.reg) ? +this.hash.match(this.reg)[1] : 1

    function renderPseudoPaging (currentPage, pageNum, offs, that) {
        var
            str = '',
            firstPage = currentPage - offs > 1 ? currentPage - offs : 1,
            lastPage = currentPage + offs < pageNum ? currentPage + offs : pageNum

        str +=  '<div class="pseudoPaging-wrapper">'+
                    '<span class="'+ (currentPage == 1 ? 'pseudoPaging-disable ' : '') +'pseudoPaging-first-page">首页</span>'+
                    '<span class="'+ (currentPage == 1 ? 'pseudoPaging-disable ' : '') +'pseudoPaging-prev-page">上一页</span>'

        if (currentPage - offs > 1) {
            str +=  '<i class="pseudoPaging-front-emit">...</i>'
        }

        for (var i = firstPage; i <= lastPage; i++) {
            str +=  '<span class="'+ (currentPage == i ? 'pseudoPaging-currentPage ' : '') +'pseudoPaging-page">'+ i +'</span>'
        }

        if (currentPage + offs < pageNum) {
            str +=  '<i class="pseudoPaging-later-emit">...</i>'
        }

        str +=      '<span class="'+ (currentPage == pageNum ? 'pseudoPaging-disable ' : '') +'pseudoPaging-next-page">下一页</span>'+
                    '<span class="'+ (currentPage == pageNum ? 'pseudoPaging-disable ' : '') +'pseudoPaging-last-page">尾页</span>'

        str +=  '</div>'

        that.target.html(str)

        if (currentPage > 1) {
            that.target.find('.pseudoPaging-first-page').unbind('click').click(function () {
                that.currentPage = 1
                changeHash(that)
                that.cb(that.currentPage)
                renderPseudoPaging(1, that.pageNum, that.offs, that)
            })

            that.target.find('.pseudoPaging-prev-page').unbind('click').click(function () {
                that.currentPage -= 1
                changeHash(that)
                that.cb(that.currentPage)
                renderPseudoPaging(that.currentPage, that.pageNum, that.offs, that)
            })
        }else{
            that.target.find('.pseudoPaging-first-page').unbind('click')
            that.target.find('.pseudoPaging-prev-page').unbind('click')
        }

        if (that.currentPage < that.pageNum) {
            that.target.find('.pseudoPaging-next-page').unbind('click').click(function () {
                that.currentPage += 1
                changeHash(that)
                that.cb(that.currentPage)
                renderPseudoPaging(that.currentPage, that.pageNum, that.offs, that)
            })

            that.target.find('.pseudoPaging-last-page').unbind('click').click(function () {
                that.currentPage = that.pageNum
                changeHash(that)
                that.cb(that.currentPage)
                renderPseudoPaging(that.pageNum, that.pageNum, that.offs, that)
            })
        }else{
            that.target.find('.pseudoPaging-next-page').unbind('click')
            that.target.find('.pseudoPaging-last-page').unbind('click')
        }

        that.target.find('.pseudoPaging-page').unbind('click').click(function () {
            that.currentPage = +$(this).html()
            changeHash(that)
            that.cb(that.currentPage)
            renderPseudoPaging(that.currentPage, that.pageNum, that.offs, that)
        })
    }


    function changeHash(that) {
        var
            hash = window.location.hash,
            reg1 = new RegExp("#" + that.hashPageName + "=(\\d*)"),
            reg2 = new RegExp("&" + that.hashPageName + "=(\\d*)")

        if (hash === '') {
            hash = that.hashPageName + '=' +  that.currentPage
        }else{
            if (hash.match(that.reg)) {
                hash = hash.replace(reg1, '#' + that.hashPageName + '=' + that.currentPage)
                hash = hash.replace(reg2, '&' + that.hashPageName + '=' + that.currentPage)
            }else{
                hash = hash + '&' + that.hashPageName + '=' + that.currentPage
            }
        }

        window.location.hash = hash
    }
    renderPseudoPaging(this.currentPage, this.pageNum, this.offs, this)
}