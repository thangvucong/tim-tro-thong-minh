import{j as e}from"./cm-1.0.29-B-jRz_ox.js";import{a as E}from"./RestApi-1.0.29-D1Nj1ewF.js";import{Y as N,l as Z}from"./lib-1.0.29-C3pCU2AT.js";import{c as j}from"./index-1.0.29-DPiWw_1S.js";import{F as _,a as $}from"./FormHelperText-1.0.29-DrHduTUH.js";import{T as S,a as z}from"./ToggleButtonGroup-1.0.29-DLo1QKzQ.js";import{r as b}from"./redux-1.0.29-C1Q38y1F.js";import{F as T}from"./FormLabel-1.0.29-V40o0R6-.js";import{R as K}from"./RadioGroup-1.0.29-DlKNzHJO.js";import{R as U}from"./Radio-1.0.29-DtS8PS_A.js";import{S as oo}from"./Slider-1.0.29-Bfsw0S30.js";import{B}from"./Spinner-1.0.29-BS14fgdJ.js";import{D as eo}from"./Divider-1.0.29-DUrOUuwN.js";import{n as Y}from"./index-1.0.29-Dlm2kjka.js";import{T as q}from"./TextField-1.0.29-DGwcptkL.js";import{I as J}from"./InputAdornment-1.0.29-CO4NNpRp.js";import{I as Q}from"./iconBase-1.0.29-DWX4ew0u.js";const jo=({appId:d,chartSettings:o,updateSettings:i})=>{var p,x;const m=E();return e.jsxs(_,{fullWidth:!0,children:[e.jsxs(S,{color:"primary",exclusive:!0,fullWidth:!0,value:((x=(p=o==null?void 0:o.options)==null?void 0:p.legend)==null?void 0:x.position)??"none",onChange:(a,l)=>{const u=j(o.options);u.legend.position=l,i!==void 0?i({options:u}):m(N({appId:d,property:{options:u}})),a.stopPropagation()},children:[e.jsx(z,{value:"none",children:"none"}),e.jsx(z,{value:"left",children:"left"}),e.jsx(z,{value:"top",children:"top"}),e.jsx(z,{value:"right",children:"right"}),e.jsx(z,{value:"bottom",children:"bottom"})]}),e.jsx($,{children:"Legend position."})]})},X=({appId:d,chartSettings:o,titleKey:i,titleDefaultValue:m,titleLabel:p,updateSettings:x})=>{const a=E(),[l,u]=b.useState(m),[c,f]=b.useState(!1),A=t=>{x!==void 0?x({options:t}):a(N({appId:d,property:{options:t}})),f(!1)},h=()=>{const t=j(o.options);i==="title"?(l.trim()===""?t.title=void 0:t.title=l,A(t)):i==="hAxis.title"?(t.hAxis.title=l,A(t)):i==="vAxis.title"&&(t.vAxis.title=l,A(t))};return e.jsx(q,{fullWidth:!0,label:p,value:l,variant:"outlined",sx:{"&.MuiFormControl-root .MuiInputBase-root":{padding:"0",backgroundColor:"white"},"&.MuiFormControl-root input":{padding:"16.5px 14px",backgroundColor:"white"}},onChange:t=>{u(t.target.value),f(!0),t.stopPropagation(),t.preventDefault()},slotProps:{input:{endAdornment:e.jsx(J,{position:"end",children:e.jsx(Q,{color:"primary",disabled:!c,onClick:()=>{h()},sx:{marginRight:"8px"},children:e.jsx(Y,{})})})}},onKeyUp:t=>{t.key==="Enter"&&h()}})},y=({label:d,value:o,setValue:i,defaultValue:m,maxValue:p,suffix:x})=>e.jsxs(_,{fullWidth:!0,sx:{flexDirection:"row",alignItems:"center"},children:[e.jsx(T,{sx:{textAlign:"left",minWidth:"60px",width:"60px",fontWeight:"bold",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:d}),e.jsxs(K,{sx:{display:"grid",gridTemplateColumns:"auto auto",alignItems:"center"},children:[e.jsxs(T,{sx:{cursor:"pointer",fontSize:"80%",whiteSpace:"nowrap"},children:[e.jsx(U,{checked:o==="auto",onChange:a=>{i("auto"),a.stopPropagation()}}),"Auto"]}),e.jsxs(T,{sx:{cursor:"pointer",fontSize:"80%",whiteSpace:"nowrap"},children:[e.jsx(U,{checked:o!=="auto",onChange:a=>{i(m),a.stopPropagation()}}),"Custom"]})]}),typeof o=="number"&&e.jsx(oo,{value:o,onChange:(a,l)=>{i(l)},size:"small",min:0,max:p,step:1,valueLabelDisplay:"on",valueLabelFormat:o+x,sx:{marginLeft:"20px","& .MuiSlider-valueLabelOpen":{backgroundColor:"transparent"},"& .MuiSlider-valueLabelCircle":{height:"5px"},"& .MuiSlider-valueLabelLabel":{color:"rgba(0, 0, 0, 0.6)"}}})]}),vo=({appId:d,chartSettings:o,updateSettings:i})=>{var C,W,L,O,R,k,D,g,F,I,M,P;const m=E(),[p,x]=b.useState(((W=(C=o==null?void 0:o.options)==null?void 0:C.chartArea)==null?void 0:W.width)??"auto"),[a,l]=b.useState(((O=(L=o==null?void 0:o.options)==null?void 0:L.chartArea)==null?void 0:O.height)??"auto"),[u,c]=b.useState(((k=(R=o==null?void 0:o.options)==null?void 0:R.chartArea)==null?void 0:k.top)??"auto"),[f,A]=b.useState(((g=(D=o==null?void 0:o.options)==null?void 0:D.chartArea)==null?void 0:g.right)??"auto"),[h,t]=b.useState(((I=(F=o==null?void 0:o.options)==null?void 0:F.chartArea)==null?void 0:I.bottom)??"auto"),[n,v]=b.useState(((P=(M=o==null?void 0:o.options)==null?void 0:M.chartArea)==null?void 0:P.left)??"auto"),w=s=>{i!==void 0?i({options:s}):m(N({appId:d,property:{options:s}}))};return e.jsx(e.Fragment,{children:e.jsxs(B,{children:[e.jsx(y,{value:p.includes("%")?Number(p.replace("%","")):p,setValue:s=>{const r=j(o.options);s!=="auto"?r.chartArea.width=s+"%":r.chartArea.width=s,w(r),x(r.chartArea.width)},label:"Width",defaultValue:77.4,maxValue:100,suffix:"%"}),e.jsx(y,{value:a.includes("%")?Number(a.replace("%","")):a,setValue:s=>{const r=j(o.options);s!=="auto"?r.chartArea.height=s+"%":r.chartArea.height=s,w(r),l(r.chartArea.height)},label:"Height",defaultValue:77.4,maxValue:100,suffix:"%"}),e.jsx(eo,{component:"div",sx:{margin:"20px 0"}}),e.jsx(y,{value:u,setValue:s=>{const r=j(o.options);r.chartArea.top=s,w(r),c(s)},label:"Top",defaultValue:77,maxValue:200,suffix:"px"}),e.jsx(y,{value:f,setValue:s=>{const r=j(o.options);r.chartArea.right=s,w(r),A(s)},label:"Right",defaultValue:188,maxValue:400,suffix:"px"}),e.jsx(y,{value:h,setValue:s=>{const r=j(o.options);r.chartArea.bottom=s,w(r),t(s)},label:"Bottom",defaultValue:76,maxValue:200,suffix:"px"}),e.jsx(y,{value:n,setValue:s=>{const r=j(o.options);r.chartArea.left=s,w(r),v(s)},label:"Left",defaultValue:188,maxValue:400,suffix:"px"})]})})},H=({appId:d,chartSettings:o,propertyKey:i,defaultValue:m,label:p,updateSettings:x})=>{Z.debug(d,o,i,m,p);const a=E(),[l,u]=b.useState(m),[c,f]=b.useState(!1),A=n=>{x!==void 0?x({options:n}):a(N({appId:d,property:{options:n}})),f(!1)},h=(n,v,w,C,W)=>(n[w]={title:v,viewWindow:{min:C,max:W}},n),t=n=>{var w,C,W,L,O,R,k,D,g,F,I,M,P,s,r,G;const v=j(o.options);if(i==="hAxis.viewWindow.min"){const V=h(v,((C=(w=o.options)==null?void 0:w.hAxis)==null?void 0:C.title)??"","hAxis",n,(L=(W=o.options)==null?void 0:W.hAxis)==null?void 0:L.viewWindow.max);A(V)}else if(i==="hAxis.viewWindow.max"){const V=h(v,((R=(O=o.options)==null?void 0:O.hAxis)==null?void 0:R.title)??"","hAxis",(D=(k=o.options)==null?void 0:k.hAxis)==null?void 0:D.viewWindow.min,n);A(V)}else if(i==="vAxis.viewWindow.min"){const V=h(v,((F=(g=o.options)==null?void 0:g.vAxis)==null?void 0:F.title)??"","vAxis",n,(M=(I=o.options)==null?void 0:I.vAxis)==null?void 0:M.viewWindow.max);A(V)}else if(i==="vAxis.viewWindow.max"){const V=h(v,((s=(P=o.options)==null?void 0:P.vAxis)==null?void 0:s.title)??"","vAxis",(G=(r=o.options)==null?void 0:r.vAxis)==null?void 0:G.viewWindow.min,n);A(V)}};return e.jsxs(_,{fullWidth:!0,sx:{display:"grid",gridTemplateColumns:"auto auto",justifyContent:"start",alignItems:"center"},children:[e.jsx(T,{sx:{textAlign:"left",minWidth:"40px",width:"40px",fontWeight:"bold",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:p}),e.jsxs(K,{sx:{display:"grid",gridTemplateColumns:"auto auto",justifyContent:"start",alignItems:"center"},children:[e.jsxs(T,{sx:{cursor:"pointer",fontSize:"80%",whiteSpace:"nowrap"},children:[e.jsx(U,{checked:l===void 0,onChange:n=>{u(void 0),t(void 0),n.stopPropagation(),n.preventDefault()}}),"Auto"]}),e.jsxs(T,{sx:{cursor:"pointer",fontSize:"80%",whiteSpace:"nowrap"},children:[e.jsx(U,{checked:l!==void 0,onChange:n=>{u(0),t(0),n.stopPropagation(),n.preventDefault()}}),"Custom"]})]}),typeof l=="number"&&e.jsxs(e.Fragment,{children:[e.jsx("span",{}),e.jsx(q,{value:l,type:"number",size:"small",className:"pp-axis-field",onChange:n=>{u(Number(n.target.value)),f(!0),n.stopPropagation(),n.preventDefault()},slotProps:{input:{startAdornment:e.jsx(J,{position:"start",children:e.jsx(Q,{color:"primary",disabled:!c,onClick:()=>{t(l)},sx:{marginRight:"8px"},children:e.jsx(Y,{})})})}},onKeyUp:n=>{n.key==="Enter"&&t(l)},sx:{marginLeft:"10px","& .MuiInputBase-root":{backgroundColor:"#fff"},"& input":{fontSize:"80%",textAlign:"right",padding:"12px 8px",backgroundColor:"#fff"},"& input::-webkit-inner-spin-button":{marginLeft:"7px"}}})]})]})},Co=({appId:d,chartSettings:o,updateSettings:i})=>{var m,p,x,a,l,u,c,f;return e.jsxs(B,{component:"fieldset",sx:{border:"1px solid #ddd",borderRadius:"4px",marginInline:"0 !important",padding:"20px","& legend":{textAlign:"left",color:"rgba(0, 0, 0, 0.6)"}},children:[e.jsx("legend",{children:" Horizontal Axis "}),e.jsx(X,{appId:d,chartSettings:o,titleKey:"hAxis.title",titleDefaultValue:((p=(m=o==null?void 0:o.options)==null?void 0:m.hAxis)==null?void 0:p.title)??"",titleLabel:"Title",updateSettings:i}),e.jsxs(B,{component:"fieldset",sx:{marginTop:"10px",border:"1px solid #ddd",borderRadius:"4px",marginInline:"0 !important",padding:"10px 20px","& legend":{textAlign:"left",color:"rgba(0, 0, 0, 0.6)"}},children:[e.jsx("legend",{children:" View Window "}),e.jsx(H,{appId:d,chartSettings:o,propertyKey:"hAxis.viewWindow.min",defaultValue:(l=(a=(x=o==null?void 0:o.options)==null?void 0:x.hAxis)==null?void 0:a.viewWindow)==null?void 0:l.min,label:"Min",updateSettings:i}),e.jsx(H,{appId:d,chartSettings:o,propertyKey:"hAxis.viewWindow.max",defaultValue:(f=(c=(u=o==null?void 0:o.options)==null?void 0:u.hAxis)==null?void 0:c.viewWindow)==null?void 0:f.max,label:"Max",updateSettings:i})]})]})},Wo=({appId:d,chartSettings:o,updateSettings:i})=>{var m,p,x,a,l,u,c,f;return e.jsxs(B,{component:"fieldset",sx:{border:"1px solid #ddd",borderRadius:"4px",marginInline:"0 !important",padding:"20px","& legend":{textAlign:"left",color:"rgba(0, 0, 0, 0.6)"}},children:[e.jsx("legend",{children:" Vertical Axis "}),e.jsx(X,{appId:d,chartSettings:o,titleKey:"vAxis.title",titleDefaultValue:((p=(m=o==null?void 0:o.options)==null?void 0:m.vAxis)==null?void 0:p.title)??"",titleLabel:"Title",updateSettings:i}),e.jsxs(B,{component:"fieldset",sx:{marginTop:"10px",border:"1px solid #ddd",borderRadius:"4px",marginInline:"0 !important",padding:"10px 20px","& legend":{textAlign:"left",color:"rgba(0, 0, 0, 0.6)"}},children:[e.jsx("legend",{children:" View Window "}),e.jsx(H,{appId:d,chartSettings:o,propertyKey:"vAxis.viewWindow.min",defaultValue:(l=(a=(x=o==null?void 0:o.options)==null?void 0:x.vAxis)==null?void 0:a.viewWindow)==null?void 0:l.min,label:"Min",updateSettings:i}),e.jsx(H,{appId:d,chartSettings:o,propertyKey:"vAxis.viewWindow.max",defaultValue:(f=(c=(u=o==null?void 0:o.options)==null?void 0:u.vAxis)==null?void 0:c.viewWindow)==null?void 0:f.max,label:"Max",updateSettings:i})]})]})},Vo=["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00","#b82e2e","#316395","#994499","#22aa99","#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262","#5574a6","#3b3eac","#b77322","#16d620","#b91383","#f4359e","#9c5935","#a9c413","#2a778d","#668d1c","#bea413","#0c5922","#743411"];export{X as C,Vo as D,jo as a,Co as b,Wo as c,vo as d};
