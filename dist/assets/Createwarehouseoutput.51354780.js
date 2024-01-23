import{_ as O,o as u,c as n,g as e,w as t,i,j as S,k as Q,l as V,m as h,a as d,F as m,s as _,t as c,b as p,n as b,x as g,e as k,u as T,r as w,f as C,v as E}from"./index.0551f09c.js";import{V as D}from"./VCheckboxBtn.1507c113.js";import{V as v}from"./VSelect.6285b64d.js";import{V as P}from"./VTable.41678778.js";import{V as B}from"./VChip.0e663ac6.js";import{V as F,a as R,b as U,c as I}from"./VWindowItem.bd4831d3.js";const N={data(){return{selectedPurchaseOrder:null,dialog:!1,desserts:[{id:1,oid:"SO1",EQuantity:159,OQuantity:6,available:24,shipped:22},{id:2,oid:"SO2",EQuantity:237,OQuantity:6,available:24,shipped:20},{id:3,oid:"SO3",EQuantity:262,OQuantity:6,available:3,shipped:2},{id:4,oid:"SO4",EQuantity:305,OQuantity:6,available:15,shipped:7},{id:5,oid:"SO5",EQuantity:356,OQuantity:6,available:17,shipped:10}],headers:[{text:"Product ID",value:"id"},{text:"Exchange Quantity",value:"EQuantity"},{text:"Ordered Quantity",value:"OQuantity"},{text:"Available",value:"available"},{text:"Shipped",value:"shipped"}]}},computed:{filteredDesserts(){return this.selectedPurchaseOrder,this.desserts.filter(r=>r.oid===this.selectedPurchaseOrder)}},methods:{resolveStatusVariant(r){return r.available<r.OQuantity?{color:"error"}:{color:"success"}},deleteRow(r){const l=this.desserts.indexOf(r);l!==-1&&this.desserts.splice(l,1)},openproductdialog(){console.log("check the dialog"),this.dialog=!0},closeDialog(){this.dialog=!1}}},z={class:"text-center"},A={class:"text-center"},W={class:"text-center"},j={class:"text-center"},L={class:"text-center"};function q(r,l,x,y,s,f){return u(),n("div",null,[e(V,null,{default:t(()=>[e(i,{cols:"12"},{default:t(()=>[e(S,{title:"Output Stock",class:"mb-4"},{default:t(()=>[e(Q,null,{default:t(()=>[e(D,{class:"mt-6"},{default:t(()=>[e(V,null,{default:t(()=>[e(i,{md:"6",cols:"12"},{default:t(()=>[e(v,{modelValue:s.selectedPurchaseOrder,"onUpdate:modelValue":l[0]||(l[0]=a=>s.selectedPurchaseOrder=a),label:"Sales Order",items:["SO1","SO2","SO3","SO4","SO5"]},null,8,["modelValue"])]),_:1}),e(i,{cols:"12",md:"6"},{default:t(()=>[e(h,{label:"Order From"})]),_:1}),e(i,{cols:"12",md:"6"},{default:t(()=>[e(h,{label:"Date"})]),_:1}),e(i,{md:"6",cols:"12"},{default:t(()=>[e(v,{label:"SO Status",items:["Draft","Created","Shared","Acknowledged","Received","Close"]})]),_:1}),e(i,{cols:"12"},{default:t(()=>[e(P,{headers:s.headers,items:s.desserts},{default:t(()=>[d("thead",null,[d("tr",null,[(u(!0),n(m,null,_(s.headers,a=>(u(),n("th",{class:"text-center",key:a},c(a.text),1))),128))])]),d("tbody",null,[(u(!0),n(m,null,_(f.filteredDesserts,a=>(u(),n("tr",{key:a.id},[d("td",z,c(a.id),1),d("td",A,c(a.EQuantity),1),d("td",W,c(a.OQuantity),1),d("td",j,[e(B,{color:f.resolveStatusVariant(a).color,class:"font-weight-medium",size:"small"},{default:t(()=>[p(c(a.available),1)]),_:2},1032,["color"])]),d("td",L,[e(h,{modelValue:a.shipped,"onUpdate:modelValue":o=>a.shipped=o,outlined:"",dense:""},null,8,["modelValue","onUpdate:modelValue"])])]))),128))])]),_:1},8,["headers","items"])]),_:1}),e(i,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[e(b,null,{default:t(()=>[p("Save")]),_:1}),e(b,{color:"secondary",variant:"tonal",type:"reset"},{default:t(()=>[p(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}const G=O(N,[["render",q]]),H={components:{Outputstock:G},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Create Output Stock",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=g(),this.activeTab=k(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function J(r,l,x,y,s,f){const a=w("Outputstock");return u(),n("div",null,[e(F,{modelValue:s.activeTab,"onUpdate:modelValue":l[0]||(l[0]=o=>s.activeTab=o),"show-arrows":""},{default:t(()=>[(u(!0),n(m,null,_(s.tabs,o=>(u(),C(I,{key:o.icon,value:o.tab},{default:t(()=>[e(E,{size:"20",start:"",icon:o.icon},null,8,["icon"]),p(" "+c(o.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),e(T),e(U,{modelValue:s.activeTab,"onUpdate:modelValue":l[1]||(l[1]=o=>s.activeTab=o),class:"mt-5 disable-tab-transition",touch:!1},{default:t(()=>[e(R,{value:"account"},{default:t(()=>[e(a)]),_:1})]),_:1},8,["modelValue"])])}const ee=O(H,[["render",J]]);export{ee as default};
