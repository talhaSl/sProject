"use strict";(self.webpackChunksahulatgaar=self.webpackChunksahulatgaar||[]).push([[739],{1739:function(e,a,s){s.r(a);var t=s(4165),r=s(5861),n=s(9439),i=s(2791),c=s(8983),d=s(3035),l=s(386),o=s(6131),u=s(4846),h=s(8723),m=s(324),x=s(1933),j=s(456),p=s(184),f=function(){var e=localStorage.getItem("token");if(e)try{return(0,j.Z)(e).role}catch(a){console.log("Error decoding token:",a)}return null}();console.log("Decoded user role:",f);a.default=function(){var e=(0,i.useState)([]),a=(0,n.Z)(e,2),s=a[0],j=a[1],f=(0,i.useState)(),g=(0,n.Z)(f,2),N=(g[0],g[1],function(e,a){return Math.floor(Math.random()*(a-e+1)+e)}),w=function(){var e=(0,r.Z)((0,t.Z)().mark((function e(){var a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,x.A4)();case 2:200===(a=e.sent).status?j(a.data.data.user.reverse()):console.log("Error to get the user data");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){w()}),[]);var b=function(e){var a=Math.floor(e/1e3),s=Math.floor(a/60),t=Math.floor(s/60),r=Math.floor(t/168),n=Math.floor(r/4);return{seconds:a%60,minutes:s%60,hours:t%24,weeks:r,months:n,years:Math.floor(n/12)}};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(m.Z,{}),(0,p.jsx)(c.xH,{className:"mb-4",children:(0,p.jsxs)(c.sl,{children:[(0,p.jsxs)(c.rb,{children:[(0,p.jsxs)(c.b7,{sm:5,children:[(0,p.jsx)("h4",{id:"traffic",className:"card-title mb-0",children:"Traffic"}),(0,p.jsx)("div",{className:"small text-medium-emphasis",children:"January - July 2021"})]}),(0,p.jsxs)(c.b7,{sm:7,className:"d-none d-md-block",children:[(0,p.jsx)(c.u5,{color:"primary",className:"float-end",children:(0,p.jsx)(u.Z,{icon:h.j})}),(0,p.jsx)(c.Z0,{className:"float-end me-3",children:["Day","Month","Year"].map((function(e){return(0,p.jsx)(c.u5,{color:"outline-secondary",className:"mx-0",active:"Month"===e,children:e},e)}))})]})]}),(0,p.jsx)(d.oK,{style:{height:"300px",marginTop:"40px"},data:{labels:["January","February","March","April","May","June","July"],datasets:[{label:"My First dataset",backgroundColor:(0,l.Z)((0,o.Z)("--cui-info"),10),borderColor:(0,o.Z)("--cui-info"),pointHoverBackgroundColor:(0,o.Z)("--cui-info"),borderWidth:2,data:[N(50,100),N(50,100),N(50,100),N(50,100),N(50,100),N(50,100),N(50,100)],fill:!0},{label:"My Second dataset",backgroundColor:"transparent",borderColor:(0,o.Z)("--cui-success"),pointHoverBackgroundColor:(0,o.Z)("--cui-success"),borderWidth:2,data:[N(50,200),N(50,200),N(50,200),N(50,200),N(50,200),N(50,200),N(50,200)]},{label:"My Third dataset",backgroundColor:"transparent",borderColor:(0,o.Z)("--cui-danger"),pointHoverBackgroundColor:(0,o.Z)("--cui-danger"),borderWidth:1,borderDash:[8,5],data:[65,65,65,65,65,65,65]}]},options:{maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{drawOnChartArea:!1}},y:{ticks:{beginAtZero:!0,maxTicksLimit:5,stepSize:Math.ceil(50),max:250}}},elements:{line:{tension:.4},point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}})]})}),(0,p.jsx)(c.rb,{children:(0,p.jsx)(c.b7,{xs:!0,children:(0,p.jsx)(c.xH,{className:"mb-4",children:(0,p.jsx)(c.sl,{children:(0,p.jsxs)(c.Sx,{align:"middle",className:"mb-0 border",hover:!0,responsive:!0,children:[(0,p.jsx)(c.V,{color:"light",children:(0,p.jsxs)(c.T6,{children:[(0,p.jsxs)(c.is,{className:"text-center",children:[(0,p.jsx)(u.Z,{}),"Status"]}),(0,p.jsx)(c.is,{children:"User"}),(0,p.jsx)(c.is,{className:"text-center",children:"Address"}),(0,p.jsx)(c.is,{children:"Role"}),(0,p.jsx)(c.is,{className:"text-center",children:"Phone Number"}),(0,p.jsx)(c.is,{children:"Activity"})]})}),(0,p.jsx)(c.NR,{children:Array.isArray(s)?s.map((function(e,a){return(0,p.jsxs)(c.T6,{children:[(0,p.jsx)(c.NN,{className:"text-center",children:(0,p.jsx)(c.cU,{size:"md",status:e.isActive?"avatar-status bg-success":"avatar-status bg-danger",children:e.isActive?(0,p.jsx)("p",{className:"sr-only m-0",children:"Active"}):(0,p.jsx)("p",{className:"sr-only m-0",children:"Inactive"})})}),(0,p.jsxs)(c.NN,{children:[(0,p.jsx)("div",{children:e.full_name}),(0,p.jsxs)("div",{className:"small text-medium-emphasis",children:[(0,p.jsx)("span",{children:e.new?"New":"Recurring"})," | Registered: ",e.isActive]})]}),(0,p.jsx)(c.NN,{className:"text-center",children:e.address}),(0,p.jsx)(c.NN,{children:(0,p.jsxs)("div",{className:"clearfix",children:[(0,p.jsx)("div",{className:"float-start",children:e.role}),(0,p.jsx)("div",{className:"float-end"})]})}),(0,p.jsx)(c.NN,{className:"text-center",children:(0,p.jsxs)(p.Fragment,{children:[" ",e.phone_number.toString().padStart(11,"0")]})}),(0,p.jsxs)(c.NN,{children:[(0,p.jsx)("div",{className:"small text-medium-emphasis",children:"Last login"}),(0,p.jsxs)("p",{children:[b(new Date-new Date(e.updated_at)).years>0&&(0,p.jsxs)(p.Fragment,{children:[b(new Date-new Date(e.updated_at)).years," ","years,"," "]}),b(new Date-new Date(e.updated_at)).months>0&&(0,p.jsxs)(p.Fragment,{children:[b(new Date-new Date(e.updated_at)).months," ","months,"," "]}),b(new Date-new Date(e.updated_at)).weeks>0&&(0,p.jsxs)(p.Fragment,{children:[b(new Date-new Date(e.updated_at)).weeks," ","weeks,"," "]}),b(new Date-new Date(e.updated_at)).hours>0&&(0,p.jsxs)(p.Fragment,{children:[b(new Date-new Date(e.updated_at)).hours," ","hours,"," "]}),b(new Date-new Date(e.updated_at)).minutes>0&&(0,p.jsxs)(p.Fragment,{children:[b(new Date-new Date(e.updated_at)).minutes," ","minutes,"," "]}),b(new Date(e.updated_at)-new Date(e.created_at)).seconds>0&&(0,p.jsxs)(p.Fragment,{children:[b(new Date(e.updated_at)-new Date(e.created_at)).seconds," ","seconds"]})]})]})]},a)})):(0,p.jsx)("p",{children:"No user data available"})})]})})})})})]})}}}]);
//# sourceMappingURL=739.ef347cba.chunk.js.map