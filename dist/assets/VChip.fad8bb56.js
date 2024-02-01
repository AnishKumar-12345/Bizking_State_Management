import{y as A,az as w,A as K,z as P,P as B,aA as _,a3 as D,D as M,a0 as X,$ as C,K as q,g as l,aB as H,I as g,aC as J,W,aD as Y,O as j,aE as Q,N as U,aF as Z,aG as ee,aH as ae,Y as le,aI as te,aJ as se,aK as ne,X as ie,aa as ue,aL as de,a5 as y,a6 as oe,aM as ce,as as d,aN as re,v as o,ad as ve,aO as S}from"./index.a09c0f04.js";const G=Symbol.for("vuetify:v-chip-group");A({name:"VChipGroup",props:{column:Boolean,filter:Boolean,valueComparator:{type:Function,default:w},...K({selectedClass:"v-chip--selected"}),...P(),...B(),..._({variant:"tonal"})},emits:{"update:modelValue":e=>!0},setup(e,c){let{slots:s}=c;const{themeClasses:r}=D(e),{isSelected:t,select:v,next:f,prev:p,selected:m}=M(e,G);return X({VChip:{color:C(e,"color"),filter:C(e,"filter"),variant:C(e,"variant")}}),q(()=>{var n;return l(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},r.value]},{default:()=>[(n=s.default)==null?void 0:n.call(s,{isSelected:t,select:v,next:f,prev:p,selected:m.value})]})}),{}}});const pe=A({name:"VChip",directives:{Ripple:H},props:{activeClass:String,appendAvatar:String,appendIcon:g,closable:Boolean,closeIcon:{type:g,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,pill:Boolean,prependAvatar:String,prependIcon:g,ripple:{type:Boolean,default:!0},text:String,modelValue:{type:Boolean,default:!0},...J(),...W(),...Y(),...j(),...Q(),...U(),...Z(),...P({tag:"span"}),...B(),..._({variant:"tonal"})},emits:{"click:close":e=>!0,"update:active":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0},setup(e,c){let{attrs:s,emit:r,slots:t}=c;const{borderClasses:v}=ee(e),{colorClasses:f,colorStyles:p,variantClasses:m}=ae(e),{densityClasses:n}=le(e),{elevationClasses:x}=te(e),{roundedClasses:$}=se(e),{sizeClasses:z}=ne(e),{themeClasses:R}=D(e),k=ie(e,"modelValue"),a=ue(e,G,!1),h=de(e,s);function E(i){k.value=!1,r("click:close",i)}return()=>{var i;const T=h.isLink.value?"a":e.tag,F=!!(t.append||e.appendIcon||e.appendAvatar),L=!!(t.close||e.closable),V=!!(t.filter||e.filter)&&a,N=!!(t.prepend||e.prependIcon||e.prependAvatar),I=!a||a.isSelected.value,u=!e.disabled&&(!!a||h.isClickable.value||e.link),O=e.link?e.link:a==null?void 0:a.toggle;return k.value&&y(l(T,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":u,"v-chip--filter":V,"v-chip--pill":e.pill},R.value,v.value,I?f.value:void 0,n.value,x.value,$.value,z.value,m.value,a==null?void 0:a.selectedClass.value],style:[I?p.value:void 0],disabled:e.disabled||void 0,draggable:e.draggable,href:h.href.value,onClick:u&&O},{default:()=>{var b;return[ce(u,"v-chip"),V&&l(d,{key:"filter",defaults:{VIcon:{icon:e.filterIcon}}},{default:()=>[l(re,null,{default:()=>[y(l("div",{class:"v-chip__filter"},[t.filter?t.filter():l(o,null,null)]),[[ve,a.isSelected.value]])]})]}),N&&l(d,{key:"prepend",defaults:{VAvatar:{image:e.prependAvatar},VIcon:{icon:e.prependIcon}}},{default:()=>[t.prepend?l("div",{class:"v-chip__prepend"},[t.prepend()]):e.prependAvatar?l(S,{start:!0},null):e.prependIcon?l(o,{start:!0},null):void 0]}),(b=(i=t.default)==null?void 0:i.call(t,{isSelected:a==null?void 0:a.isSelected.value,selectedClass:a==null?void 0:a.selectedClass.value,select:a==null?void 0:a.select,toggle:a==null?void 0:a.toggle,value:a==null?void 0:a.value.value,disabled:e.disabled}))!=null?b:e.text,F&&l(d,{key:"append",defaults:{VAvatar:{image:e.appendAvatar},VIcon:{icon:e.appendIcon}}},{default:()=>[t.append?l("div",{class:"v-chip__append"},[t.append()]):e.appendAvatar?l(S,{end:!0},null):e.appendIcon?l(o,{end:!0},null):void 0]}),L&&l(d,{key:"close",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},{default:()=>[l("div",{class:"v-chip__close",onClick:E},[t.close?t.close():l(o,null,null)])]})]}}),[[oe("ripple"),u&&e.ripple,null]])}}});export{pe as V};