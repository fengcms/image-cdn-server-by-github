(function(t){function e(e){for(var r,a,s=e[0],u=e[1],c=e[2],l=0,f=[];l<s.length;l++)a=s[l],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&f.push(i[a][0]),i[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);p&&p(e);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,a=1;a<n.length;a++){var u=n[a];0!==i[u]&&(r=!1)}r&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},i={app:0},o=[];function a(t){return s.p+"js/"+({about:"about"}[t]||t)+"."+{about:"b85880d1"}[t]+".js"}function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n=i[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,r){n=i[t]=[e,r]}));e.push(n[2]=r);var o,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=a(t);var c=new Error;o=function(e){u.onerror=u.onload=null,clearTimeout(l);var n=i[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+r+": "+o+")",c.name="ChunkLoadError",c.type=r,c.request=o,n[1](c)}i[t]=void 0}};var l=setTimeout((function(){o({type:"timeout",target:u})}),12e4);u.onerror=u.onload=o,document.head.appendChild(u)}return Promise.all(e)},s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/h5/",s.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var p=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"21bb":function(t,e,n){"use strict";var r=n("2dad"),i=n.n(r);i.a},"2dad":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("router-view",{attrs:{id:"app"}})},o=[],a=n("2877"),s={},u=Object(a["a"])(s,i,o,!1,null,null,null),c=u.exports,l=(n("d3b7"),n("8c4f")),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"upload"},[n("div",{staticClass:"title"},[n("i",{staticClass:"el-icon-picture-outline"}),n("h3",[t._v("Upload image list")]),n("el-button",{staticClass:"btn",attrs:{size:"mini",type:"warning"},on:{click:t.clearImageList}},[t._v("清空")])],1),n("div",{staticClass:"image-list"},[t.imageList.length?n("ul",t._l(t.imageList,(function(e,r){return n("li",{key:r,class:"image-list-item-"+r},[n("i",[n("img",{attrs:{src:t.imageCdnPre+e.path}})]),n("div",{staticClass:"btns"},[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.copyPath("gitee",e.path,r)}}},[t._v("gitee 地址")]),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.copyPath("github",e.path,r)}}},[t._v("github 地址")]),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.copyPath("no",e.path,r)}}},[t._v("无前缀地址")])],1)])})),0):n("div",{staticClass:"image-list-nothing"},[t._v("No Image")])]),n("el-upload",{attrs:{drag:"",action:t.api,"on-success":t.success,"before-upload":t.before,"on-error":t.onError,"show-file-list":!1}},[n("i",{staticClass:"el-icon-upload"}),n("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),n("em",[t._v("点击上传")])])])],1)},f=[],d=(n("b0c0"),n("b311")),m=n.n(d),g={name:"Home",data:function(){return{api:"/upload",loading:!1,imageCdnPre:"https://gitee.com/fungleo/my-article-image/raw/master",imageList:[]}},methods:{before:function(){this.loading=!0},success:function(t){this.imageList.push(t),this.closeLoading()},onError:function(){this.closeLoading(),this.$message.error("上传图片失败")},closeLoading:function(){this.loading=!1},clearImageList:function(){this.imageList=[]},copyPath:function(t,e,n){var r=this,i={gitee:{name:"GitEE",pre:"https://gitee.com/fungleo/my-article-image/raw/master"},github:{name:"GitHub",pre:"https://raw.githubusercontent.com/fengcms/my-article-image/master"},no:{name:"无前缀",pre:""}},o=new m.a(".image-list-item-".concat(n),{text:function(){return i[t].pre+e}});o.on("success",(function(e){r.$message("已复制 ".concat(i[t].name," URL 至剪切板")),o.destroy()})),o.on("error",(function(e){r.$message("复制 ".concat(i[t].name," URL 失败")),o.destroy()}))}}},h=g,b=(n("21bb"),Object(a["a"])(h,p,f,!1,null,null,null)),v=b.exports;r["default"].use(l["a"]);var y=[{path:"/",name:"Home",component:v},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],w=new l["a"]({base:"/h5/",routes:y}),_=w,P=n("5c96"),L=n.n(P);n("0fae");r["default"].use(L.a),r["default"].config.productionTip=!1,new r["default"]({router:_,render:function(t){return t(c)}}).$mount("#app")}});
//# sourceMappingURL=app.784fccfb.js.map