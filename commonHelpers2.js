import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as h,i as f}from"./assets/vendor-651d7991.js";function y(e){const i=Math.floor(e/864e5),c=Math.floor(e%864e5/36e5),l=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:i,hours:c,minutes:l,seconds:m}}function n(e){return String(e).padStart(2,"0")}const t={input:document.querySelector("#datetime-picker"),startBtn:document.querySelector("[data-start]"),days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),mins:document.querySelector("[data-minutes]"),secs:document.querySelector("[data-seconds]")};let u=null,a=null;const p={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){if(a=e[0],a<Date.now())return t.startBtn.disabled=!0,f.show({message:"Please choose a date in the future",color:"red",position:"topRight"});t.startBtn.disabled=!1,d()}};h("#datetime-picker",p);t.startBtn.addEventListener("click",C);function C(){u=setInterval(()=>{const{days:e,hours:o,minutes:s,seconds:r}=y(a-Date.now());t.days.textContent=n(e),t.hours.textContent=n(o),t.mins.textContent=n(s),t.secs.textContent=n(r),e===0&&o===0&&s===0&&r===0&&d()},1e3),t.startBtn.disabled=!0,t.input.disabled=!0}function d(){clearInterval(u),t.days.textContent=n(0),t.hours.textContent=n(0),t.mins.textContent=n(0),t.secs.textContent=n(0)}
//# sourceMappingURL=commonHelpers2.js.map
