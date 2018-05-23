# tab-js
A tab plugin whith es6

## tabJs 的属性与方法说明

属性/方法 | 类型 | 描述 
---|---|---
contents | Array(HTMLElemnts) | 被tab控制的content集合
tabs | Array(HTMLElemnts) | tab相关元素的集合
clickHandles | Arrang | tabs点击事件的集合
initElements | Function | 初始化tabs和contents样式的方法
removeHandle | Function | 删除tabs某个事件的方法
addHandle | Function | 为tabs点击事件新增一个方法
init | Function | tabJs 初始化

## tabJs实例
[在vue中的用法](https://github.com/TabJs/tab-js/blob/master/src/vue/tabJs.vue)

```
import tabjs from '~/plugins/tab.js'
let ele = document.querySelector('#test');//tabs和congtents的父级，支持原生的选择器也支持vue的ref选择器
let tabs = new tabjs(ele);
tabs.init()
let handle = function() {
    return () => alert('我是新增的方法，在clickHandles的下标为1')
};
tabs.addHandle(handle);//为tab增加一个点击事件handle
tabs.removeHandle(1)//删除tab的上的handle事件
```



