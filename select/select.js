function keSelect (opts) {
    if (opts.target instanceof jQuery) {

    }else{
        throw('请添加jQuery对象！')
    }

    this.target = opts.target
    this.data = opts.data || []
    this.defaultSelected = opts.defaultSelected || (this.data[0] ? this.data[0].value : '')
    this.wrapperClick = opts.wrapperClick || function () {}
    this.cb = opts.cb || function () {}

    function renderSelect(target, data, defaultSelected, that) {
        var
            str = '',
            selectedItem = '',
            dropDownBox = '<div class="ke-item-wrapper">'

        for (var i = 0; i < data.length; i++) {
            if (data[i].value === defaultSelected) {
                selectedItem =  '<div class="ke-selected-box" data-value="'+ data[i].value +'">'+
                                    '<span class="ke-selected-text">'+ data[i].text +'</span>'+
                                    '<span class="down-arrow"></span>'+
                                '</div>'

                dropDownBox +=  '<div class="ke-item ke-selected-item" data-value="'+ data[i].value +'">'+
                                    data[i].text+
                                '</div>'
            }else{
                dropDownBox +=  '<div class="ke-item" data-value="'+ data[i].value +'">'+
                                    data[i].text+
                                '</div>'
            }
        }

        dropDownBox += '</div>'
        str = selectedItem + dropDownBox

        target.html(str)

        $('.ke-selected-box').click(function () {

        })
    }

    renderSelect(this.target, this.data, this.defaultSelected, this)
}

keSelect.prototype.reload = function () {
    console.log(this.defaultSelected)
    console.log(123456)
}