import{e as i,E as m,aS as x,o as I,c as T,g as a,w as s,aT as P,k as p,p as S,l as C,i as h,m as f,aV as n,n as E,b as g,j as R,aU as c,t as B,a as u,aR as D,bg as M}from"./index.a09c0f04.js";import{c as N,d as U,b as j,a as q}from"./auth-v1-tree.54ebfcea.js";import{a as A}from"./index.2bd8ddc8.js";import{b as _}from"./route-block.011d1056.js";import{V as z}from"./VForm.01c3c56f.js";import{V as F}from"./VSnackbar.e3222511.js";const L={class:"auth-wrapper d-flex align-center justify-center pa-4"},Z=u("div",{class:"d-flex"},[u("img",{src:D,width:"80",height:"80"})],-1),G=u("h5",{class:"text-h5 font-weight-semibold mb-1"}," Welcome to BIZKINGZ! \u{1F44B}\u{1F3FB} ",-1),K=u("p",{class:"mb-0"}," Please sign-in to your account and start the adventure ",-1),W=u("br",null,null,-1),$=u("br",null,null,-1),H={__name:"login",setup(J){const v=M(),o=i({email:"",password:"",remember:!1,timeout:6e3}),V=m(()=>{const t=[];return t.push(e=>!!e||"Email is required"),t.push(e=>/.+@.+\..+/.test(e)||"Email must be valid"),t}),w=m(()=>{const t=[];return t.push(e=>!!e||"Password is required"),t}),l=i({show:!1,message:"",color:""}),b=x(),k=m(()=>b.global.name.value==="light"?N:U),d=i(!1),y=()=>{if(!o.value.email||!o.value.password){l.value={show:!0,message:"Please give mandatory fields",color:"error"};return}const t={email:o.value.email,password:o.value.password};A.post("http://103.211.218.32/bizkingz/services/api/auth/login",t).then(e=>{console.log("API Response:",e),e.data.status==1?(setTimeout(()=>{v.push("/Dashboardhome")},1e3),localStorage.setItem("createdby",e.data.data.name),localStorage.setItem("userId",e.data.data.user_id),localStorage.setItem("userRole",e.data.data.user_role),l.value={show:!0,message:e.data.message,color:"success"}):l.value={show:!0,message:e.data.message,color:"error"}}).catch(e=>{console.error("API Error:",e),l.value={show:!0,message:"An error occurred while logging in. Please try again.",color:"error"}})};return(t,e)=>(I(),T("div",L,[a(R,{class:"auth-card pa-4 pt-7","max-width":"448"},{default:s(()=>[a(P,{class:"justify-center"},{prepend:s(()=>[Z]),_:1}),a(p,{class:"pt-2"},{default:s(()=>[G,K]),_:1}),a(p,null,{default:s(()=>[a(z,{onSubmit:S(y,["prevent"])},{default:s(()=>[a(C,null,{default:s(()=>[a(h,{cols:"12"},{default:s(()=>[a(f,{modelValue:o.value.email,"onUpdate:modelValue":e[0]||(e[0]=r=>o.value.email=r),label:"Email",type:"email",rules:n(V)},null,8,["modelValue","rules"])]),_:1}),a(h,{cols:"12"},{default:s(()=>[a(f,{modelValue:o.value.password,"onUpdate:modelValue":e[1]||(e[1]=r=>o.value.password=r),label:"Password",type:d.value?"text":"password","append-inner-icon":d.value?"mdi-eye-off-outline":"mdi-eye-outline","onClick:appendInner":e[2]||(e[2]=r=>d.value=!d.value),rules:n(w)},null,8,["modelValue","type","append-inner-icon","rules"]),W,$,a(E,{block:"",type:"submit"},{default:s(()=>[g(" Login ")]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1}),a(c,{class:"auth-footer-start-tree d-none d-md-block",src:n(j),width:250},null,8,["src"]),a(c,{src:n(q),class:"auth-footer-end-tree d-none d-md-block",width:350},null,8,["src"]),a(c,{class:"auth-footer-mask d-none d-md-block",src:n(k)},null,8,["src"]),a(F,{modelValue:l.value.show,"onUpdate:modelValue":e[3]||(e[3]=r=>l.value.show=r),color:l.value.color,top:"",timeout:1e3},{default:s(()=>[g(B(l.value.message),1)]),_:1},8,["modelValue","color"])]))}};typeof _=="function"&&_(H);export{H as default};