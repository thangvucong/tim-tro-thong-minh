import{j as p}from"./cm-1.0.29-B-jRz_ox.js";import{e as f}from"./notistack-1.0.29-DTteiN_s.js";import{i as l}from"./useTheme-1.0.29-BG2eLrmM.js";import{l as c,C as x}from"./lib-1.0.29-C3pCU2AT.js";import{d as r}from"./dayjs.min-1.0.29-DcSvnIA7.js";import{ac as M}from"./useMobilePicker-1.0.29-Df2Tk0E7.js";import{A as j}from"./AdapterDayjs-1.0.29-CEpaNW6M.js";import{T as h}from"./TimePicker-1.0.29-lLnNnKJ8.js";import"./redux-1.0.29-C1Q38y1F.js";import"./vendor-1.0.29-BmpNFhoq.js";import"./RestApi-1.0.29-D1Nj1ewF.js";import"./index-1.0.29-D3hJYFO0.js";import"./Typography-1.0.29-DKDDWYKJ.js";import"./index-1.0.29-Dlm2kjka.js";import"./iconBase-1.0.29-DWX4ew0u.js";import"./loglevel-1.0.29-BZ7XahX3.js";import"./lodash-1.0.29-CLFJOMhY.js";import"./moment-1.0.29-C5S46NFB.js";import"./index-1.0.29-CZwhy2eo.js";import"./DialogContent-1.0.29-DSOFFK1-.js";import"./Menu-1.0.29-DOOr2lTO.js";import"./ThemeProvider-1.0.29-6fkyOh-r.js";import"./Popper-1.0.29-DA77uIz-.js";import"./InputAdornment-1.0.29-CO4NNpRp.js";import"./useFormControl-1.0.29-DBjraibe.js";import"./useControlled-1.0.29-gPCMf8hr.js";import"./FormHelperText-1.0.29-DrHduTUH.js";import"./TextField-1.0.29-DGwcptkL.js";import"./FormLabel-1.0.29-V40o0R6-.js";import"./createSvgIcon-1.0.29-DRHeS-Ok.js";import"./visuallyHidden-1.0.29-Dan1xhjv.js";import"./CardContent-1.0.29-D9omFsvB.js";import"./ListItem-1.0.29-D5iRmc9g.js";import"./Autocomplete-1.0.29-BeVKfuIu.js";import"./Close-1.0.29-DMVND8Dd.js";import"./timeViewRenderers-1.0.29-8ZO1XmkN.js";import"./MenuItem-1.0.29-hQUyAg_Q.js";const ro=({value:i,setValue:e,setButtons:s,saveChanges:a,cancel:d,locale:t,language:m,columnState:u})=>{c.debug(i);const n=r();return p.jsx("div",{onClick:o=>{o.stopPropagation()},children:p.jsx(M,{dateAdapter:j,adapterLocale:u.localize?l((m==null?void 0:m.dayjs)??x.defaultLanguage.dayjs):void 0,children:p.jsx(h,{className:"pp-inline-editing",value:i===null?null:r(n.format("YYYY-MM-DD")+"T"+i),views:["hours","minutes","seconds"],onChange:o=>{e(o===null?null:r(o).format("HH:mm:ss"))},slotProps:{textField:{variant:"outlined",onKeyDown:o=>{o.key==="Enter"?i!==null&&!r(n.format("YYYY-MM-DD")+"T"+i).isValid()?f(t==null?void 0:t.invalidTime,{variant:"error"}):a():o.key==="Escape"&&d()},onBlur:()=>{setTimeout(()=>{s(!1)},200)},onFocus:()=>{s(!0)},sx:{"& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderWidth:"1px"},"& .MuiInputBase-root:before":{borderBottomWidth:"1px !important"},"& .MuiInputBase-root.Mui-focused:after":{borderBottomWidth:"1px"}}}}})})})};export{ro as default};
