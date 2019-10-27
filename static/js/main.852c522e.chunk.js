(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e){e.exports={name:"@untra/naivetable",version:"0.1.10",description:"Dumb Simple Naive React Array<T> Table",main:"./dist/src/NaiveTable.js",types:"./dist/src/NaiveTable.d.ts",author:{name:"Samuel Volin",email:"sam@untra.io",url:"https://github.com/untra"},repository:{type:"git",url:"https://github.com/untra/naivetable"},scripts:{postversion:"git push && git push --tags",prepublishOnly:"npm run ci",preversion:"npm run ci",pretest:"",test:"mocha --reporter spec",posttest:"",build:"rm -f dist/index.html && cp index.html dist/index.html && tsc -p ./tsconfig.json","build:watch":"npm run build && tsc -p ./tsconfig.json --watch","build:site":"./node_modules/.bin/react-scripts build",lint:'tslint --project "./tsconfig.json"',docs:"typedoc --out docs/docs src",defs:"tsc --outDir dist/",cover:"",ci:"npm run lint && npm run build",ci2:"npm run lint && npm run build && npm run cover",start:"yarn build && ./node_modules/.bin/react-scripts start",deploy:"./node_modules/.bin/gh-pages -d ./build",predeploy:"yarn build:site",watch:"./node_modules/.bin/webpack-dev-server dist/index.js","serve:watch":"./node_modules/.bin/webpack-dev-server --config webpack.config.js --mode development","cypress:test":"./node_modules/.bin/cypress run --record ","cypress:run":"./node_modules/.bin/cypress run","cypress:open":"./node_modules/.bin/cypress open","build:test":"./node_modules/.bin/webpack --output-filename out.js --entry ./cypress/integration/test.spec.ts"},license:"MIT",dependencies:{react:"^16.8.0","react-dom":"^16.8.0"},devDependencies:{"@babel/core":"^7.2.2","@babel/preset-react":"^7.0.0","@babel/preset-typescript":"^7.3.3","@cypress/browserify-preprocessor":"^2.1.0","@cypress/webpack-preprocessor":"^4.0.3","@types/chai":"^4.1.7","@types/lodash":"^4.14.120","@types/mocha":"^5.2.5","@types/node":"^10.12.18","@types/react":"^16.8.17","@types/react-dom":"^16.8.4","@types/react-highlight":"0.12.1","@types/react-router-dom":"4.3.3","@untra/naivetable":"0.1.8","babel-loader":"^8.0.5",chai:"^4.2.0","css-loader":"^3.2.0",cypress:"^3.5.0","eslint-plugin-react-hooks":"^1.6.1","gh-pages":"^2.0.1","html-loader":"^0.5.5","html-webpack-plugin":"^3.2.0",mocha:"^6.2.0","react-highlight":"0.12.0","react-router-dom":"5.0.1","react-scripts":"3.0.1","ts-loader":"^6.0.4",tslint:"^5.18.0","tslint-config-prettier":"^1.18.0",typescript:"^3.5.3",webpack:"^4.38.0","webpack-cli":"3.3.6","webpack-dev-server":"^3.8.1","webpack-node-externals":"^1.7.2"},browserslist:{production:[">0.2%","not dead","not op_mini all"],development:["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}},231:function(e,a,t){"use strict";t.r(a);var r=t(21),n=t.n(r),l=t(0),o=t.n(l),s=t(11),c=t(5),i=t(8),d=t(9),u=t(13),m=t(10),p=t(14),b=t(12),h=t(22),f=t.n(h),y=t(23),g=t(24),v=t(15),w=t(25);function E(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function _(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?E(t,!0).forEach(function(a){Object(w.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):E(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var x=function(e,a){return"".concat(e).localeCompare("".concat(a))},k={display:"grid",gridTemplateColumns:"",borderTop:"1px solid black",borderRight:"1px solid black",borderLeft:"1px solid black",borderBottom:"1px solid black"},j={padding:"8px 4px",borderBottom:"1px solid black",borderTop:"1px solid black"},O={position:"relative",backgroundColor:"lightgray",fontWeight:"bold"},N={border:"3px solid black",borderWidth:"0 2px 2px 0",position:"absolute",padding:"5px 3px 3px 5px",top:6,right:6,opacity:.5},T={opacity:1},C=_({},N,{transform:"rotate(-135deg)"}),K=_({},N,{transform:"rotate(45deg)",top:12}),I=function(e){return o.a.createElement("span",null,"".concat(e))},S={dataKey:"",label:"",width:"auto",render:I,sort:!1},D={dataKey:"'index'",label:"#",width:"auto",render:I},L=function(e){var a=e.includeIndex||!1,t=_({},j,{},e.cellStyle),r=_({},k,{},e.tableStyle),n=e.data||[],l=a?[D]:[],o=e.headers?e.headers:function(e){var a=e[0];return a?Object.keys(a).map(function(e){return _({},S,{dataKey:e,label:e})}):[]}(n),s=[].concat(l,Object(b.a)(o)),c=function(e){var a=-1,t=function(e){return(!0===e.sort?"asc":"asc"===e.sort&&"asc")||"dsc"===e.sort&&"dsc"||void 0},r=function(e){return e.sort?a:void 0};return e.reduce(function(e,n){var l=Object(v.a)(e,2),o=l[0],s=l[1];return a+=1,[o||t(n),s||r(n)]},[void 0,void 0])}(s),i=Object(v.a)(c,2);return{headers:s,includeIndex:a,cellStyle:t,tableStyle:r,sortDir:i[0]||"asc",sortIndex:i[1]}},M=function(e){var a,t=L(e),r=!1!==e.headers,n=Object(l.useState)(t),s=Object(v.a)(n,2),c=s[0],i=s[1],d=c.headers,u=c.tableStyle,m=c.cellStyle,p=c.sortIndex,b=c.sortDir,h=_({},u,{gridTemplateColumns:function(e){return e.reduce(function(e,a){return"".concat(e," ").concat(a.width||"auto"," ")},"")}(d)}),f=r?d.map(function(e,a){var t=e.sort,r=e.label,n=e.style,l=_({},O,{},m,{},n),s=p===a,u=s&&"dsc"===b?T:{},h=s&&"asc"===b?T:{},f=t?o.a.createElement("i",{style:_({},C,{},u)}):null,y=t?o.a.createElement("i",{style:_({},K,{},h)}):null,g=t?function(e){return function(){i(_({},c,{headers:d,sortIndex:e,sortDir:p===e&&"asc"===b?"dsc":"asc"}))}}(a):function(){return null};return o.a.createElement("span",{key:a,style:l,onClick:g},r," ",f," ",y)}):null,y=function(e,a,t,r){if(void 0===r)return e;var n=a[r],l=n.sort,o=n.dataKey,s="function"===typeof l?l:x,c=o||"";return e.sort(function(e,a){return"asc"===t?s(e[c],a[c]):-s(e[c],a[c])})}(e.data,d,b,p).map((a=d,function(e,t){return a.map((r=e,n=t,function(e,a){var t=e.dataKey,l=e.render||I,s=t?"'index'"===t?n+1:r[t]:r;return o.a.createElement("span",{key:a,style:m},l(s)," ")}));var r,n}));return o.a.createElement("div",{className:e.className||"",style:h},f,y)},P=g,G=y.version,A=function(e,a){for(var t=[],r=function(a){var r={};e.forEach(function(e){r[e]=Math.random()}),t=[].concat(Object(b.a)(t),[r])},n=0;n<a;n++)r();return t}(["foo","bar","baz"],5),B=function(e){function a(e){var t;Object(i.a)(this,a),(t=Object(u.a)(this,Object(m.a)(a).call(this,e))).randomFilenames=["copy","new-hot-startup","foobarbaz","blockchainz","stuff","wack-wack-wack","1"],t.randomFilename=t.randomFilenames[0];var r=Math.floor(Math.random()*t.randomFilenames.length);t.randomFilename=t.randomFilenames[r]||t.randomFilename;e.lang;return t}return Object(p.a)(a,e),Object(d.a)(a,[{key:"render",value:function(){var e=function(e){var a=P.en[e]||"";return"".concat(a)||"\u274c"};return o.a.createElement("div",{className:"page-content"},o.a.createElement("div",{className:"wrapper"},o.a.createElement("h1",null,o.a.createElement("span",{role:"img","aria-label":"Bento"},"\ud83c\udf71")," NaiveTable"),o.a.createElement("h2",null,e("w1")," ",e("w2")," ",e("w3")," ","Array<T>"," ",e("w7"),e("w4")," ",o.a.createElement("a",{href:"https://reactjs.org/"},"React")," ",o.a.createElement("a",{href:"https://reactjs.org/docs/hooks-intro.html/"},"(Hooks)"),"  ",e("w8")),o.a.createElement("span",null,o.a.createElement("h3",null,"v",G," -"," ",o.a.createElement(s.b,{to:"/test"},"Tests"),"-"," ",o.a.createElement("a",{href:"https://github.com/untra/naivetable"},"Github")," -"," ",o.a.createElement("a",{href:"https://www.npmjs.com/package/@untra/naivetable"},"NPM")," -"," ",o.a.createElement("a",{href:"https://dashboard.cypress.io/#/projects/wrytfx/runs"},"Cypress"))),o.a.createElement("hr",null),o.a.createElement("div",{style:{padding:"50px",color:"dark gray",textAlign:"center"}},o.a.createElement("h4",null,o.a.createElement("strong",null,"NaiveTable")," ",e("i1")," ",o.a.createElement("br",null),"(typescript type ",o.a.createElement("code",null,"Array<T> of {[index: string]: any}"),")",o.a.createElement("br",null),e("i2a"),o.a.createElement("code",null," Array<T> "),e("i2b"),o.a.createElement("br",null),e("i2c"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("code",null,"<NaiveTable data={data} />"))),o.a.createElement(f.a,{className:"tsx"},"// react-app-".concat(this.randomFilename,'.tsx\nimport React from "react";\nimport { NaiveTable } from "@untra/naivetable";\n// ').concat(e("h0a"),"\nconst data = [").concat(JSON.stringify(A[0],null,2),", ...];\n// ").concat(e("h0b"),"\n<NaiveTable data={data} />")),o.a.createElement(M,{data:A})))}}]),a}(o.a.Component),F=t(28),R=t(29),z=t(30),q=t(31),H=t(32),J=R,V=H,W=q,Y=z,U=[{label:"",dataKey:"",style:{display:"none"},render:function(e){var a=e.local_image,t=e.name;return o.a.createElement("img",{width:250,height:345,alt:t,src:a})}},{label:"",dataKey:"",style:{display:"none"},render:function(e){var a=e.name,t=e.mana_cost,r=e.type_line,n=e.oracle_text,l=e.power,s=e.toughness,c=e.flavor_text;return o.a.createElement("div",null,o.a.createElement("h4",null,a," ",t),o.a.createElement("p",null,r),o.a.createElement("p",null,n),o.a.createElement("p",{style:{fontStyle:"italic"}},c),o.a.createElement("strong",null,l,"/",s))}}],Q=[{label:"name",dataKey:"a"},{label:"age",dataKey:"b",style:{backgroundColor:"pink"}},{label:"grade status",dataKey:"c",render:function(e){return o.a.createElement("h2",null,"".concat(e>50?"\u2705passing":"\u274cfailing"," the class: ").concat(e))}},{label:"assessment",dataKey:"",render:function(e){return o.a.createElement("h4",null,"".concat(JSON.stringify(e.a)," is ").concat(e.c>90?"really":""," ").concat(e.c>50?"smart":"dumb"))}},{label:"comment",dataKey:"",render:function(){return"Lorem Ipsum this is the same comment rendered over and over again why won't @LILBTHEBASEDGOD tweet about about me?"},width:"4fr"}],X=function(e){function a(){return Object(i.a)(this,a),Object(u.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(p.a)(a,e),Object(d.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{className:"wrapper"},o.a.createElement("h1",null,o.a.createElement("span",{role:"img","aria-label":"Bento"},"\ud83c\udf71")," ","NaiveTable"),o.a.createElement("h2",null,"Cypress Tests and React Hooks demo"),o.a.createElement("h3",null,"View this page and tests at ",o.a.createElement("a",{href:"https://github.com/untra/naivetable/blob/master/src/routes/test.tsx"},"Github.com")),o.a.createElement("h3",null,"View the test results at ",o.a.createElement("a",{href:"https://dashboard.cypress.io/#/projects/wrytfx/runs"},"Cypress.io")),o.a.createElement("p",null,"This page is a demonstration of the NaiveTable component used in a variety of ways:"),o.a.createElement("ul",null,o.a.createElement("li",null,"It is the selection and input to a variety of cypress tests."),o.a.createElement("li",null,"View the chrome console to see statistics and reports of how the examples render."),o.a.createElement("li",null,"This is also a demonstration of the power of react-hooks, a functional and clean approach to writing react components.")),o.a.createElement("h4",null,"#1 It should be able to render a variety of different javascript data types"),o.a.createElement(M,{className:"test1",data:V}),o.a.createElement("h4",null,"#2 It should be able to render an index left adjacent of the data"),o.a.createElement(M,{className:"test2",data:Y,includeIndex:!0}),o.a.createElement("h4",null,"#3 It should be able to render a table with custom headers"),o.a.createElement(M,{className:"test3",data:Y,headers:Q}),o.a.createElement("h4",null,"#4 It should be able to render individual styling on each header"),o.a.createElement(M,{className:"test4",data:Y,headers:W}),o.a.createElement("h4",null,"#5 It should be able to render individual styling for the table"),"TODO",o.a.createElement("h4",null,"#6 It should be able to render individual styling for each cell"),"TODO",o.a.createElement("h4",null,"#7 It should be able to display sortable columns"),"TODO",o.a.createElement("h4",null,"#8 It should display sorted column data sorted correctly"),o.a.createElement(M,{className:"test8",data:F,headers:[{label:"a",dataKey:"a",sort:!0},{label:"b",dataKey:"b",sort:"asc"},{label:"c",dataKey:"c"}]}),o.a.createElement("h4",null,"#9 It should be able to render empty data"),o.a.createElement(M,{className:"test9",data:[]}),o.a.createElement("h4",null,"#10 It should be able to render a data of one"),o.a.createElement(M,{className:"test10",data:[{of:"one"}]}),o.a.createElement("h4",null,"#11 You don't have to render any headers at"),o.a.createElement(M,{className:"test11",data:Y,headers:!1}),o.a.createElement("h4",null,"#12 You can render a Magic The Gathering card"),o.a.createElement(M,{className:"test11",data:J,headers:U}))}}]),a}(o.a.Component),Z=function(){return window.location.reload()};n.a.render(o.a.createElement(s.a,{basename:"/"},o.a.createElement(c.c,null,o.a.createElement(c.a,{path:"/test",component:X,onEnter:Z}),o.a.createElement(c.a,{exact:!0,path:"/",component:B}),o.a.createElement(c.a,{component:function(){return o.a.createElement("div",{className:"wrapper"},o.a.createElement("h1",null,"404 Not found")," ")}}))),document.getElementById("root"))},24:function(e){e.exports={en:{xx:"english",n1:"alex",n2:"brock",n3:"charlie",w0:"it is",w1:"a dumb",w2:"simple",w3:"naive",w4:"table",w5:"consistent",w6:"assuming",w7:"data",w8:"component",w9:"stupid",p1:"Just feed it",p2:"provide headers",p3:"for more granular control",p4:"style the table",p5:"and make it easily fit your app",i1:"is a straightforward React Hooks functional component that will quickly render a table from an array of objects",i2a:"Naivetable does one thing and does it well: visualizing ",i2b:"data in a clean and concise manner",i2c:"with a few choice assumptions on style:",h0a:"an array of objects, just as God intended",h0b:"give it your data, and voila!",h1a:"if you need a rendered table of data RIGHT NOW",h1b:"NaiveTable just infers the headers 'a', 'b', and 'c'",h1c:"this is the most straightforward way to use NaiveTable",o1:"Usage",o2:"Design",o3:"Compatability",o4:"Copyright",copyright:"Copyright (c) Samuel Volin 2019. License: MIT"}}},28:function(e){e.exports=[{a:2,b:1,c:"2 - two"},{a:3,b:2,c:"3 - three"},{a:1,b:3,c:"1 - one"},{a:5,b:4,c:"5 - five"},{a:4,b:5,c:"4 - four"}]},29:function(e){e.exports=[{local_image:"https://naivetable.untra.io/images/llanowar-elves.jpg",shoutout:"special shoutout to scryfall for this little hunk of json",shoutout_url:"https://scryfall.com/card/ema/175/llanowar-elves",object:"card",id:"1f8a1386-77ca-46ae-8987-aaed435556ea",oracle_id:"68954295-54e3-4303-a6bc-fc4547a4e3a3",multiverse_ids:[413717],mtgo_id:61001,mtgo_foil_id:61002,tcgplayer_id:118678,name:"Llanowar Elves",lang:"en",released_at:"2016-06-10",uri:"https://api.scryfall.com/cards/1f8a1386-77ca-46ae-8987-aaed435556ea",scryfall_uri:"https://scryfall.com/card/ema/175/llanowar-elves?utm_source=api",layout:"normal",highres_image:!0,image_uris:{small:"https://img.scryfall.com/cards/small/en/ema/175.jpg?1519048877",normal:"https://img.scryfall.com/cards/normal/en/ema/175.jpg?1519048877",large:"https://img.scryfall.com/cards/large/en/ema/175.jpg?1519048877",png:"https://img.scryfall.com/cards/png/en/ema/175.png?1519048877",art_crop:"https://img.scryfall.com/cards/art_crop/en/ema/175.jpg?1519048877",border_crop:"https://img.scryfall.com/cards/border_crop/en/ema/175.jpg?1519048877"},mana_cost:"{G}",cmc:1,type_line:"Creature \u2014 Elf Druid",oracle_text:"{T}: Add {G}.",power:"1",toughness:"1",colors:["G"],color_identity:["G"],legalities:{standard:"legal",future:"legal",frontier:"legal",modern:"legal",legacy:"legal",pauper:"legal",vintage:"legal",penny:"legal",commander:"legal",duel:"legal",oldschool:"not_legal"},games:["mtgo","paper"],reserved:!1,foil:!0,nonfoil:!0,oversized:!1,promo:!1,reprint:!0,variation:!1,set:"ema",set_name:"Eternal Masters",set_type:"masters",set_uri:"https://api.scryfall.com/sets/1f29f022-3ace-4c96-85e8-1f7b63aadf7e",set_search_uri:"https://api.scryfall.com/cards/search?order=set&q=e%3Aema&unique=prints",scryfall_set_uri:"https://scryfall.com/sets/ema?utm_source=api",rulings_uri:"https://api.scryfall.com/cards/1f8a1386-77ca-46ae-8987-aaed435556ea/rulings",prints_search_uri:"https://api.scryfall.com/cards/search?order=released&q=oracleid%3A68954295-54e3-4303-a6bc-fc4547a4e3a3&unique=prints",collector_number:"175",digital:!1,rarity:"common",flavor_text:"One bone broken for every twig snapped underfoot. \u2014Llanowar penalty for trespassing",illustration_id:"96ffb0f9-113f-4fff-a45f-69cbb8d60890",card_back_id:"0aeebaf5-8c7d-4636-9e82-8c27447861f7",artist:"Kev Walker",border_color:"black",frame:"2015",full_art:!1,textless:!1,booster:!0,story_spotlight:!1,promo_types:"#<Set: {}>",edhrec_rank:80,prices:{usd:"0.18",usd_foil:"0.87",eur:"0.12",tix:"0.03"},related_uris:{gatherer:"https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=413717",tcgplayer_decks:"https://decks.tcgplayer.com/magic/deck/search?contains=Llanowar+Elves&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",edhrec:"http://edhrec.com/route/?cc=Llanowar+Elves",mtgtop8:"http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Llanowar+Elves"},purchase_uris:{tcgplayer:"https://shop.tcgplayer.com/product/productsearch?id=118678&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",cardmarket:"https://www.cardmarket.com/en/Magic/Products/Singles/Eternal-Masters/Llanowar-Elves?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",cardhoarder:"https://www.cardhoarder.com/cards/61001?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"}}]},30:function(e){e.exports=[{a:"alex",b:12,c:82.56},{a:"brock",b:17,c:93.33},{a:"charlie",b:16,c:48.65}]},31:function(e){e.exports=[{label:"name",dataKey:"a",style:{backgroundColor:"red"}},{label:"age",dataKey:"b",style:{backgroundColor:"green"}},{label:"mana",dataKey:"c",style:{backgroundColor:"blue"}},{label:"missing",dataKey:"",style:{backgroundColor:"yellow",opacity:.5}},{label:"stretch index",dataKey:"'index'",style:{backgroundColor:"red",transform:"scale(2, 0.5)",color:"white"}},{label:"flip index",dataKey:"'index'",style:{backgroundColor:"yellow",transform:"rotate(0.5turn)",color:"white"}},{label:"skew index",dataKey:"'index'",style:{backgroundColor:"green",transform:"skew(30deg, 20deg)",color:"white"}},{label:"shift index",dataKey:"'index'",style:{backgroundColor:"cyan",transform:"translate(120px, 50%)",color:"black"}},{label:"keanu index",dataKey:"'index'",style:{backgroundColor:"blue",transform:"matrix(1, 2, 3, 4, 5, 6)",color:"black"}}]},32:function(e){e.exports=[{numbers:1,strings:"2",floats:3.1,existential:!0,arrays:["of","strings"]},{numbers:4,strings:"5",floats:6.28921,existential:!1,arrays:[420,1.618,-69]},{numbers:7,strings:"6",floats:-9.329088,existential:null,arrays:["mixed",93.3,!0,null]},{numbers:10,strings:"11",floats:12.48721296,arrays:[]}]},33:function(e,a,t){e.exports=t(231)}},[[33,1,2]]]);
//# sourceMappingURL=main.852c522e.chunk.js.map