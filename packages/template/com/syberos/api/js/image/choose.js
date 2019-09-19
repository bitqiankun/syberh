/* eslint-disable no-undef */

/***
 * image.Choose(Object)
 */
function Choose () {
  var defaultOpts = {
    id: 'image',
    module: 'image',
    page: true,
    methods: ['choose'],
    source: '../qml/SEditGridViewPage.qml'
  }
  SyberPlugin.call(this, defaultOpts)

  var that = this

    this.on('choose', function (object, handlerId, param) {
        var component = object || that.object

        component.maxSelectCount = that.param.count || 9

        // 用户点击确定按钮
        component.confirm.connect(function(arr) {
            var newArr = []
            var lstModel = component.model
            arr.forEach(function(item) {
                console.log('----lstModel-url-', lstModel.get(item).url)
                newArr.push({
                    path: lstModel.get(item).url + '',
                    size: lstModel.get(item).fileSize
                })
            })
            console.log('newArr---', JSON.stringify(newArr))

            WEBVIEWCORE.trigger('success', that.handlerId, newArr)
            // 注销qml组件
            SYBEROS.destroy(defaultOpts.id)
        })

        // 用户点击取消按钮
        component.cancel.connect(function() {
            console.log('监听到---取消按钮')
            WEBVIEWCORE.trigger('success', that.handlerId)
            // 注销qml组件
            SYBEROS.destroy(defaultOpts.id)
        })

    })
}

Choose.prototype = SyberPlugin.prototype