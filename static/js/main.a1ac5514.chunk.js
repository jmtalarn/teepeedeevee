(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{168:function(e){e.exports=[{name:"Bebidas",parent:null},{name:"Bebidas calientes",parent:"Bebidas"},{name:"Refrescos",parent:"Bebidas"},{name:"Cervezas",parent:"Bebidas"},{name:"Sandwhiches",parent:null},{name:"Bocadillos fr\xedos",parent:"Sandwhiches"},{name:"Bocadillos Calientes",parent:"Sandwhiches"},{name:"Platos",parent:null},{name:"Platos combinados",parent:"Platos"},{name:"Tapas",parent:"Platos"},{name:"Raciones",parent:"Platos"}]},169:function(e){e.exports=[{code:"100100101",fav:!1,name:"Coca-Cola",category:"Refrescos",price:"150",stock:0},{code:"100100102",fav:!1,name:"Fanta naranja",category:"Refrescos",price:"150",stock:0},{code:"100100103",fav:!1,name:"Fanta lim\xf3n",category:"Refrescos",price:"150",stock:0},{code:"100200101",fav:!1,name:"Caf\xe9",category:"Bebidas calientes",price:"100",stock:0},{code:"100200102",fav:!1,name:"Cortado",category:"Bebidas calientes",price:"100",stock:0},{code:"100200103",fav:!1,name:"Caf\xe9 con leche",category:"Bebidas calientes",price:"110",stock:0},{code:"100300101",fav:!1,name:"Damm 1/3",category:"Cervezas",price:"200",stock:0},{code:"100300102",fav:!1,name:"Voll Damm 1/3",category:"Cervezas",price:"200",stock:0},{code:"100300103",fav:!1,name:"Damm 1/5",category:"Cervezas",price:"150",stock:0},{code:"100300104",fav:!1,name:"Voll Damm 1/5",category:"Cervezas",price:"150",stock:0},{code:"100400101",fav:!1,name:"Bikini",category:"Bocadillos Calientes",price:"200",stock:0},{code:"100400102",fav:!1,name:"Lomo queso",category:"Bocadillos Calientes",price:"250",stock:0},{code:"100500101",fav:!1,name:"Jam\xf3n",category:"Bocadillos fr\xedos",price:"250",stock:0},{code:"100500102",fav:!1,name:"Queso",category:"Bocadillos fr\xedos",price:"250",stock:0},{code:"100600101",fav:!1,name:"Longaniza, patatas, huevo",category:"Platos combinados",price:"350",stock:0},{code:"100600102",fav:!1,name:"Hamburguesa, patatas, huevo",category:"Platos combinados",price:"350",stock:0},{code:"100600103",fav:!1,name:"Mexicano - arroz, chile, frijoles, burrito",category:"Platos combinados",price:"400",stock:0},{code:"100700101",fav:!1,name:"Bravas",category:"Tapas",price:"300",stock:0},{code:"100700102",fav:!1,name:"Croquetas",category:"Tapas",price:"300",stock:0},{code:"100700103",fav:!1,name:"Patatas fritas",category:"Tapas",price:"200",stock:0},{code:"100800101",fav:!1,name:"Callos",category:"Raciones",price:"300",stock:0},{code:"100800102",fav:!1,name:"Arr\xf2s, col i fes\xf2ls",category:"Raciones",price:"400",stock:0}]},172:function(e,t){},175:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},188:function(e){e.exports={app:{title:"TeePeeDeeVee"},order:{order:"Order #{value}",people:"People #{value}",nothingordered:"Nothing ordered yet"}}},192:function(e,t,n){e.exports=n(375)},224:function(e,t){},230:function(e,t){},375:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(14),o=n.n(c),i=n(17),l=n(39),u=n(16),s={order:[],locale:"en",categories:n(168),products:n(169)},d="ORDER_ADD_PRODUCT",m="ORDER_REMOVE_UNIT",f="ORDER_REMOVE_PRODUCT",p="SWITCH_LOCALE",g="CATEGORY_PARENT_UPDATE",h="CATEGORY_NAME_UPDATE",v="CATEGORY_REMOVE",b="CATEGORY_CREATE",y="PRODUCT_UPDATE",E="PRODUCT_REMOVE";var O=Object(l.combineReducers)({order:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.order,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case d:var n=t.product,a=e.find(function(e){return e.product.code===n.code});return a?a.quantity++:(a={product:n,quantity:1},e.push(a)),Object(u.a)(e);case m:var r=t.product,c=e.findIndex(function(e){return e.product.code===r.code});return e[c].quantity>1?e[c].quantity--:e.splice(c,1),Object(u.a)(e);case f:var o=t.product,i=e.findIndex(function(e){return e.product.code===o.code});return e.splice(i,1),Object(u.a)(e);default:return e}},locale:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.locale,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case p:return t.locale;default:return e}},categories:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.categories,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g:var n=t.payload,a=n.categoryName,r=n.parent;return Object(u.a)(e.map(function(e){return e.name===a&&(e.parent=r),e}));case h:var c=t.payload,o=c.oldName,i=c.newName;return Object(u.a)(e.map(function(e){return e.name===o&&(e.name=i),e.parent===o&&(e.parent=i),e}));case v:var l=t.payload.category;return e.map(function(e){return e.parent===l.name&&(e.parent=l.parent),e}).reduce(function(e,t){return t.name!==l.name&&e.push(t),e},[]);case b:return[{name:t.payload.category,parent:null}].concat(Object(u.a)(e));default:return e}},products:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.products,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h:var n=t.payload,a=n.oldName,r=n.newName;return Object(u.a)(e.map(function(e){return e.category===a&&(e.category=r),e}));case v:var c=t.payload.category;return Object(u.a)(e.map(function(e){return e.parent===c.name&&(e.parent=c.parent),e}));case y:var o=t.payload,i=o.code,l=o.product;return Object(u.a)(e.map(function(e){return e.code===i?l:e}));case E:var d=t.payload.product;return Object(u.a)(e.filter(function(e){return e.code!==d.code}));default:return e}}}),j=n(170),k=n(171),C=(n(201),Object(k.createLogger)());var x=n(3),w=n(5),P=n(40),M=n(49),N={darkBlack:"#000000",blueAction:"blue",black:"#393939",grey:"#3A3A3A",lightgrey:"#E1E1E1",offWhite:"#EDEDED",padding:"5px",boxShadow:"2px 2px 4px #393939",yellowPaper:"rgba(255, 221, 0, 0.46)",touchableLineHeight:"48px",darkeningBackground:"rgba(0,0,0,0.2)"},_=n(4);function D(){var e=Object(_.a)(['\n    html {\n        box-sizing: border-box;\n        font-size: 10px;\n        \n    }\n    *, *:before, *:after {\n        box-sizing: inherit;\n    }\n    body {\n        padding: 0;\n        margin: 0;\n        font-size: 2rem;\n        line-height: 2.5rem;\n        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n    }\n\n    code {\n        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",monospace;\n    }\n  ']);return D=function(){return e},e}var F=Object(x.b)(D()),T=n(175),R=n.n(T);function z(){var e=Object(_.a)(["\n  ul {\n    list-style: none;\n    display: flex;\n    flex-direction: row;\n    margin: 0 0 0 auto;\n\n    li a {\n      color: ",";\n      text-decoration: none;\n      margin: 0 1rem;\n      font-weight: bold;\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n  }\n"]);return z=function(){return e},e}var S=x.c.nav(z(),function(e){return e.theme.offWhite}),B=function(){return r.a.createElement(S,null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(P.b,{to:"/"},r.a.createElement(w.a,{id:"menu.pos",defaultMessage:"POS"}))),r.a.createElement("li",null,r.a.createElement(P.b,{to:"/warehouse"},r.a.createElement(w.a,{id:"menu.warehouse",defaultMessage:"Warehouse"})))))},A=n(84),U=n(64);function L(){var e=Object(_.a)(["\n  width: 10rem;\n  margin-left: 1rem;\n  font-size: 1rem;\n"]);return L=function(){return e},e}function V(){var e=Object(_.a)(["\n  display: flex;\n  align-items: center;\n  margin: 0 3rem 0 auto;\n  color: ",";\n  font-size: 1.5rem;\n  font-weight: 300;\n"]);return V=function(){return e},e}var I=[{value:"en",label:"English"},{value:"es",label:"Espa\xf1ol"},{value:"fr",label:"Fran\xe7ais"}],W=x.c.div(V(),function(e){return e.theme.offWhite}),q=Object(x.c)(U.a)(L()),H={option:function(e,t){return Object(A.a)({},e,{color:N.black})}},X=Object(i.b)(function(e,t){return{locale:e.locale}},function(e){return{switchLocale:function(t){e(function(e){return{type:p,locale:e}}(t))}}})(function(e){return r.a.createElement(W,null,r.a.createElement(w.a,{id:"language.language",defaultMessage:"Language"}),r.a.createElement(q,{styles:H,options:I,getOptionLabel:function(e){return e.label},getOptionValue:function(e){return e.value},isSearchable:!1,value:I.filter(function(t){return t.value===e.locale}),onChange:function(t,n){e.switchLocale(t.value)}}))});function G(){var e=Object(_.a)(["\n  background-color: ",";\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  align-items: center;\n  justify-content: start;\n  color: ",";\n  box-shadow: 0px 0px 3px ",";\n"]);return G=function(){return e},e}function Y(){var e=Object(_.a)(["\n  animation: "," infinite 20s linear;\n  height: 6rem;\n  pointer-events: none;\n"]);return Y=function(){return e},e}function J(){var e=Object(_.a)(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"]);return J=function(){return e},e}var Q=Object(x.d)(J()),$=x.c.img(Y(),Q),K=x.c.header(G(),function(e){return e.theme.black},function(e){return e.theme.offWhite},function(e){return e.theme.darkBlack}),Z=function(e){return r.a.createElement(K,null,r.a.createElement($,{src:R.a,className:"App-logo",alt:"logo"}),r.a.createElement("h1",null,r.a.createElement(w.a,{id:"app.title",defaultMessage:"TeePeeDeeVee"})),r.a.createElement(B,null),r.a.createElement(X,null))};function ee(){var e=Object(_.a)(["\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  grid-gap: 0.5rem;\n  padding: ",";\n  border: 1px dotted red;\n"]);return ee=function(){return e},e}var te=x.c.div(ee(),function(e){return e.theme.padding}),ne=n(21),ae=n(22),re=n(24),ce=n(23),oe=n(25),ie=n(177),le=n.n(ie);function ue(e){return{type:d,product:e}}function se(){var e=Object(_.a)(["\n  &:first-child {\n    margin: 1rem 0;\n  }\n  color: ",";\n\n  font-size: 2rem;\n  line-height: ",";\n  font-weight: 200;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n"]);return se=function(){return e},e}function de(){var e=Object(_.a)(["\n  display: grid;\n"]);return de=function(){return e},e}function me(){var e=Object(_.a)(["\n  position: relative;\n"]);return me=function(){return e},e}function fe(){var e=Object(_.a)(["\n  border: 1px dotted red;\n"]);return fe=function(){return e},e}function pe(){var e=Object(_.a)(["\n  padding: ",";\n  border: 1px dotted red;\n"]);return pe=function(){return e},e}var ge=x.c.div(pe(),function(e){return e.theme.padding}),he=x.c.div(fe()),ve=Object(x.c)(le.a)(me()),be=x.c.div(de()),ye=x.c.button(se(),function(e){return e.theme.black},function(e){return e.theme.touchableLineHeight}),Ee=function(e){function t(e){var n;return Object(ne.a)(this,t),(n=Object(re.a)(this,Object(ce.a)(t).call(this,e))).state={parent:null,categories:e.categories.filter(function(e){return null===e.parent}),products:e.products.filter(function(e){return null===e.category})},n}return Object(oe.a)(t,e),Object(ae.a)(t,[{key:"filterCategory",value:function(e){this.setState({parent:e,categories:this.props.categories.filter(function(t){return t.parent===e}),products:this.props.products.filter(function(t){return t.category===e})})}},{key:"render",value:function(){var e=this;return r.a.createElement(be,null,r.a.createElement(ye,{onClick:function(){var t=e.props.categories.find(function(t){return t.name===e.state.parent});e.filterCategory(t?t.parent:null)},disabled:null===this.state.parent},r.a.createElement("span",null,"<"),r.a.createElement("span",null,this.state.parent)),this.state.categories.map(function(t){return r.a.createElement(ye,{key:t.name,onClick:function(){e.filterCategory(t.name)}},r.a.createElement("span",null,t.name),r.a.createElement("span",null,">"))}),this.state.products.map(function(t){return r.a.createElement(ye,{key:t.code,onClick:function(){e.props.addProduct(t)}},t.name,r.a.createElement("span",null,"\xb7"))}))}}]),t}(r.a.Component),Oe=Object(i.b)(function(e,t){return Object.assign({},e)},function(e){return{addProduct:function(t){e(ue(t))}}})(Ee),je=function(e){function t(e){var n;return Object(ne.a)(this,t),(n=Object(re.a)(this,Object(ce.a)(t).call(this,e))).state={value:""},n}return Object(oe.a)(t,e),Object(ae.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.intl,a=t.products;return console.log(a),r.a.createElement(ve,{options:this.props.products,getOptionLabel:function(e){return e.name},maxHeight:2,allowCreateWhileLoading:!1,formatCreateLabel:function(e){return n.formatMessage({id:"search.addToOrder",defaultMessage:"Add {value} to order"},{value:e})},getNewOptionData:function(e,t){return{code:e,name:t}},value:this.state.value,onChange:function(t,n){e.props.addProduct(t),e.setState({value:""})}})}}]),t}(r.a.Component),ke=Object(i.b)(function(e,t){return{order:e.order,products:e.products}},function(e){return{addProduct:function(t){e(ue(t))}}})(Object(w.d)(je)),Ce=function(e){return r.a.createElement(ge,null,r.a.createElement(he,null,r.a.createElement(ke,null)),r.a.createElement(he,null,r.a.createElement(Oe,null)))};function xe(){var e=Object(_.a)([""]);return xe=function(){return e},e}function we(){var e=Object(_.a)([""]);return we=function(){return e},e}function Pe(){var e=Object(_.a)(['\n  margin: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 1rem;\n  font-family: "courier", "monospace";\n  font-weight: 200;\n']);return Pe=function(){return e},e}function Me(){var e=Object(_.a)(["\n  display: grid;\n  align-items: center;\n  grid-template-columns: 1fr 10rem 6rem;\n  padding: ",";\n  padding-left: 1rem;\n  font-weight: 100;\n  &:hover {\n    background-color: ",";\n  }\n  label {\n  }\n"]);return Me=function(){return e},e}function Ne(){var e=Object(_.a)(["\n  cursor: pointer;\n  width: 3rem;\n  justify-self: end;\n"]);return Ne=function(){return e},e}function _e(){var e=Object(_.a)(["\n  cursor: pointer;\n  &:hover {\n    background-color: ",";\n  }\n"]);return _e=function(){return e},e}function De(){var e=Object(_.a)(["\n  margin: 0 1rem;\n"]);return De=function(){return e},e}function Fe(){var e=Object(_.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n"]);return Fe=function(){return e},e}function Te(){var e=Object(_.a)(["\n  width: 100%;\n  text-align: center;\n  font-style: italic;\n"]);return Te=function(){return e},e}function Re(){var e=Object(_.a)(["\n  background-color: ",";\n  margin: 1rem;\n  min-height: 4rem;\n  line-height: ",";\n  position: relative;\n  box-shadow: ",';\n\n  font-weight: 100;\n  clip-path: polygon(\n    calc(100% - 16px) 0,\n    calc(100% + 10px) calc(16px + 10px),\n    calc(100% + 10px) calc(100% + 10px),\n    0 calc(100% + 10px),\n    -10px -10px\n  );\n\n  &:before {\n    content: "";\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-width: 0 16px 16px 0;\n    border-style: solid;\n    border-color: rgba(0, 0, 0, 0.2) white;\n    box-shadow: ',";\n  }\n"]);return Re=function(){return e},e}var ze=x.c.div(Re(),function(e){return e.theme.yellowPaper},function(e){return e.theme.touchableLineHeight},function(e){return e.theme.boxShadow},function(e){return e.theme.boxShadow}),Se=x.c.div(Te()),Be=x.c.div(Fe()),Ae=x.c.span(De()),Ue=x.c.button(_e(),function(e){return e.theme.darkeningBackground}),Le=Object(x.c)(Ue)(Ne()),Ve=x.c.div(Me(),function(e){return e.theme.padding},function(e){return e.theme.darkeningBackground}),Ie=x.c.h5(Pe()),We=x.c.div(we()),qe=x.c.div(xe()),He=function(e){return r.a.createElement(Be,null,r.a.createElement(Ue,{onClick:function(){return e.removeUnitProduct(e.product)}},"-"),r.a.createElement(Ae,null,e.quantity),r.a.createElement(Ue,{onClick:function(){return e.addProduct(e.product)}},"+"))},Xe=function(e){function t(){return Object(ne.a)(this,t),Object(re.a)(this,Object(ce.a)(t).apply(this,arguments))}return Object(oe.a)(t,e),Object(ae.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(ze,null,r.a.createElement(Ie,null,r.a.createElement(We,null,r.a.createElement(w.a,{id:"order.order",defaultMessage:"Order #{value}",values:{value:100}})),r.a.createElement(qe,null,r.a.createElement(w.a,{id:"order.people",defaultMessage:"People #{value}",values:{value:1}}))),this.props.order.length?this.props.order.map(function(t,n){return r.a.createElement(Ve,{key:n},r.a.createElement("label",null,t.product.name),r.a.createElement(He,{removeUnitProduct:e.props.removeUnitProduct,removeProduct:e.props.removeProduct,addProduct:e.props.addProduct,product:t.product,quantity:t.quantity}),r.a.createElement(Le,{onClick:function(){e.props.removeProduct(t.product)}},"X"))}):r.a.createElement(Se,null,r.a.createElement(w.a,{id:"order.nothingordered",defaultMessage:"Nothing ordered yet"})))}}]),t}(r.a.Component),Ge=Object(i.b)(function(e,t){return Object.assign({},e)},function(e){return{addProduct:function(t){e(ue(t))},removeUnitProduct:function(t){e(function(e){return{type:m,product:e}}(t))},removeProduct:function(t){e(function(e){return{type:f,product:e}}(t))}}})(Xe),Ye=function(){return r.a.createElement(te,null,r.a.createElement(Ce,null),r.a.createElement(Ge,null))},Je=n(65);function Qe(){var e=Object(_.a)(["\n  border-top-width: 0px;\n  border-left-width: 0px;\n  border-right-width: 0px;\n  padding: 0.5rem;\n  font-size: 2rem;\n  font-weight: 100;\n"]);return Qe=function(){return e},e}var $e=x.c.input(Qe()),Ke=function(e){function t(e){var n;return Object(ne.a)(this,t),(n=Object(re.a)(this,Object(ce.a)(t).call(this,e))).state={value:e.value,typing:!1,typingTimeout:0},e.lazy?n.handleChange=n.handleChangeLazy.bind(Object(Je.a)(n)):n.handleChange=n.handleChangeImmediate.bind(Object(Je.a)(n)),n}return Object(oe.a)(t,e),Object(ae.a)(t,[{key:"handleChangeImmediate",value:function(e){this.setState(Object.assign({},this.state,{value:e.target.value})),this.props.onChange(e)}},{key:"handleChangeLazy",value:function(e){var t=this;this.state.typingTimeout&&clearTimeout(this.state.typingTimeout),this.setState({value:e.target.value,typingTimeout:setTimeout(function(){t.props.onChange({target:{value:t.state.value}})},this.props.timeout||500)})}},{key:"render",value:function(){var e=Object(A.a)({},this.props);return e.value=this.state.value,e.onChange=this.handleChange,r.a.createElement($e,e)}}]),t}(r.a.Component),Ze=n(189);var et=n(184),tt=n.n(et);function nt(){var e=Object(_.a)(["\n  padding: 1rem 4.5rem;\n"]);return nt=function(){return e},e}function at(){var e=Object(_.a)(["\n  ","\n\n  .rstcustom__rowTitle {\n    font-weight: 100;\n  }\n"]);return at=function(){return e},e}function rt(){var e=Object(_.a)(["\n  border-top-width: 0px;\n  border-left-width: 0px;\n  border-right-width: 0px;\n  padding: 0.5rem;\n  font-size: 2rem;\n  font-weight: 100;\n"]);return rt=function(){return e},e}var ct=Object(x.c)(Ke)(rt()),ot=x.c.div(at(),""),it=x.c.div(nt()),lt=function(e){function t(e){var n;return Object(ne.a)(this,t),(n=Object(re.a)(this,Object(ce.a)(t).call(this,e))).state={name:""},n}return Object(oe.a)(t,e),Object(ae.a)(t,[{key:"createCategory",value:function(){this.props.createCategory(this.state.name),this.setState({name:""})}},{key:"render",value:function(){var e=this,t=this.props.intl.formatMessage({id:"category.createPlaceholder",defaultMessage:"Category name ..."});return r.a.createElement(it,null,r.a.createElement(ct,{value:this.state.name,placeholder:t,onChange:function(t){e.setState({name:t.target.value})}}),r.a.createElement("button",{onClick:function(){e.createCategory()},disabled:!this.state.name.length},r.a.createElement(w.a,{id:"category.create",defaultMessage:"Create"})))}}]),t}(r.a.Component),ut=Object(w.d)(lt),st=function(e){function t(e){var n;return Object(ne.a)(this,t),(n=Object(re.a)(this,Object(ce.a)(t).call(this,e))).state={treeData:[]},n}return Object(oe.a)(t,e),Object(ae.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(ot,null,r.a.createElement("h2",null,r.a.createElement(w.a,{id:"category.management",defaultMessage:"Category management"})),r.a.createElement(ut,{createCategory:this.props.createCategory}),r.a.createElement("div",{style:{height:400}},r.a.createElement(Ze.a,{treeData:this.state.treeData,theme:tt.a,generateNodeProps:function(t){return{buttons:[r.a.createElement("button",{onClick:function(){return e.props.removeCategory(t.node)}},r.a.createElement(w.a,{id:"category.delete",defaultMessage:"Delete"}))]}},onMoveNode:function(t){var n=t.node,a=t.nextParentNode;e.props.updateParentCategory(n.name,a?a.name:null)},onChange:function(t){return e.setState({treeData:t})}})))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{treeData:e.categories.filter(function(e){return null===e.parent}).map(function(t){return function t(n){return{title:r.a.createElement(ct,{value:n.name,onChange:function(t){e.updateCategoryName(n.name,t.target.value)}}),name:n.name,parent:n.parent,subtitle:"",expanded:!0,children:e.categories.filter(function(e){return e.parent===n.name}).map(function(e){return t(e)})}}(t)})}}}]),t}(r.a.Component),dt=Object(i.b)(function(e,t){return Object.assign({},{categories:e.categories})},function(e){return{updateParentCategory:function(t,n){e(function(e,t){return{type:g,payload:{categoryName:e,parent:t}}}(t,n))},updateCategoryName:function(t,n){e(function(e,t){return{type:h,payload:{oldName:e,newName:t}}}(t,n))},removeCategory:function(t){e(function(e){return{type:v,payload:{category:e}}}(t))},createCategory:function(t){e({type:b,payload:{category:t}})}}})(st);function mt(){var e=Object(_.a)(["\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  padding: 1rem;\n  h5 {\n    margin: 0;\n  }\n"]);return mt=function(){return e},e}function ft(){var e=Object(_.a)(["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-gap: 1rem;\n  height: auto;\n  max-height: ",";\n  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n  * {\n    visibility: ",";\n  }\n"]);return ft=function(){return e},e}function pt(){var e=Object(_.a)(["\n  margin-left: auto;\n"]);return pt=function(){return e},e}function gt(){var e=Object(_.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  margin: 2rem 0 1rem;\n"]);return gt=function(){return e},e}function ht(){var e=Object(_.a)(["\n  padding: 0.5rem;\n  border: 1px dotted;\n  &:not(:first-child) {\n    margin-left: 1rem;\n  }\n  border-radius: 4px;\n"]);return ht=function(){return e},e}function vt(){var e=Object(_.a)(["\n  width: 100%;\n"]);return vt=function(){return e},e}function bt(){var e=Object(_.a)(["\n  font-size: 1rem;\n  font-weight: bold;\n"]);return bt=function(){return e},e}function yt(){var e=Object(_.a)(["\n  margin-top: 5rem;\n\n  @media screen and (min-width: 650px) {\n    div {\n      label {\n        display: none;\n      }\n    }\n    > div:first-of-type label {\n      display: block;\n      position: absolute;\n      top: -3rem;\n      font-size: 1.2rem;\n    }\n  }\n"]);return yt=function(){return e},e}function Et(){var e=Object(_.a)(['\n  position: relative;\n  display: grid;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  padding: 1rem;\n  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n  &:hover {\n    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);\n  }\n  grid-template-areas: "code category name name name name fav price price stock";\n\n  @media screen and (max-width: 650px) {\n    grid-template-areas: "code category name name name name" "fav price price price stock stock";\n  }\n\n  > div {\n    padding: 0 1rem;\n  }\n\n  .code {\n    grid-area: code;\n    input,\n    > div {\n      min-width: 8rem;\n    }\n  }\n  .category {\n    input {\n      font-weight: 100;\n    }\n    grid-area: category;\n    min-width: 20rem;\n  }\n  .name {\n    grid-area: name;\n  }\n  .fav {\n    grid-area: fav;\n  }\n  .price {\n    grid-area: price;\n  }\n  .stock {\n    grid-area: stock;\n  }\n  .numeric {\n    text-align: right;\n  }\n']);return Et=function(){return e},e}function Ot(){var e=Object(_.a)(["\n  font-weight: 100;\n  padding: 1rem;\n"]);return Ot=function(){return e},e}var jt=x.c.div(Ot()),kt=x.c.div(Et()),Ct=x.c.div(yt()),xt=x.c.label(bt()),wt=Object(x.c)(Ke)(vt()),Pt=x.c.span(ht()),Mt=x.c.div(gt()),Nt=x.c.button(pt()),_t=x.c.div(ft(),function(e){return e.toggled?"100rem":0},function(e){return e.toggled?"visible":"hidden"}),Dt=x.c.div(mt()),Ft=function(e){function t(e){var n;return Object(ne.a)(this,t),(n=Object(re.a)(this,Object(ce.a)(t).call(this,e))).state={products:e.products,filter:{code:"",name:"",category:null,fav:!1,toggled:!1}},n}return Object(oe.a)(t,e),Object(ae.a)(t,[{key:"toggleFilter",value:function(){var e=Object.assign({},this.state.filter,{toggled:!this.state.filter.toggled});this.setState(Object.assign({},this.state,{filter:e}))}},{key:"clearFilter",value:function(){this.setState(Object.assign({},this.state,{products:this.props.products},{filter:{code:"",name:"",category:null,fav:!1,toggled:!1}}))}},{key:"renderAppliedFilters",value:function(){var e=this,t=[this.state.filter.code?r.a.createElement(Pt,{key:"code"},r.a.createElement(w.a,{id:"product.code",defaultMessage:"Code"}),":",this.state.filter.code):null,this.state.filter.name?r.a.createElement(Pt,{key:"name"},r.a.createElement(w.a,{id:"product.name",defaultMessage:"Name"}),":",this.state.filter.name):null,this.state.filter.category?r.a.createElement(Pt,{key:"category"},r.a.createElement(w.a,{id:"product.category",defaultMessage:"Category"}),":"," ",this.state.filter.category.name):null,this.state.filter.fav?r.a.createElement(Pt,{key:"fav"},r.a.createElement(w.a,{id:"product.fav",defaultMessage:"Fav"})):null].filter(function(e){return null!==e});return r.a.createElement(Mt,null,r.a.createElement("div",null,t),t.length>0?r.a.createElement(Nt,{onClick:function(){return e.clearFilter()}},r.a.createElement(w.a,{id:"product.clearAllFilters",defaultMessage:"Clear filters"})):null)}},{key:"setFilter",value:function(e){var n=Object.assign({},this.state.filter,e),a=t.filteredProducts(this.props.products,n);this.setState(Object.assign({},{products:a},{filter:n}))}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Dt,null,r.a.createElement("div",null,r.a.createElement(w.a,{id:"product.filter",defaultMessage:"Product filter"}),r.a.createElement("button",{onClick:function(){return e.toggleFilter()}},r.a.createElement(w.a,{id:"product.toggleFilters",defaultMessage:"Toggle filters"}))),r.a.createElement(_t,{toggled:this.state.filter.toggled},r.a.createElement("div",{className:"code"},r.a.createElement(xt,{htmlFor:"code_filter"},r.a.createElement(w.a,{id:"product.code",defaultMessage:"Code"})),r.a.createElement(wt,{id:"code_filter",size:10,value:this.state.filter.code,onChange:function(t){e.setFilter({code:t.target.value})}})),r.a.createElement("div",{className:"category"},r.a.createElement(xt,{htmlFor:"category_filter"},r.a.createElement(w.a,{id:"product.category",defaultMessage:"Category"})),r.a.createElement(U.a,{id:"category_filter",options:this.props.categories,getOptionLabel:function(e){return e.name},value:this.state.filter.category,onChange:function(t,n){e.setFilter({category:t})}})),r.a.createElement("div",{className:"name"},r.a.createElement(xt,{htmlFor:"name_filter"},r.a.createElement(w.a,{id:"product.name",defaultMessage:"Name"})),r.a.createElement(wt,{id:"name_filter",size:50,value:this.state.filter.name,onChange:function(t){e.setFilter({name:t.target.value})}})),r.a.createElement("div",{className:"fav"},r.a.createElement(xt,{htmlFor:"fav_filter"},r.a.createElement(w.a,{id:"product.fav",defaultMessage:"Fav"})),r.a.createElement(wt,{id:"fav_filter",type:"checkbox",checked:this.state.filter.fav,onChange:function(t){e.setFilter({fav:t.target.checked})}}))),this.renderAppliedFilters()),r.a.createElement(Ct,null,this.state.products.length>0?this.state.products.map(function(t,n){return r.a.createElement(kt,{key:"datatablerow_".concat(n)},r.a.createElement("div",{className:"code"},r.a.createElement(xt,{htmlFor:"code"},r.a.createElement(w.a,{id:"product.code",defaultMessage:"Code"})),r.a.createElement(wt,{id:"code",size:10,defaultValue:t.code,onChange:function(n){return e.props.productUpdate(t.code,Object.assign({},t,{code:n.target.value}))}})),r.a.createElement("div",{className:"category"},r.a.createElement(xt,{htmlFor:"category"},r.a.createElement(w.a,{id:"product.category",defaultMessage:"Category"})),r.a.createElement(U.a,{id:"category",options:e.props.categories,getOptionLabel:function(e){return e.name},value:e.props.categories.find(function(e){return e.name===t.category}),onChange:function(n,a){console.log(n,Object.assign({},t,{category:n.name})),e.props.productUpdate(t.code,Object.assign({},t,{category:n.name}))}})),r.a.createElement("div",{className:"name"},r.a.createElement(xt,{htmlFor:"name"},r.a.createElement(w.a,{id:"product.name",defaultMessage:"Name"})),r.a.createElement(wt,{id:"name",size:50,defaultValue:t.name,lazy:!0,onChange:function(n){return e.props.productUpdate(t.code,Object.assign({},t,{name:n.target.value}))}})),r.a.createElement("div",{className:"fav"},r.a.createElement(xt,{htmlFor:"fav"},r.a.createElement(w.a,{id:"product.fav",defaultMessage:"Fav"})),r.a.createElement(wt,{id:"fav",type:"checkbox",checked:t.fav,onChange:function(n){return e.props.productUpdate(t.code,Object.assign({},t,{fav:n.target.checked}))}})),r.a.createElement("div",{className:"price"},r.a.createElement(xt,{htmlFor:"price"},r.a.createElement(w.a,{id:"product.price",defaultMessage:"Price"})),r.a.createElement(wt,{id:"price",type:"number",className:"numeric",size:5,defaultValue:t.price,onChange:function(n){return e.props.productUpdate(t.code,Object.assign({},t,{price:n.target.value}))}})),r.a.createElement("div",{className:"stock"},r.a.createElement(xt,{htmlFor:"stock"},r.a.createElement(w.a,{id:"product.stock",defaultMessage:"Stock"})),r.a.createElement(wt,{id:"stock",type:"number",className:"numeric",step:"1",size:3,defaultValue:t.stock,onChange:function(n){return e.props.productUpdate(t.code,Object.assign({},t,{stock:n.target.stock}))}})))}):r.a.createElement(w.a,{id:"product.empty",defaultMessage:"No products found"})))}}],[{key:"getDerivedStateFromProps",value:function(e,n){return Object.assign({},n,{products:t.filteredProducts(e.products,n.filter)})}},{key:"filteredProducts",value:function(e,t){return e.filter(function(e){return!(t.name.length>0)||e.name.includes(t.name)}).filter(function(e){return!(t.code.length>0)||e.code.includes(t.code)}).filter(function(e){return!t.category||e.category===t.category.name}).filter(function(e){return!t.fav||e.fav})}}]),t}(r.a.Component),Tt=Object(i.b)(function(e,t){return{categories:e.categories,products:e.products}},function(e){return{productUpdate:function(t,n){e(function(e,t){return{type:y,payload:{code:e,product:t}}}(t,n))},productRemove:function(t){e(function(e){return{type:E,payload:{product:e}}}(t))}}})(Ft),Rt=function(e){function t(){return Object(ne.a)(this,t),Object(re.a)(this,Object(ce.a)(t).apply(this,arguments))}return Object(oe.a)(t,e),Object(ae.a)(t,[{key:"render",value:function(){return r.a.createElement(jt,null,r.a.createElement("h2",null,r.a.createElement(w.a,{id:"product.management",defaultMessage:"Product management"})),r.a.createElement(Tt,null))}}]),t}(r.a.Component);function zt(){var e=Object(_.a)(["\n  ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    li:not(:first-child) {\n      margin-left: 1rem;\n    }\n  }\n"]);return zt=function(){return e},e}var St=x.c.nav(zt()),Bt=function(e){var t=e.match;return r.a.createElement("div",null,r.a.createElement("h1",null,"Warehouse management"),r.a.createElement(St,null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(P.b,{to:"".concat(t.url,"/categories")},r.a.createElement(w.a,{id:"warehouse.categories",defaultMessage:"Categories"}))),r.a.createElement("li",null,r.a.createElement(P.b,{to:"".concat(t.url,"/products")},r.a.createElement(w.a,{id:"warehouse.products",defaultMessage:"Products"}))))),r.a.createElement(M.a,{exact:!0,path:"".concat(t.path,"/categories"),component:dt}),r.a.createElement(M.a,{exact:!0,path:"".concat(t.path,"/products"),component:Rt}))},At=n(185),Ut=n.n(At),Lt=n(186),Vt=n.n(Lt),It=n(187),Wt=n.n(It),qt=n(188),Ht=n(83);Object(w.c)([].concat(Object(u.a)(Ut.a),Object(u.a)(Vt.a),Object(u.a)(Wt.a)));var Xt={en:qt,fr:Ht,es:Ht},Gt=(navigator.language.split("-")[0],Xt),Yt=Object(i.b)(function(e,t){return{locale:e.locale}},{})(function(e){return r.a.createElement(w.b,{locale:e.locale,messages:Gt[e.locale]},r.a.createElement(x.a,{theme:N},r.a.createElement("div",{className:"App"},r.a.createElement(P.a,null,r.a.createElement(Z,null),r.a.createElement(M.a,{path:"/",exact:!0,component:Ye}),r.a.createElement(M.a,{path:"/warehouse",component:Bt})),r.a.createElement(F,null))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Jt=Object(l.createStore)(O,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__(),Object(l.applyMiddleware)(j.a,C));o.a.render(r.a.createElement(i.a,{store:Jt},r.a.createElement(Yt,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},83:function(e){e.exports={app:{title:""},order:{order:"",people:"",nothingordered:""}}}},[[192,1,2]]]);
//# sourceMappingURL=main.a1ac5514.chunk.js.map