(this.webpackJsonpqwixx=this.webpackJsonpqwixx||[]).push([[0],[,,,,,,,,,,,,,function(e,c,r){},function(e,c,r){},function(e,c,r){},function(e,c,r){},function(e,c,r){},function(e,c,r){},function(e,c,r){},function(e,c,r){"use strict";r.r(c);var l=r(0),t=r(1),s=r.n(t),n=r(7),i=r.n(n),o=(r(13),r(14),r(2)),a=r(3),d=r(5),u=r(4),h=(r(15),r(16),function(e){Object(d.a)(r,e);var c=Object(u.a)(r);function r(){return Object(o.a)(this,r),c.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){var e="sc-numsquare sc-numsquare-"+this.props.data.color;this.props.data.disabled&&(e+=" sc-numsquare-disabled"),this.props.data.clicked&&(e+=" sc-numsquare-clicked");var c="sc-num-btn sc-num-btn-"+this.props.data.color;this.props.data.disabled&&(c+=" sc-num-btn-disabled"),this.props.data.clicked&&(c+=" sc-num-btn-clicked");var r="sc-numsquare-"+this.props.data.x+this.props.data.y;return Object(l.jsx)("div",{id:r,className:e,children:Object(l.jsx)("button",{className:c,onClick:this.props.onClick,disabled:this.props.data.disabled,children:this.props.data.clicked?String.fromCharCode(10004):this.props.data.number})})}}]),r}(s.a.Component)),b=(r(17),function(e){Object(d.a)(r,e);var c=Object(u.a)(r);function r(){return Object(o.a)(this,r),c.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){var e="sc-lock sc-lock-"+this.props.data.color;this.props.data.clicked&&(e+=" sc-lock-clicked");var c="sc-lock-icon sc-lock-icon-"+this.props.data.color;return Object(l.jsx)("div",{className:e,children:Object(l.jsx)("div",{className:c,onClick:this.props.onClick,disabled:this.props.data.disabled,children:this.props.data.clicked?Object(l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"18",height:"18",children:Object(l.jsx)("path",{fillRule:"evenodd",d:"M6 9V7.25C6 3.845 8.503 1 12 1s6 2.845 6 6.25V9h.5a2.5 2.5 0 012.5 2.5v8a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 19.5v-8A2.5 2.5 0 015.5 9H6zm1.5-1.75C7.5 4.58 9.422 2.5 12 2.5c2.578 0 4.5 2.08 4.5 4.75V9h-9V7.25zm-3 4.25a1 1 0 011-1h13a1 1 0 011 1v8a1 1 0 01-1 1h-13a1 1 0 01-1-1v-8z"})}):Object(l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"18",height:"18",children:Object(l.jsx)("path",{fillRule:"evenodd",d:"M7.5 7.25C7.5 4.58 9.422 2.5 12 2.5c2.079 0 3.71 1.34 4.282 3.242a.75.75 0 101.436-.432C16.971 2.825 14.792 1 12 1 8.503 1 6 3.845 6 7.25V9h-.5A2.5 2.5 0 003 11.5v8A2.5 2.5 0 005.5 22h13a2.5 2.5 0 002.5-2.5v-8A2.5 2.5 0 0018.5 9h-11V7.25zm-3 4.25a1 1 0 011-1h13a1 1 0 011 1v8a1 1 0 01-1 1h-13a1 1 0 01-1-1v-8z"})})})})}}]),r}(s.a.Component)),k=(r(18),r(19),function(e){Object(d.a)(r,e);var c=Object(u.a)(r);function r(){return Object(o.a)(this,r),c.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){var e=this.props.data,c="sc-score sc-score-"+e.color;return Object(l.jsx)("div",{className:c,onClick:this.props.onClick,children:e.hidden?"":e.score})}}]),r}(s.a.Component)),m=function(e){Object(d.a)(r,e);var c=Object(u.a)(r);function r(e){var l;Object(o.a)(this,r);(l=c.call(this,e)).state={isFullscreen:!1,rows:v,locks:x,scores:[{color:"red",score:0,hidden:!0},{color:"yellow",score:0,hidden:!0},{color:"green",score:0,hidden:!0},{color:"blue",score:0,hidden:!0},{color:"grey",score:0,hidden:!0},{color:"total",score:null,hidden:!1}],passChecks:Array(4).fill(!1)};return l}return Object(a.a)(r,[{key:"handleMode",value:function(e){0===e?this.setState({rows:v,locks:x}):alert("Coming soon")}},{key:"handleClick",value:function(e){if(e.clicked)this.handleUnclick(e);else{var c=this.state.rows.slice(),r=c[e.y],l=r[e.x];l.clicked=!0,r[e.x]=l;for(var t=0;t<e.x;t++){var s=r[t];s.disabled=!0,r[t]=s}c[e.y]=r,this.setState({rows:c})}this.checkRowState(e.y),this.updateScore()}},{key:"handleUnclick",value:function(e){var c=this.state.rows.slice(),r=c[e.y],l=r[e.x];if(l.clicked=!1,r[e.x]=l,e.x>0)for(var t=!1,s=1;!t&&e.x-s>=0;){var n=r[e.x-s];n.disabled=!1,r[e.x-s]=n,s++,n.clicked&&(t=!0)}this.setState({rows:c})}},{key:"handleLockClick",value:function(e){var c=this.state.locks.slice();c[e.row].clicked=!0,this.setState({locks:c}),this.updateScore(),c.filter((function(e){return e.clicked})).length>1&&this.endGame()}},{key:"handleLockUnclick",value:function(e){}},{key:"checkRowState",value:function(e){var c=this.state.rows.slice(),r=c[e],l=!0;r.filter((function(e){return e.clicked})).length>=5&&(l=!1),r[r.length-1].disabled=l,c[e]=r,this.setState({rows:c})}},{key:"updateScore",value:function(){var e=this,c=this.state.rows[0].filter((function(e){return e.clicked})),r=this.state.rows[1].filter((function(e){return e.clicked})),l=this.state.rows[2].filter((function(e){return e.clicked})),t=this.state.rows[3].filter((function(e){return e.clicked})),s=c.concat(r).concat(l).concat(t),n=this.state.scores.slice();["red","blue","green","yellow"].forEach((function(c){var r=e.state.locks.find((function(e){return e.color===c})).clicked,l=s.filter((function(e){return e.color===c}));n.find((function(e){return e.color===c})).score=e.calculatePoints(l.length,r)})),this.setState({scores:n})}},{key:"calculatePoints",value:function(e,c){switch(c&&e++,e){case 1:return 1;case 2:return 3;case 3:return 6;case 4:return 10;case 5:return 15;case 6:return 21;case 7:return 28;case 8:return 36;case 9:return 45;case 10:return 55;case 11:return 66;case 12:return 78;default:return 0}}},{key:"renderRow",value:function(e){var c=this,r=this.state.rows[e],t=this.state.locks[e];return Object(l.jsxs)("div",{className:"sc-row",children:[r.map((function(e){return Object(l.jsx)(h,{data:e,onClick:function(){return c.handleClick(e)}})})),Object(l.jsx)(b,{data:t,onClick:function(){return c.handleLockClick(t)}})]})}},{key:"renderScores",value:function(){var e=this,c=this.state.scores.filter((function(e){return"total"!=e.color})),r=this.state.scores.filter((function(e){return"total"==e.color}))[0];return Object(l.jsxs)("div",{className:"sc-scores",children:[c.map((function(c){return Object(l.jsx)(k,{data:c,onClick:function(){return e.handleScoreClick(c)}})})),Object(l.jsx)(k,{data:r})]})}},{key:"handleScoreClick",value:function(e){console.log("Score clicked: ",e);var c=this.state.scores.slice(),r=c.find((function(c){return c.color==e.color}));r.hidden=!r.hidden,this.setState({scores:c})}},{key:"renderFullscreenBtn",value:function(){var e=this;return Object(l.jsx)("div",{onClick:function(){return e.fullScreen()},children:this.state.isFullscreen?Object(l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"36",height:"36",children:Object(l.jsx)("path",{fillRule:"evenodd",d:"M8.25 3a.75.75 0 01.75.75v3.5A1.75 1.75 0 017.25 9h-3.5a.75.75 0 010-1.5h3.5a.25.25 0 00.25-.25v-3.5A.75.75 0 018.25 3zm7.5 0a.75.75 0 01.75.75v3.5c0 .138.112.25.25.25h3.5a.75.75 0 010 1.5h-3.5A1.75 1.75 0 0115 7.25v-3.5a.75.75 0 01.75-.75zM3 15.75a.75.75 0 01.75-.75h3.5c.966 0 1.75.784 1.75 1.75v3.5a.75.75 0 01-1.5 0v-3.5a.25.25 0 00-.25-.25h-3.5a.75.75 0 01-.75-.75zm12 1c0-.966.784-1.75 1.75-1.75h3.5a.75.75 0 010 1.5h-3.5a.25.25 0 00-.25.25v3.5a.75.75 0 01-1.5 0v-3.5z"})}):Object(l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"36",height:"36",children:Object(l.jsx)("path",{fillRule:"evenodd",d:"M4.75 4.5a.25.25 0 00-.25.25v3.5a.75.75 0 01-1.5 0v-3.5C3 3.784 3.784 3 4.75 3h3.5a.75.75 0 010 1.5h-3.5zM15 3.75a.75.75 0 01.75-.75h3.5c.966 0 1.75.784 1.75 1.75v3.5a.75.75 0 01-1.5 0v-3.5a.25.25 0 00-.25-.25h-3.5a.75.75 0 01-.75-.75zM3.75 15a.75.75 0 01.75.75v3.5c0 .138.112.25.25.25h3.5a.75.75 0 010 1.5h-3.5A1.75 1.75 0 013 19.25v-3.5a.75.75 0 01.75-.75zm16.5 0a.75.75 0 01.75.75v3.5A1.75 1.75 0 0119.25 21h-3.5a.75.75 0 010-1.5h3.5a.25.25 0 00.25-.25v-3.5a.75.75 0 01.75-.75z"})})})}},{key:"fullScreen",value:function(){var e=window.document,c=e.documentElement,r=c.requestFullscreen||c.mozRequestFullScreen||c.webkitRequestFullScreen||c.msRequestFullscreen,l=e.exitFullscreen||e.mozCancelFullScreen||e.webkitExitFullscreen||e.msExitFullscreen;e.fullscreenElement||e.mozFullScreenElement||e.webkitFullscreenElement||e.msFullscreenElement?(l.call(e),this.setState({isFullscreen:!1})):(r.call(c),this.setState({isFullscreen:!0}))}},{key:"clickPassCheck",value:function(e){var c=this.state.passChecks.slice(),r=c[e];c[e]=!r;var l=this.state.scores,t=l.find((function(e){return"grey"===e.color})),s=-5*c.filter((function(e){return e})).length;t.score=s,this.setState({passChecks:c,scores:l}),c.includes(!1)||this.endGame()}},{key:"endGame",value:function(){var e=this.state.scores.slice(),c=e.filter((function(e){return"total"!=e.color})).map((function(e){return e.score})).reduce((function(e,c){return e+c}));e.find((function(e){return"total"===e.color})).score=c,this.setState({scores:e}),window.alert("Einde! Score: "+c)}},{key:"renderPassChecks",value:function(){var e=this,c=this.state.passChecks;return Object(l.jsxs)("div",{className:"sc-pass",children:[Object(l.jsx)("div",{className:"sc-pass-expl",children:"Mislukte ronde -5"}),Object(l.jsx)("div",{className:"sc-pass-checks",children:c.map((function(c,r){return Object(l.jsx)("div",{className:"sc-pass-check",onClick:function(){return e.clickPassCheck(r)},children:c?String.fromCharCode(10060):""})}))})]})}},{key:"render",value:function(){var e=this;return Object(l.jsxs)("div",{className:"sc-wrapper",children:[Object(l.jsxs)("div",{className:"sc-sidebar",children:[this.renderFullscreenBtn(),Object(l.jsx)("button",{onClick:function(){return e.handleMode(0)},children:"Standard"}),Object(l.jsx)("button",{onClick:function(){return e.handleMode(1)},children:"Mixed 1"})]}),Object(l.jsxs)("div",{className:"sc-container-rows",children:[this.renderRow(0),this.renderRow(1),this.renderRow(2),this.renderRow(3)]}),Object(l.jsxs)("div",{className:"sc-container-calculation",children:[Object(l.jsx)("div",{className:"sc-calculation"}),this.renderPassChecks(),this.renderScores()]})]})}}]),r}(s.a.Component),v=[[{x:0,y:0,color:"red",number:12,clicked:!1,disabled:!1},{x:1,y:0,color:"red",number:11,clicked:!1,disabled:!1},{x:2,y:0,color:"red",number:10,clicked:!1,disabled:!1},{x:3,y:0,color:"red",number:9,clicked:!1,disabled:!1},{x:4,y:0,color:"red",number:8,clicked:!1,disabled:!1},{x:5,y:0,color:"red",number:7,clicked:!1,disabled:!1},{x:6,y:0,color:"red",number:6,clicked:!1,disabled:!1},{x:7,y:0,color:"red",number:5,clicked:!1,disabled:!1},{x:8,y:0,color:"red",number:4,clicked:!1,disabled:!1},{x:9,y:0,color:"red",number:3,clicked:!1,disabled:!1},{x:10,y:0,color:"red",number:2,clicked:!1,disabled:!0}],[{x:0,y:1,color:"yellow",number:12,clicked:!1,disabled:!1},{x:1,y:1,color:"yellow",number:11,clicked:!1,disabled:!1},{x:2,y:1,color:"yellow",number:10,clicked:!1,disabled:!1},{x:3,y:1,color:"yellow",number:9,clicked:!1,disabled:!1},{x:4,y:1,color:"yellow",number:8,clicked:!1,disabled:!1},{x:5,y:1,color:"yellow",number:7,clicked:!1,disabled:!1},{x:6,y:1,color:"yellow",number:6,clicked:!1,disabled:!1},{x:7,y:1,color:"yellow",number:5,clicked:!1,disabled:!1},{x:8,y:1,color:"yellow",number:4,clicked:!1,disabled:!1},{x:9,y:1,color:"yellow",number:3,clicked:!1,disabled:!1},{x:10,y:1,color:"yellow",number:2,clicked:!1,disabled:!0}],[{x:0,y:2,color:"green",number:12,clicked:!1,disabled:!1},{x:1,y:2,color:"green",number:11,clicked:!1,disabled:!1},{x:2,y:2,color:"green",number:10,clicked:!1,disabled:!1},{x:3,y:2,color:"green",number:9,clicked:!1,disabled:!1},{x:4,y:2,color:"green",number:8,clicked:!1,disabled:!1},{x:5,y:2,color:"green",number:7,clicked:!1,disabled:!1},{x:6,y:2,color:"green",number:6,clicked:!1,disabled:!1},{x:7,y:2,color:"green",number:5,clicked:!1,disabled:!1},{x:8,y:2,color:"green",number:4,clicked:!1,disabled:!1},{x:9,y:2,color:"green",number:3,clicked:!1,disabled:!1},{x:10,y:2,color:"green",number:2,clicked:!1,disabled:!0}],[{x:0,y:3,color:"blue",number:12,clicked:!1,disabled:!1},{x:1,y:3,color:"blue",number:11,clicked:!1,disabled:!1},{x:2,y:3,color:"blue",number:13,clicked:!1,disabled:!1},{x:3,y:3,color:"blue",number:9,clicked:!1,disabled:!1},{x:4,y:3,color:"blue",number:8,clicked:!1,disabled:!1},{x:5,y:3,color:"blue",number:7,clicked:!1,disabled:!1},{x:6,y:3,color:"blue",number:6,clicked:!1,disabled:!1},{x:7,y:3,color:"blue",number:5,clicked:!1,disabled:!1},{x:8,y:3,color:"blue",number:4,clicked:!1,disabled:!1},{x:9,y:3,color:"blue",number:3,clicked:!1,disabled:!1},{x:10,y:3,color:"blue",number:2,clicked:!1,disabled:!0}]],x=[{row:0,color:"red",clicked:!1},{row:1,color:"yellow",clicked:!1},{row:2,color:"green",clicked:!1},{row:3,color:"blue",clicked:!1}],f=m;var y=function(){return Object(l.jsx)(f,{})};i.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(y,{})}),document.getElementById("root"))}],[[20,1,2]]]);
//# sourceMappingURL=main.366b1345.chunk.js.map