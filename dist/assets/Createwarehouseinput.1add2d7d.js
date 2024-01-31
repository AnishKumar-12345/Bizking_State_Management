import{_ as g,o as r,c as i,g as t,w as o,i as d,j as y,k as I,l as k,m as p,a as u,F as h,s as b,t as m,n as S,b as f,x as D,e as T,u as w,r as U,f as P,v as C}from"./index.64325b43.js";import{s as R}from"./Services.e73a1808.js";import{V as F}from"./VForm.af75c4c5.js";import{V as v}from"./VSelect.dd8042d2.js";import{V as O}from"./VTable.a6af340d.js";import{V as q,a as B,b as $,c as N}from"./VWindowItem.2921a6d0.js";import"./index.2bd8ddc8.js";import"./VCheckboxBtn.b39d46c5.js";import"./VChip.5298ec56.js";const E={mixins:[R],props:["po_id"],data(){return{today:this.getFormattedDate(new Date),inputStock:{po_number:"",brand_name:"",created_date:this.getFormattedDate(new Date),po_status:"",you_saved:"",po_id:"",po_number:"",brand_id:"",products:[{brand_product_id:"",sku_name:"",hsn_code:"",mrp:"",quantity:"",uom:"",price_per_unit:"",taxable_amount:"",cgst:"",sgst:"",amount:"",total_give_margin:""}]},PoId:"",InputStockDetails:[],selectedPurchaseOrder:null,dialog:!1,headers:[{text:"Product Name",value:"brand_name"},{text:"Ordered Quantity",value:"quantity"},{text:"Received Quantity",value:"quantity"},{text:"RTM",value:"carbs"},{text:"Remarks",value:"protein"}]}},computed:{filteredDesserts(){return this.selectedPurchaseOrder,this.desserts.filter(s=>s.purchaseOrder===this.selectedPurchaseOrder)}},mounted(){this.PoId=this.$route.query.po_id,console.log("Received po_id:",this.PoId),this.getInputstockdetails()},methods:{getFormattedDate(s){const a=s.getFullYear(),_=String(s.getMonth()+1).padStart(2,"0"),V=String(s.getDate()).padStart(2,"0");return`${a}-${_}-${V}`},getInputstockdetails(){this.getInputstock(this.PoId).then(s=>{this.InputStockDetails=s.data,console.log("check input dtock",s),this.InputStockDetails.forEach(a=>{this.inputStock.po_number=a.po_number,this.inputStock.brand_name=a.brand_name,this.inputStock.po_status=a.po_status,this.inputStockproducts=a.products,console.log("inputStockproducts",this.inputStockproducts)})})}}},M={class:"text-center"},Q={class:"text-center"},W={class:"text-center"},j={class:"text-center"},z={class:"text-center"};function A(s,a,_,V,l,x){return r(),i("div",null,[t(k,null,{default:o(()=>[t(d,{cols:"12"},{default:o(()=>[t(y,{title:"Input Stock",class:"mb-4"},{default:o(()=>[t(I,null,{default:o(()=>[t(F,{class:"mt-6"},{default:o(()=>[t(k,null,{default:o(()=>[t(d,{md:"6",cols:"12"},{default:o(()=>[t(v,{modelValue:this.inputStock.po_number,"onUpdate:modelValue":a[0]||(a[0]=e=>this.inputStock.po_number=e),label:"Purchase Order"},null,8,["modelValue"])]),_:1}),t(d,{cols:"12",md:"6"},{default:o(()=>[t(p,{modelValue:this.inputStock.brand_name,"onUpdate:modelValue":a[1]||(a[1]=e=>this.inputStock.brand_name=e),label:"Order To"},null,8,["modelValue"])]),_:1}),t(d,{cols:"12",md:"6"},{default:o(()=>[t(p,{modelValue:this.inputStock.created_date,"onUpdate:modelValue":a[2]||(a[2]=e=>this.inputStock.created_date=e),type:"date",label:"Date",min:l.today,rules:s.dateRules,readonly:""},null,8,["modelValue","min","rules"])]),_:1}),t(d,{md:"6",cols:"12"},{default:o(()=>[t(v,{modelValue:this.inputStock.po_status,"onUpdate:modelValue":a[3]||(a[3]=e=>this.inputStock.po_status=e),label:"PO Status",items:["Draft","Created","Shared","Acknowledged","Received","Close"]},null,8,["modelValue"])]),_:1}),t(d,{cols:"12"},{default:o(()=>[t(O,{headers:l.headers,items:l.InputStockDetails},{default:o(()=>[u("thead",null,[u("tr",null,[(r(!0),i(h,null,b(l.headers,e=>(r(),i("th",{class:"text-center",key:e},m(e.text),1))),128))])]),u("tbody",null,[(r(!0),i(h,null,b(this.inputStockproducts,(e,n)=>(r(),i("tr",{key:n},[u("td",M,m(e.sku_name),1),u("td",Q,m(e.quantity),1),u("td",W,[t(p,{modelValue:e.quantity,"onUpdate:modelValue":c=>e.quantity=c,outlined:"",dense:""},null,8,["modelValue","onUpdate:modelValue"])]),u("td",j,[t(p,{modelValue:e.carbs,"onUpdate:modelValue":c=>e.carbs=c,outlined:"",dense:""},null,8,["modelValue","onUpdate:modelValue"])]),u("td",z,[t(p,{modelValue:e.protein,"onUpdate:modelValue":c=>e.protein=c,outlined:"",dense:""},null,8,["modelValue","onUpdate:modelValue"])])]))),128))])]),_:1},8,["headers","items"])]),_:1}),t(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[t(S,null,{default:o(()=>[f("Save")]),_:1}),t(S,{color:"secondary",variant:"tonal",type:"reset"},{default:o(()=>[f(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}const L=g(E,[["render",A]]),Y={components:{Inputstock:L},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Create Input Stock",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=D(),this.activeTab=T(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function G(s,a,_,V,l,x){const e=U("Inputstock");return r(),i("div",null,[t(q,{modelValue:l.activeTab,"onUpdate:modelValue":a[0]||(a[0]=n=>l.activeTab=n),"show-arrows":""},{default:o(()=>[(r(!0),i(h,null,b(l.tabs,n=>(r(),P(N,{key:n.icon,value:n.tab},{default:o(()=>[t(C,{size:"20",start:"",icon:n.icon},null,8,["icon"]),f(" "+m(n.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),t(w),t($,{modelValue:l.activeTab,"onUpdate:modelValue":a[1]||(a[1]=n=>l.activeTab=n),class:"mt-5 disable-tab-transition",touch:!1},{default:o(()=>[t(B,{value:"account"},{default:o(()=>[t(e)]),_:1})]),_:1},8,["modelValue"])])}const st=g(Y,[["render",G]]);export{st as default};