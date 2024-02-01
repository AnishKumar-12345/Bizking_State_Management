import{_ as V,o as a,c,g as e,bh as g,b0 as h,f as _,w as t,i as x,j as w,k,b as m,l as P,a as i,F as p,s as f,t as u,n as T,v as b,x as H,e as C,u as I,r as S}from"./index.a09c0f04.js";import{s as B}from"./Services.cbe723d2.js";import{V as O,a as A}from"./VAlert.0c083e06.js";import{V as N}from"./VChip.fad8bb56.js";import{V as z}from"./VTable.867fae40.js";import{V as D,a as R,b as F,c as L}from"./VWindowItem.438b72a9.js";import"./index.2bd8ddc8.js";const U={mixins:[B],data(){return{loading:!0,purchaseHistory:[],userIds:"",createdBy:"",headers:[{text:"PO Number",value:"po_number"},{text:"Order Date",value:"created_date"},{text:"Status",value:"po_status"},{text:"Order To",value:"brand_name"},{text:"Shipped To",value:"brand_name"},{text:"Action",value:"actions"}]}},computed:{filteredPurchaseHistory(){return this.purchaseHistory.filter(s=>s.po_status==="Acknowledged"||s.po_status==="Shared")}},mounted(){this.createdBy=localStorage.getItem("createdby"),this.userIds=localStorage.getItem("userId"),this.getPurchasehistorydetails(),setTimeout(()=>{this.loading=!1},4e3)},methods:{inputstock(s){console.log("check the detials",s.po_id),this.$router.push({name:"Createwarehouseinput",query:{po_id:s.po_id}})},getPurchasehistorydetails(){this.getPurchaseorder(this.userIds,this.userRoles).then(s=>{console.log("check the view purchase order",s.data),this.purchaseHistory=s.data,console.log("check the view purchase History",this.purchaseHistory)})},resolveStatusVariant(s){return s=="Acknowledged"?{color:"warning"}:{color:"info"}}}},W={key:0,class:"loading-container"},j=i("p",{class:"mb-0"}," The system is not retrieving the Purchase Histories from Purchase Orders. Please ensure that you have applied for Purchase Orders !",-1),q={class:"text-center"},E={class:"text-center"},G={class:"text-center"},J={class:"text-center"},K={class:"text-center"},M={class:"text-center"};function Q(s,n,v,y,l,d){return a(),c("div",null,[l.loading?(a(),c("div",W,[e(g,{height:"5",color:"primary",indeterminate:"",class:"custom-loader","full-width":""})])):h("",!0),this.filteredPurchaseHistory==null?(a(),_(P,{key:1},{default:t(()=>[e(x,{cols:"12"},{default:t(()=>[e(w,{title:"Purchase Order View"},{default:t(()=>[e(k,null,{default:t(()=>[e(O,{color:"warning",variant:"tonal",class:"mb-4",border:"top"},{default:t(()=>[e(A,{class:"mb-1"},{default:t(()=>[m(" Are you sure you gave Purchase Orders? ")]),_:1}),j]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})):h("",!0),this.filteredPurchaseHistory!=null?(a(),_(z,{key:2,headers:l.headers,items:d.filteredPurchaseHistory,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:t(()=>[i("thead",null,[i("tr",null,[(a(!0),c(p,null,f(l.headers,r=>(a(),c("th",{class:"text-center",key:r},u(r.text),1))),128))])]),i("tbody",null,[(a(!0),c(p,null,f(d.filteredPurchaseHistory,(r,o)=>(a(),c("tr",{key:o},[i("td",q,u(r.po_number),1),i("td",E,u(r.created_date),1),i("td",G,[e(N,{color:d.resolveStatusVariant(r.po_status).color,class:"font-weight-medium",size:"small"},{default:t(()=>[m(u(r.po_status),1)]),_:2},1032,["color"])]),i("td",J,u(r.brand_name),1),i("td",K,u(r.brand_name),1),i("td",M,[e(T,{icon:"",variant:"text",color:"success",class:"me-2",size:"small"},{default:t(()=>[e(b,{icon:"mdi-invoice-receive-outline",color:"success",size:"30",onClick:$=>d.inputstock(r)},null,8,["onClick"])]),_:2},1024)])]))),128))])]),_:1},8,["headers","items"])):h("",!0)])}const X=V(U,[["render",Q]]),Y={components:{Viewpurchasehistories:X},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Purchase History",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=H(),this.activeTab=C(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function Z(s,n,v,y,l,d){const r=S("Viewpurchasehistories");return a(),c("div",null,[e(D,{modelValue:l.activeTab,"onUpdate:modelValue":n[0]||(n[0]=o=>l.activeTab=o),"show-arrows":""},{default:t(()=>[(a(!0),c(p,null,f(l.tabs,o=>(a(),_(L,{key:o.icon,value:o.tab},{default:t(()=>[e(b,{size:"20",start:"",icon:o.icon},null,8,["icon"]),m(" "+u(o.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),e(I),e(F,{modelValue:l.activeTab,"onUpdate:modelValue":n[1]||(n[1]=o=>l.activeTab=o),class:"mt-5 disable-tab-transition",touch:!1},{default:t(()=>[e(R,{value:"account"},{default:t(()=>[e(r)]),_:1})]),_:1},8,["modelValue"])])}const le=V(Y,[["render",Z]]);export{le as default};