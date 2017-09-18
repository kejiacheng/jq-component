$(document).mousedown(function (e) {
    var
        target =    $(e.target).hasClass('ke-selected-box')
                        ? $(e.target)
                        : $(e.target).parent().hasClass('ke-selected-box')
                            ?   $(e.target).parent()
                            :   null

    if (target) {
        $('.ke-selected-box').not(target).find('.ke-select-down-arrow').removeClass('ke-select-down-arrow-active')
        $('.ke-select-item-wrapper').not(target.next()).slideUp('fast')
        return false
    }else{
        if (!$(e.target).hasClass('ke-select-item')) {
            $('.ke-select-down-arrow').removeClass('ke-select-down-arrow-active')
            $('.ke-select-item-wrapper').slideUp('fast')
        }
    }
})

function keSelect (opts) {
    if (opts.target instanceof jQuery) {

    }else{
        throw('请添加jQuery对象！')
    }
    var
        that = this

    this.target = opts.target
    this.data = opts.data || []
    this.defaultSelected = opts.defaultSelected || (this.data[0] ? this.data[0].value : '')
    this.wrapperClick = opts.wrapperClick || function () {}
    this.cb = opts.cb || function () {}

    function renderBaseHtml() {
        var
            str = ''

        str +=  '<div class="ke-selected-box">'+
                    '<span class="ke-selected-text"></span>'+
                    '<span class="ke-select-down-arrow"></span>'+
                '</div>'+
                '<div class="ke-select-item-wrapper">'+
                '</div>'

        that.target.html(str)

        that.target.find('.ke-selected-box').unbind('click').click(function (e) {
            that.wrapperClick()
            $(this).next().slideDown('fast')

            $(this).find('.ke-select-down-arrow').addClass('ke-select-down-arrow-active')
            e.stopPropagation()
        })
    }

    this.renderOption = function(target, data, defaultSelected, cb) {
        var
            str = '',
            selectedItem = '',
            dropDownOptions = ''

        for (var i = 0; i < data.length; i++) {
            if (data[i].value === defaultSelected) {
                target.find('.ke-selected-box').attr('data-value', data[i].value)
                target.find('.ke-selected-text').text(data[i].text)

                dropDownOptions +=  '<div class="ke-select-item ke-selected-item" data-value="'+ data[i].value +'">'+
                                    data[i].text+
                                '</div>'
            }else{
                dropDownOptions +=  '<div class="ke-select-item" data-value="'+ data[i].value +'">'+
                                    data[i].text+
                                '</div>'
            }
        }

        str = dropDownOptions

        target.find('.ke-select-item-wrapper').html(str)

        target.find('.ke-select-item').unbind('click').click(function (e) {
            var
                value = $(this).data('value'),
                text = $(this).text()
            target.find('.ke-selected-box').attr('data-value', value)
                .find('.ke-select-down-arrow').removeClass('ke-select-down-arrow-active')
            target.find('.ke-selected-text').text(text)
            target.find('.ke-selected-item').removeClass('ke-selected-item')
            $(this).addClass('ke-selected-item')

            $('.ke-select-item-wrapper').slideUp('fast')
            cb(value, text, $(this).index())
        })
    }

    renderBaseHtml()
    this.renderOption(this.target, this.data, this.defaultSelected, this.cb)
}

keSelect.prototype.reload = function (opts) {
    this.renderOption(opts.target, opts.data, opts.defaultSelected, opts.cb)
}