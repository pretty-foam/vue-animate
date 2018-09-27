//图片加载处理
const picture = (el, binding, callback) => {
    setTimeout(() => {
        const img = new Image()
        const url = binding.value || '' //图片路径
        const host = window.location.origin || 'http://' + window.location.host //baseUrl
        img.src = host + '/' + url
        img.onerror = () => {
            if (callback) {
                callback()
            }
        }
        img.onload = () => {
            el.src = host + '/' + url
            //回调处理多余逻辑
            if (callback) {
                callback()
            }
        }
    }, 700)
}

//函数防抖
const debounce = (func, wait) => {
    let timer = null
    return function () {
        const that = arguments.callee
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(that)
        }, wait)
    }
}


//判断图片是否可见
const see =(el,binding)=>{
    const top = el.getBoundingClientRect().top //滚动距离
    const wh = window.innerHeight //内容视口高度（ ie8以上兼容）
    //判读滚动距离是否小于内容视口高，小于执行图片加载函数，大于则添加scroll事件监听
    if (top < wh) {
        picture(el, binding)
    } else {
        //添加监听，加载完图片则移除事件
        window.addEventListener('scroll', debounce((that) => {
            const top = el.getBoundingClientRect().top  //距离
            if (top < wh) {
                picture(el, binding, () => {
                    window.removeEventListener('scroll', that)
                })
            }
        }, 300)
        )
    }   
}


module.exports = {
    install(Vue) {
        Vue.directive('src', {
            // 当被绑定的元素插入到 DOM 中时激活
            inserted(el, binding) {
               see(el,binding)
            }
        })
    }
}