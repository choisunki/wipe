jQuery,$.fn.wipe=function(t){window.wiperCounts=0;var i=$.extend({sectClass:".sect",wrap:"tit_in",duration:1.2,delay:.2,ease:"cubic-bezier(0.64, 0.12, 0.19, 0.62)",direction:"left",classToAdd:"vis",classToRemove:"invisible",offset:100,invertBottomOffset:!0,repeat:!1,callbackFunction:function(t,i){},scrollHorizontal:!1},t);function n(t,i){var n=$.extend({type:"px",media:"1380",designSize:1920},i),h={};if("px"==n.type){var e=1;"1380"==n.media?e=.71875:"1920"==n.media&&(e=1),h={width:t.width*e+"px",height:t.height*e+"px"}}else"vw"==n.type&&(h={width:t.width/(.01*n.designSize)+"vw",height:t.height/(.01*n.designSize)+"vw"});return h}return this.each((function(){var t=!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i));i.isMobile&&(t=!0);var h,e,s=$(this),o=s.closest(i.sectClass),d=s.find("img"),a=(h=d.attr("src"),(e=new Image).src=h,e.height,e.width,p=$(e).ready((function(){return{width:e.width,height:e.height}})),{width:p[0].width,height:p[0].height}),r=n(a,t?{type:"vw",designSize:750}:{type:"vw"}),u=n(a,{type:"px",media:"1380"}),c=n(a,{type:"px",media:"1920"}),g=[];s.css("opacity",0),d.each((function(){var t=new Image;t.onload=(s.css("opacity",1),void setTimeout((function(){window.wiperCounts=window.wiperCounts+1,s.viewportChecker({classToAdd:i.classToAdd,offset:i.offset,repeat:i.repeat,invertBottomOffset:i.invertBottomOffset})}),550)),t.src=$(this).attr("src")})),s.wrapInner('<div class="'+i.wrap+'"></div>'),s.find("."+i.wrap);var l="."+o.attr("class").replace(/ /gi,".");l=l+" ."+s.attr("class").replace(/ /gi,".");var w="width";"top"!=i.direction&&"bottom"!=i.direction||(w="height"),g.push(l+"{\n"),g.push("\twidth:"+r.width+";"),g.push("\n\theight:"+r.height+";"),g.push("\n}\n\n"),g.push(l+" .tit_in{\n"),g.push("\n\tdisplay:block;"),g.push("\n\tposition:relative;"),works.debug&&g.push("\n\tbackground-color: rgba(0,0,0,0.2);"),g.push("\n\toverflow:hidden;"),g.push("\n\t-webkit-transition: "+w+" "+i.duration+"s "+i.delay+"s "+i.ease+";"),g.push("\n\t-khtml-transition: "+w+" "+i.duration+"s "+i.delay+"s "+i.ease+";"),g.push("\n\t-moz-transition: "+w+" "+i.duration+"s "+i.delay+"s "+i.ease+";"),g.push("\n\t-op-transition: "+w+" "+i.duration+"s "+i.delay+"s "+i.ease+";"),g.push("\n\ttransition: "+w+" "+i.duration+"s "+i.delay+"s "+i.ease+";"),"top"!=i.direction&&"bottom"!=i.direction||(g.push("\n\twidth:"+r.width+";"),g.push("\n\theight:0px;")),"bottom"==i.direction&&(g.push("\n\tposition: absolute;"),g.push("\n\ttop: auto;"),g.push("\n\tbottom: 0;")),"left"!=i.direction&&"right"!=i.direction||(g.push("\twidth:0px;"),g.push("\n\theight:"+r.height+";")),"right"==i.direction&&g.push("\n\tfloat: right;"),g.push("\n}\n\n"),g.push(l+" .tit_in > img{\n"),g.push("\n\tmax-width: unset !important;"),"left"!=i.direction&&"right"!=i.direction||g.push("\n\tposition: absolute;"),"left"==i.direction&&(g.push("\n\ttop: 0;"),g.push("\n\tleft: 0;")),"right"==i.direction&&(g.push("\n\ttop: 0;"),g.push("\n\tleft: auto;"),g.push("\n\tright: 0;")),g.push("\n\twidth: "+r.width+";"),"top"!=i.direction&&"bottom"!=i.direction||(g.push("\n\tposition: absolute;"),g.push("\n\tleft: 0;"),g.push("\n\theight: "+r.height+";")),"top"==i.direction&&(g.push("\n\ttop: 0;"),g.push("\n\tbottom: auto;")),"bottom"==i.direction&&(g.push("\n\ttop: auto;"),g.push("\n\tbottom: 0;")),g.push("\n}\n"),g.push(l+"."+i.classToAdd+" .tit_in{\n"),g.push("\twidth:"+r.width+";"),g.push("\n\t-webkit-transition: "+w+" "+i.duration+"s "+i.delay+"s "+i.ease+";"),g.push("\n\t-khtml-transition: "+w+" "+i.duration+"s "+i.delay+"s "+i.ease+";"),g.push("\n\t-moz-transition: "+w+" "+i.duration+"s "+i.delay+"s "+i.ease+";"),g.push("\n\t-op-transition: "+w+" "+i.duration+"s "+i.delay+"s "+i.ease+";"),g.push("\n\ttransition: "+w+" "+i.duration+"s "+i.delay+"s "+i.ease+";"),"top"!=i.direction&&"bottom"!=i.direction||g.push("\n\theight:"+r.height+";"),g.push("\n}\n\n"),t||(g.push("@media all and (max-width: 1380px) {\n"),g.push(l+"{\n"),g.push("\twidth:"+u.width+";"),g.push("\n\theight:"+u.height+";"),g.push("\n}\n\n"),g.push(l+" .tit_in{\n"),"left"!=i.direction&&"right"!=i.direction||g.push("\n\theight:"+u.height+";"),"top"!=i.direction&&"bottom"!=i.direction||g.push("\n\twidth:"+u.width+";"),"top"==i.direction&&g.push("\n\theight:0px;"),g.push("\n}\n\n"),g.push(l+" .tit_in > img{\n"),g.push("\n\twidth: "+u.width+";"),"top"!=i.direction&&"bottom"!=i.direction||g.push("\n\theight: "+u.height+";"),g.push("\n}\n"),g.push(l+"."+i.classToAdd+" .tit_in{\n"),"top"!=i.direction&&"bottom"!=i.direction||(g.push("\n\twidth:"+u.width+";"),g.push("\n\theight:"+u.height+";")),"top"==i.direction&&g.push("\n\theight:"+u.height+";"),g.push("\n}\n\n"),g.push("}\n"),g.push("@media all and (min-width: 1920px) {\n"),g.push(l+"{\n"),g.push("\twidth:"+c.width+";"),g.push("\n\theight:"+c.height+";"),g.push("\n}\n\n"),g.push(l+" .tit_in{\n"),"left"!=i.direction&&"right"!=i.direction||g.push("\n\theight:"+c.height+";"),"top"==i.direction&&g.push("\n\theight:0px;"),g.push("\n}\n\n"),g.push(l+" .tit_in > img{\n"),g.push("\n\twidth: "+c.width+";"),"top"!=i.direction&&"bottom"!=i.direction||g.push("\n\theight: "+c.height+";"),g.push("\n}\n"),g.push(l+"."+i.classToAdd+" .tit_in{\n"),"top"!=i.direction&&"bottom"!=i.direction||(g.push("\n\twidth:"+c.width+";"),g.push("\n\theight:"+c.height+";")),"top"==i.direction&&g.push("\n\theight:"+c.height+";"),g.push("\n}\n\n"),g.push("}\n")),console.log(g.join("")),$("head").append("<style>"+g.join("")+"</style>")}))};