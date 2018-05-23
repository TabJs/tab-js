/**
 * tabHandle tab的默认点击事件，控制content的显示
 * @param style {json} css样式
 * @return {viod}
 * @author cheng_xiaona 2018/5/21 14:09:15
 **/
function defaultHandle() {
  let _this = this;
  return function(e) {
    let tag = e.target;
    if (tag.getAttribute('data-tab')) {
      let i = tag.getAttribute('data-tab');
      let className = _this.activedClass;
      _this.initElements();
      _this.activedId = i;
      tag.className+= ' ' + className;
      (_this.contents[i]) && (showEle(_this.contents[i]))
    }
  }
}
function showEle(ele) {
  let style = ele.getAttribute('style');
  if(style) {
    style = '{"' + style.replace(/\s+/g, '').replace(';', '","').replace(':', '":"').replace(/","$/, '') + '"}';
    style = JSON.parse(style);
    delete style.display;
    style = JSON.stringify(style);
    style = style.slice(1, style.length-1).replace(',', ';').replace(/"+/g, '');
    ele.setAttribute('style', style);
    ele.className+= ' active'
  }
}
/**
* tabs
* @proto tabs {HTMLElemnt} tab集合
* @proto contents {HTMLElemnt} 被tab控制的内容集合
* @proto clickHandles {Array}tabs点击事件的集合
* @proto initElements 初始化tabs以及contents
* @proto removeHandle {fn} tabs删除点击事件
* @proto addHandle {fn}tabs增加点击事件
* @proto init {fn}初始化
* @return {object} this
* @author cheng_xiaona 2018/5/22 14:13:05
* @example
* import tabjs from '~/plugins/tab.js'
* let ele = document.querySelector('#test');// e支持原生的选择器也支持vue的ref选择器
* let tabs = new tabjs(ele);
* tabs.init();
**/
export default class tabs{
  constructor(ele) {
    this.parentEle = ele;
    this.clickHandles = [];
    return this;
  };
  initElements() {
    let tabs = this.tabs,
        contents = this.contents;
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(this.activedClass, '').replace(/\s+$/,'').replace(/\s+/g, ' ');
      tabs[i].setAttribute('data-tab', i);
      (contents[i]) && (contents[i].style.display = 'none', contents[i].className = contents[i].className.replace('active','').replace(/\s+$/,'').replace(/\s+/g, ' '));
    }
    return this;
  };
  addHandle(fn) {
    this.clickHandles.push(fn.call(this));
    this.parentEle.addEventListener('click', this.clickHandles[this.clickHandles.length - 1], false);
    return this;
  };
  removeHandle(i) {
    /**
    * 删除tabs的事件
    * @param i {number} 被删除事件对应在clickHandles中的下标
    * @return {Object} tabs
    * @author cheng_xiaona 2018/5/22 14:14:06
    * @example
    * this.clickHandles = [()=>{alert(1)}];
    * removeHandle(0)
    *   //点击tabs上没有了alert(1),但是clickHandles不变
    **/
    this.removeEventListener('click', this.clickHandles[i], false);
    return this;
  };
  init(setting) {
    const parent = this.parentEle;
    let _setting = {
      content: 'content',
      tab: 'tab'
    };
    if(setting) for(let i in setting) _setting[i] = setting[i];
    this.tabs = parent.getElementsByClassName(_setting.tab);
    this.contents = parent.getElementsByClassName(_setting.content);
    if(this.tabs.length == 0 || this.contents.length == 0) {
      (this.tabs.length == 0) && (console.error('tabs未定义'));
      (this.contents.length == 0) && (console.error('contents未定义'));
      return this;
    }
    (this.tabs.length == 0 || this.contents.length == 0) && (console.error('tabs的长度和contents的长度不一致'));
    this.initElements();
    let i = this.activedId;
    this.tabs[i].className+= ' ' + this.activedClass;
    showEle(this.contents[i]);
    this.addHandle(defaultHandle);
    return this;
  };
  set activedId(x) {
    this._activedId = x;
  };
  get activedId() {
    return this._activedId || 0;
  };
  set activedClass(x) {
    this._activedClass = x
  };
  get activedClass() {
    return this._activedClass || 'active'
  }
}
