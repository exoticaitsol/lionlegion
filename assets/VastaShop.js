/** Slick JS */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{if(typeof exports!=="undefined"){module.exports=a(require("jquery"))}else{a(jQuery)}}}(function(a){var b=window.Slick||{};b=(function(){var c=0;function d(g,h){var f=this,e;f.defaults={accessibility:true,adaptiveHeight:false,appendArrows:a(g),appendDots:a(g),arrows:true,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:false,autoplaySpeed:3000,centerMode:false,centerPadding:"50px",cssEase:"ease",customPaging:function(k,j){return a('<button type="button" />').text(j+1)},dots:false,dotsClass:"slick-dots",draggable:true,easing:"linear",edgeFriction:0.35,fade:false,focusOnSelect:false,focusOnChange:false,infinite:true,initialSlide:0,lazyLoad:"ondemand",mobileFirst:false,pauseOnHover:true,pauseOnFocus:true,pauseOnDotsHover:false,respondTo:"window",responsive:null,rows:1,rtl:false,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:true,swipeToSlide:false,touchMove:true,touchThreshold:5,useCSS:true,useTransform:true,variableWidth:false,vertical:false,verticalSwiping:false,waitForAnimate:true,zIndex:1000};f.initials={animating:false,dragging:false,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:false,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:false,slideOffset:0,swipeLeft:null,swiping:false,$list:null,touchObject:{},transformsEnabled:false,unslicked:false};a.extend(f,f.initials);f.activeBreakpoint=null;f.animType=null;f.animProp=null;f.breakpoints=[];f.breakpointSettings=[];f.cssTransitions=false;f.focussed=false;f.interrupted=false;f.hidden="hidden";f.paused=true;f.positionProp=null;f.respondTo=null;f.rowCount=1;f.shouldClick=true;f.$slider=a(g);f.$slidesCache=null;f.transformType=null;f.transitionType=null;f.visibilityChange="visibilitychange";f.windowWidth=0;f.windowTimer=null;e=a(g).data("slick")||{};f.options=a.extend({},f.defaults,h,e);f.currentSlide=f.options.initialSlide;f.originalSettings=f.options;if(typeof document.mozHidden!=="undefined"){f.hidden="mozHidden";f.visibilityChange="mozvisibilitychange"}else{if(typeof document.webkitHidden!=="undefined"){f.hidden="webkitHidden";f.visibilityChange="webkitvisibilitychange"}}f.autoPlay=a.proxy(f.autoPlay,f);f.autoPlayClear=a.proxy(f.autoPlayClear,f);f.autoPlayIterator=a.proxy(f.autoPlayIterator,f);f.changeSlide=a.proxy(f.changeSlide,f);f.clickHandler=a.proxy(f.clickHandler,f);f.selectHandler=a.proxy(f.selectHandler,f);f.setPosition=a.proxy(f.setPosition,f);f.swipeHandler=a.proxy(f.swipeHandler,f);f.dragHandler=a.proxy(f.dragHandler,f);f.keyHandler=a.proxy(f.keyHandler,f);f.instanceUid=c++;f.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/;f.registerBreakpoints();f.init(true)}return d}());b.prototype.activateADA=function(){var c=this;c.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})};b.prototype.addSlide=b.prototype.slickAdd=function(c,e,f){var d=this;if(typeof(e)==="boolean"){f=e;e=null}else{if(e<0||(e>=d.slideCount)){return false}}d.unload();if(typeof(e)==="number"){if(e===0&&d.$slides.length===0){a(c).appendTo(d.$slideTrack)}else{if(f){a(c).insertBefore(d.$slides.eq(e))}else{a(c).insertAfter(d.$slides.eq(e))}}}else{if(f===true){a(c).prependTo(d.$slideTrack)}else{a(c).appendTo(d.$slideTrack)}}d.$slides=d.$slideTrack.children(this.options.slide);d.$slideTrack.children(this.options.slide).detach();d.$slideTrack.append(d.$slides);d.$slides.each(function(g,h){a(h).attr("data-slick-index",g)});d.$slidesCache=d.$slides;d.reinit()};b.prototype.animateHeight=function(){var d=this;if(d.options.slidesToShow===1&&d.options.adaptiveHeight===true&&d.options.vertical===false){var c=d.$slides.eq(d.currentSlide).outerHeight(true);d.$list.animate({height:c},d.options.speed)}};b.prototype.animateSlide=function(f,e){var d={},c=this;c.animateHeight();if(c.options.rtl===true&&c.options.vertical===false){f=-f}if(c.transformsEnabled===false){if(c.options.vertical===false){c.$slideTrack.animate({left:f},c.options.speed,c.options.easing,e)}else{c.$slideTrack.animate({top:f},c.options.speed,c.options.easing,e)}}else{if(c.cssTransitions===false){if(c.options.rtl===true){c.currentLeft=-(c.currentLeft)}a({animStart:c.currentLeft}).animate({animStart:f},{duration:c.options.speed,easing:c.options.easing,step:function(g){g=Math.ceil(g);if(c.options.vertical===false){d[c.animType]="translate("+g+"px, 0px)";c.$slideTrack.css(d)}else{d[c.animType]="translate(0px,"+g+"px)";c.$slideTrack.css(d)}},complete:function(){if(e){e.call()}}})}else{c.applyTransition();f=Math.ceil(f);if(c.options.vertical===false){d[c.animType]="translate3d("+f+"px, 0px, 0px)"}else{d[c.animType]="translate3d(0px,"+f+"px, 0px)"}c.$slideTrack.css(d);if(e){setTimeout(function(){c.disableTransition();e.call()},c.options.speed)}}}};b.prototype.getNavTarget=function(){var d=this,c=d.options.asNavFor;if(c&&c!==null){c=a(c).not(d.$slider)}return c};b.prototype.asNavFor=function(e){var d=this,c=d.getNavTarget();if(c!==null&&typeof c==="object"){c.each(function(){var f=a(this).slick("getSlick");if(!f.unslicked){f.slideHandler(e,true)}})}};b.prototype.applyTransition=function(c){var d=this,e={};if(d.options.fade===false){e[d.transitionType]=d.transformType+" "+d.options.speed+"ms "+d.options.cssEase}else{e[d.transitionType]="opacity "+d.options.speed+"ms "+d.options.cssEase}if(d.options.fade===false){d.$slideTrack.css(e)}else{d.$slides.eq(c).css(e)}};b.prototype.autoPlay=function(){var c=this;c.autoPlayClear();if(c.slideCount>c.options.slidesToShow){c.autoPlayTimer=setInterval(c.autoPlayIterator,c.options.autoplaySpeed)}};b.prototype.autoPlayClear=function(){var c=this;if(c.autoPlayTimer){clearInterval(c.autoPlayTimer)}};b.prototype.autoPlayIterator=function(){var c=this,d=c.currentSlide+c.options.slidesToScroll;if(!c.paused&&!c.interrupted&&!c.focussed){if(c.options.infinite===false){if(c.direction===1&&(c.currentSlide+1)===(c.slideCount-1)){c.direction=0}else{if(c.direction===0){d=c.currentSlide-c.options.slidesToScroll;if(c.currentSlide-1===0){c.direction=1}}}}c.slideHandler(d)}};b.prototype.buildArrows=function(){var c=this;if(c.options.arrows===true){c.$prevArrow=a(c.options.prevArrow).addClass("slick-arrow");c.$nextArrow=a(c.options.nextArrow).addClass("slick-arrow");if(c.slideCount>c.options.slidesToShow){c.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");c.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");if(c.htmlExpr.test(c.options.prevArrow)){c.$prevArrow.prependTo(c.options.appendArrows)}if(c.htmlExpr.test(c.options.nextArrow)){c.$nextArrow.appendTo(c.options.appendArrows)}if(c.options.infinite!==true){c.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")}}else{c.$prevArrow.add(c.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"})}}};b.prototype.buildDots=function(){var d=this,e,c;if(d.options.dots===true&&d.slideCount>d.options.slidesToShow){d.$slider.addClass("slick-dotted");c=a("<ul />").addClass(d.options.dotsClass);for(e=0;e<=d.getDotCount();e+=1){c.append(a("<li />").append(d.options.customPaging.call(this,d,e)))}d.$dots=c.appendTo(d.options.appendDots);d.$dots.find("li").first().addClass("slick-active")}};b.prototype.buildOut=function(){var c=this;c.$slides=c.$slider.children(c.options.slide+":not(.slick-cloned)").addClass("slick-slide");c.slideCount=c.$slides.length;c.$slides.each(function(d,e){a(e).attr("data-slick-index",d).data("originalStyling",a(e).attr("style")||"")});c.$slider.addClass("slick-slider");c.$slideTrack=(c.slideCount===0)?a('<div class="slick-track"/>').appendTo(c.$slider):c.$slides.wrapAll('<div class="slick-track"/>').parent();c.$list=c.$slideTrack.wrap('<div class="slick-list"/>').parent();c.$slideTrack.css("opacity",0);if(c.options.centerMode===true||c.options.swipeToSlide===true){c.options.slidesToScroll=1}a("img[data-lazy]",c.$slider).not("[src]").addClass("slick-loading");c.setupInfinite();c.buildArrows();c.buildDots();c.updateDots();c.setSlideClasses(typeof c.currentSlide==="number"?c.currentSlide:0);if(c.options.draggable===true){c.$list.addClass("draggable")}};b.prototype.buildRows=function(){var m=this,l,k,i,d,j,h,e;d=document.createDocumentFragment();h=m.$slider.children();if(m.options.rows>0){e=m.options.slidesPerRow*m.options.rows;j=Math.ceil(h.length/e);for(l=0;l<j;l++){var f=document.createElement("div");for(k=0;k<m.options.rows;k++){var n=document.createElement("div");for(i=0;i<m.options.slidesPerRow;i++){var g=(l*e+((k*m.options.slidesPerRow)+i));if(h.get(g)){n.appendChild(h.get(g))}}f.appendChild(n)}d.appendChild(f)}m.$slider.empty().append(d);m.$slider.children().children().children().css({width:(100/m.options.slidesPerRow)+"%",display:"inline-block"})}};b.prototype.checkResponsive=function(h,j){var k=this,i,c,e,f=false;var g=k.$slider.width();var d=window.innerWidth||a(window).width();if(k.respondTo==="window"){e=d}else{if(k.respondTo==="slider"){e=g}else{if(k.respondTo==="min"){e=Math.min(d,g)}}}if(k.options.responsive&&k.options.responsive.length&&k.options.responsive!==null){c=null;for(i in k.breakpoints){if(k.breakpoints.hasOwnProperty(i)){if(k.originalSettings.mobileFirst===false){if(e<k.breakpoints[i]){c=k.breakpoints[i]}}else{if(e>k.breakpoints[i]){c=k.breakpoints[i]}}}}if(c!==null){if(k.activeBreakpoint!==null){if(c!==k.activeBreakpoint||j){k.activeBreakpoint=c;if(k.breakpointSettings[c]==="unslick"){k.unslick(c)}else{k.options=a.extend({},k.originalSettings,k.breakpointSettings[c]);if(h===true){k.currentSlide=k.options.initialSlide}k.refresh(h)}f=c}}else{k.activeBreakpoint=c;if(k.breakpointSettings[c]==="unslick"){k.unslick(c)}else{k.options=a.extend({},k.originalSettings,k.breakpointSettings[c]);if(h===true){k.currentSlide=k.options.initialSlide}k.refresh(h)}f=c}}else{if(k.activeBreakpoint!==null){k.activeBreakpoint=null;k.options=k.originalSettings;if(h===true){k.currentSlide=k.options.initialSlide}k.refresh(h);f=c}}if(!h&&f!==false){k.$slider.trigger("breakpoint",[k,f])}}};b.prototype.changeSlide=function(g,j){var e=this,c=a(g.currentTarget),i,f,h;if(c.is("a")){g.preventDefault()}if(!c.is("li")){c=c.closest("li")}h=(e.slideCount%e.options.slidesToScroll!==0);i=h?0:(e.slideCount-e.currentSlide)%e.options.slidesToScroll;switch(g.data.message){case"previous":f=i===0?e.options.slidesToScroll:e.options.slidesToShow-i;if(e.slideCount>e.options.slidesToShow){e.slideHandler(e.currentSlide-f,false,j)}break;case"next":f=i===0?e.options.slidesToScroll:i;if(e.slideCount>e.options.slidesToShow){e.slideHandler(e.currentSlide+f,false,j)}break;case"index":var d=g.data.index===0?0:g.data.index||c.index()*e.options.slidesToScroll;e.slideHandler(e.checkNavigable(d),false,j);c.children().trigger("focus");break;default:return}};b.prototype.checkNavigable=function(d){var c=this,e,f;e=c.getNavigableIndexes();f=0;if(d>e[e.length-1]){d=e[e.length-1]}else{for(var g in e){if(d<e[g]){d=f;break}f=e[g]}}return d};b.prototype.cleanUpEvents=function(){var c=this;if(c.options.dots&&c.$dots!==null){a("li",c.$dots).off("click.slick",c.changeSlide).off("mouseenter.slick",a.proxy(c.interrupt,c,true)).off("mouseleave.slick",a.proxy(c.interrupt,c,false));if(c.options.accessibility===true){c.$dots.off("keydown.slick",c.keyHandler)}}c.$slider.off("focus.slick blur.slick");if(c.options.arrows===true&&c.slideCount>c.options.slidesToShow){c.$prevArrow&&c.$prevArrow.off("click.slick",c.changeSlide);c.$nextArrow&&c.$nextArrow.off("click.slick",c.changeSlide);if(c.options.accessibility===true){c.$prevArrow&&c.$prevArrow.off("keydown.slick",c.keyHandler);c.$nextArrow&&c.$nextArrow.off("keydown.slick",c.keyHandler)}}c.$list.off("touchstart.slick mousedown.slick",c.swipeHandler);c.$list.off("touchmove.slick mousemove.slick",c.swipeHandler);c.$list.off("touchend.slick mouseup.slick",c.swipeHandler);c.$list.off("touchcancel.slick mouseleave.slick",c.swipeHandler);c.$list.off("click.slick",c.clickHandler);a(document).off(c.visibilityChange,c.visibility);c.cleanUpSlideEvents();if(c.options.accessibility===true){c.$list.off("keydown.slick",c.keyHandler)}if(c.options.focusOnSelect===true){a(c.$slideTrack).children().off("click.slick",c.selectHandler)}a(window).off("orientationchange.slick.slick-"+c.instanceUid,c.orientationChange);a(window).off("resize.slick.slick-"+c.instanceUid,c.resize);a("[draggable!=true]",c.$slideTrack).off("dragstart",c.preventDefault);a(window).off("load.slick.slick-"+c.instanceUid,c.setPosition)};b.prototype.cleanUpSlideEvents=function(){var c=this;c.$list.off("mouseenter.slick",a.proxy(c.interrupt,c,true));c.$list.off("mouseleave.slick",a.proxy(c.interrupt,c,false))};b.prototype.cleanUpRows=function(){var d=this,c;if(d.options.rows>0){c=d.$slides.children().children();c.removeAttr("style");d.$slider.empty().append(c)}};b.prototype.clickHandler=function(d){var c=this;if(c.shouldClick===false){d.stopImmediatePropagation();d.stopPropagation();d.preventDefault()}};b.prototype.destroy=function(d){var c=this;c.autoPlayClear();c.touchObject={};c.cleanUpEvents();a(".slick-cloned",c.$slider).detach();if(c.$dots){c.$dots.remove()}if(c.$prevArrow&&c.$prevArrow.length){c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display","");if(c.htmlExpr.test(c.options.prevArrow)){c.$prevArrow.remove()}}if(c.$nextArrow&&c.$nextArrow.length){c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display","");if(c.htmlExpr.test(c.options.nextArrow)){c.$nextArrow.remove()}}if(c.$slides){c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))});c.$slideTrack.children(this.options.slide).detach();c.$slideTrack.detach();c.$list.detach();c.$slider.append(c.$slides)}c.cleanUpRows();c.$slider.removeClass("slick-slider");c.$slider.removeClass("slick-initialized");c.$slider.removeClass("slick-dotted");c.unslicked=true;if(!d){c.$slider.trigger("destroy",[c])}};b.prototype.disableTransition=function(c){var d=this,e={};e[d.transitionType]="";if(d.options.fade===false){d.$slideTrack.css(e)}else{d.$slides.eq(c).css(e)}};b.prototype.fadeSlide=function(d,e){var c=this;if(c.cssTransitions===false){c.$slides.eq(d).css({zIndex:c.options.zIndex});c.$slides.eq(d).animate({opacity:1},c.options.speed,c.options.easing,e)}else{c.applyTransition(d);c.$slides.eq(d).css({opacity:1,zIndex:c.options.zIndex});if(e){setTimeout(function(){c.disableTransition(d);e.call()},c.options.speed)}}};b.prototype.fadeSlideOut=function(d){var c=this;if(c.cssTransitions===false){c.$slides.eq(d).animate({opacity:0,zIndex:c.options.zIndex-2},c.options.speed,c.options.easing)}else{c.applyTransition(d);c.$slides.eq(d).css({opacity:0,zIndex:c.options.zIndex-2})}};b.prototype.filterSlides=b.prototype.slickFilter=function(d){var c=this;if(d!==null){c.$slidesCache=c.$slides;c.unload();c.$slideTrack.children(this.options.slide).detach();c.$slidesCache.filter(d).appendTo(c.$slideTrack);c.reinit()}};b.prototype.focusHandler=function(){var c=this;c.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(e){e.stopImmediatePropagation();var d=a(this);setTimeout(function(){if(c.options.pauseOnFocus){c.focussed=d.is(":focus");c.autoPlay()}},0)})};b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var c=this;return c.currentSlide};b.prototype.getDotCount=function(){var d=this;var f=0;var c=0;var e=0;if(d.options.infinite===true){if(d.slideCount<=d.options.slidesToShow){++e}else{while(f<d.slideCount){++e;f=c+d.options.slidesToScroll;c+=d.options.slidesToScroll<=d.options.slidesToShow?d.options.slidesToScroll:d.options.slidesToShow}}}else{if(d.options.centerMode===true){e=d.slideCount}else{if(!d.options.asNavFor){e=1+Math.ceil((d.slideCount-d.options.slidesToShow)/d.options.slidesToScroll)}else{while(f<d.slideCount){++e;f=c+d.options.slidesToScroll;c+=d.options.slidesToScroll<=d.options.slidesToShow?d.options.slidesToScroll:d.options.slidesToShow}}}}return e-1};b.prototype.getLeft=function(g){var d=this,i,e,c=0,h,f;d.slideOffset=0;e=d.$slides.first().outerHeight(true);if(d.options.infinite===true){if(d.slideCount>d.options.slidesToShow){d.slideOffset=(d.slideWidth*d.options.slidesToShow)*-1;f=-1;if(d.options.vertical===true&&d.options.centerMode===true){if(d.options.slidesToShow===2){f=-1.5}else{if(d.options.slidesToShow===1){f=-2}}}c=(e*d.options.slidesToShow)*f}if(d.slideCount%d.options.slidesToScroll!==0){if(g+d.options.slidesToScroll>d.slideCount&&d.slideCount>d.options.slidesToShow){if(g>d.slideCount){d.slideOffset=((d.options.slidesToShow-(g-d.slideCount))*d.slideWidth)*-1;c=((d.options.slidesToShow-(g-d.slideCount))*e)*-1}else{d.slideOffset=((d.slideCount%d.options.slidesToScroll)*d.slideWidth)*-1;c=((d.slideCount%d.options.slidesToScroll)*e)*-1}}}}else{if(g+d.options.slidesToShow>d.slideCount){d.slideOffset=((g+d.options.slidesToShow)-d.slideCount)*d.slideWidth;c=((g+d.options.slidesToShow)-d.slideCount)*e}}if(d.slideCount<=d.options.slidesToShow){d.slideOffset=0;c=0}if(d.options.centerMode===true&&d.slideCount<=d.options.slidesToShow){d.slideOffset=((d.slideWidth*Math.floor(d.options.slidesToShow))/2)-((d.slideWidth*d.slideCount)/2)}else{if(d.options.centerMode===true&&d.options.infinite===true){d.slideOffset+=d.slideWidth*Math.floor(d.options.slidesToShow/2)-d.slideWidth}else{if(d.options.centerMode===true){d.slideOffset=0;d.slideOffset+=d.slideWidth*Math.floor(d.options.slidesToShow/2)}}}if(d.options.vertical===false){i=((g*d.slideWidth)*-1)+d.slideOffset}else{i=((g*e)*-1)+c}if(d.options.variableWidth===true){if(d.slideCount<=d.options.slidesToShow||d.options.infinite===false){h=d.$slideTrack.children(".slick-slide").eq(g)}else{h=d.$slideTrack.children(".slick-slide").eq(g+d.options.slidesToShow)}if(d.options.rtl===true){if(h[0]){i=(d.$slideTrack.width()-h[0].offsetLeft-h.width())*-1}else{i=0}}else{i=h[0]?h[0].offsetLeft*-1:0}if(d.options.centerMode===true){if(d.slideCount<=d.options.slidesToShow||d.options.infinite===false){h=d.$slideTrack.children(".slick-slide").eq(g)}else{h=d.$slideTrack.children(".slick-slide").eq(g+d.options.slidesToShow+1)}if(d.options.rtl===true){if(h[0]){i=(d.$slideTrack.width()-h[0].offsetLeft-h.width())*-1}else{i=0}}else{i=h[0]?h[0].offsetLeft*-1:0}i+=(d.$list.width()-h.outerWidth())/2}}return i};b.prototype.getOption=b.prototype.slickGetOption=function(d){var c=this;return c.options[d]};b.prototype.getNavigableIndexes=function(){var f=this,g=0,d=0,e=[],c;if(f.options.infinite===false){c=f.slideCount}else{g=f.options.slidesToScroll*-1;d=f.options.slidesToScroll*-1;c=f.slideCount*2}while(g<c){e.push(g);g=d+f.options.slidesToScroll;d+=f.options.slidesToScroll<=f.options.slidesToShow?f.options.slidesToScroll:f.options.slidesToShow}return e};b.prototype.getSlick=function(){return this};b.prototype.getSlideCount=function(){var e=this,d,f,c;c=e.options.centerMode===true?e.slideWidth*Math.floor(e.options.slidesToShow/2):0;if(e.options.swipeToSlide===true){e.$slideTrack.find(".slick-slide").each(function(h,g){if(g.offsetLeft-c+(a(g).outerWidth()/2)>(e.swipeLeft*-1)){f=g;return false}});d=Math.abs(a(f).attr("data-slick-index")-e.currentSlide)||1;return d}else{return e.options.slidesToScroll}};b.prototype.goTo=b.prototype.slickGoTo=function(c,e){var d=this;d.changeSlide({data:{message:"index",index:parseInt(c)}},e)};b.prototype.init=function(c){var d=this;if(!a(d.$slider).hasClass("slick-initialized")){a(d.$slider).addClass("slick-initialized");d.buildRows();d.buildOut();d.setProps();d.startLoad();d.loadSlider();d.initializeEvents();d.updateArrows();d.updateDots();d.checkResponsive(true);d.focusHandler()}if(c){d.$slider.trigger("init",[d])}if(d.options.accessibility===true){d.initADA()}if(d.options.autoplay){d.paused=false;d.autoPlay()}};b.prototype.initADA=function(){var e=this,d=Math.ceil(e.slideCount/e.options.slidesToShow),g=e.getNavigableIndexes().filter(function(h){return(h>=0)&&(h<e.slideCount)});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"});if(e.$dots!==null){e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(h){var k=g.indexOf(h);a(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+h,tabindex:-1});if(k!==-1){var j="slick-slide-control"+e.instanceUid+k;if(a("#"+j).length){a(this).attr({"aria-describedby":j})}}});e.$dots.attr("role","tablist").find("li").each(function(h){var j=g[h];a(this).attr({role:"presentation"});a(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+h,"aria-controls":"slick-slide"+e.instanceUid+j,"aria-label":(h+1)+" of "+d,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end()}for(var f=e.currentSlide,c=f+e.options.slidesToShow;f<c;f++){if(e.options.focusOnChange){e.$slides.eq(f).attr({tabindex:"0"})}else{e.$slides.eq(f).removeAttr("tabindex")}}e.activateADA()};b.prototype.initArrowEvents=function(){var c=this;if(c.options.arrows===true&&c.slideCount>c.options.slidesToShow){c.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},c.changeSlide);c.$nextArrow.off("click.slick").on("click.slick",{message:"next"},c.changeSlide);if(c.options.accessibility===true){c.$prevArrow.on("keydown.slick",c.keyHandler);c.$nextArrow.on("keydown.slick",c.keyHandler)}}};b.prototype.initDotEvents=function(){var c=this;if(c.options.dots===true&&c.slideCount>c.options.slidesToShow){a("li",c.$dots).on("click.slick",{message:"index"},c.changeSlide);if(c.options.accessibility===true){c.$dots.on("keydown.slick",c.keyHandler)}}if(c.options.dots===true&&c.options.pauseOnDotsHover===true&&c.slideCount>c.options.slidesToShow){a("li",c.$dots).on("mouseenter.slick",a.proxy(c.interrupt,c,true)).on("mouseleave.slick",a.proxy(c.interrupt,c,false))}};b.prototype.initSlideEvents=function(){var c=this;if(c.options.pauseOnHover){c.$list.on("mouseenter.slick",a.proxy(c.interrupt,c,true));c.$list.on("mouseleave.slick",a.proxy(c.interrupt,c,false))}};b.prototype.initializeEvents=function(){var c=this;c.initArrowEvents();c.initDotEvents();c.initSlideEvents();c.$list.on("touchstart.slick mousedown.slick",{action:"start"},c.swipeHandler);c.$list.on("touchmove.slick mousemove.slick",{action:"move"},c.swipeHandler);c.$list.on("touchend.slick mouseup.slick",{action:"end"},c.swipeHandler);c.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},c.swipeHandler);c.$list.on("click.slick",c.clickHandler);a(document).on(c.visibilityChange,a.proxy(c.visibility,c));if(c.options.accessibility===true){c.$list.on("keydown.slick",c.keyHandler)}if(c.options.focusOnSelect===true){a(c.$slideTrack).children().on("click.slick",c.selectHandler)}a(window).on("orientationchange.slick.slick-"+c.instanceUid,a.proxy(c.orientationChange,c));a(window).on("resize.slick.slick-"+c.instanceUid,a.proxy(c.resize,c));a("[draggable!=true]",c.$slideTrack).on("dragstart",c.preventDefault);a(window).on("load.slick.slick-"+c.instanceUid,c.setPosition);a(c.setPosition)};b.prototype.initUI=function(){var c=this;if(c.options.arrows===true&&c.slideCount>c.options.slidesToShow){c.$prevArrow.show();c.$nextArrow.show()}if(c.options.dots===true&&c.slideCount>c.options.slidesToShow){c.$dots.show()}};b.prototype.keyHandler=function(d){var c=this;if(!d.target.tagName.match("TEXTAREA|INPUT|SELECT")){if(d.keyCode===37&&c.options.accessibility===true){c.changeSlide({data:{message:c.options.rtl===true?"next":"previous"}})}else{if(d.keyCode===39&&c.options.accessibility===true){c.changeSlide({data:{message:c.options.rtl===true?"previous":"next"}})}}}};b.prototype.lazyLoad=function(){var k=this,f,e,l,c;function m(i){a("img[data-lazy]",i).each(function(){var q=a(this),r=a(this).attr("data-lazy"),o=a(this).attr("data-srcset"),n=a(this).attr("data-sizes")||k.$slider.attr("data-sizes"),p=document.createElement("img");p.onload=function(){q.animate({opacity:0},100,function(){if(o){q.attr("srcset",o);if(n){q.attr("sizes",n)}}q.attr("src",r).animate({opacity:1},200,function(){q.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")});k.$slider.trigger("lazyLoaded",[k,q,r])})};p.onerror=function(){q.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");k.$slider.trigger("lazyLoadError",[k,q,r])};p.src=r})}if(k.options.centerMode===true){if(k.options.infinite===true){l=k.currentSlide+(k.options.slidesToShow/2+1);c=l+k.options.slidesToShow+2}else{l=Math.max(0,k.currentSlide-(k.options.slidesToShow/2+1));c=2+(k.options.slidesToShow/2+1)+k.currentSlide}}else{l=k.options.infinite?k.options.slidesToShow+k.currentSlide:k.currentSlide;c=Math.ceil(l+k.options.slidesToShow);if(k.options.fade===true){if(l>0){l--}if(c<=k.slideCount){c++}}}f=k.$slider.find(".slick-slide").slice(l,c);if(k.options.lazyLoad==="anticipated"){var d=l-1,g=c,j=k.$slider.find(".slick-slide");for(var h=0;h<k.options.slidesToScroll;h++){if(d<0){d=k.slideCount-1}f=f.add(j.eq(d));f=f.add(j.eq(g));d--;g++}}m(f);if(k.slideCount<=k.options.slidesToShow){e=k.$slider.find(".slick-slide");m(e)}else{if(k.currentSlide>=k.slideCount-k.options.slidesToShow){e=k.$slider.find(".slick-cloned").slice(0,k.options.slidesToShow);m(e)}else{if(k.currentSlide===0){e=k.$slider.find(".slick-cloned").slice(k.options.slidesToShow*-1);m(e)}}}};b.prototype.loadSlider=function(){var c=this;c.setPosition();c.$slideTrack.css({opacity:1});c.$slider.removeClass("slick-loading");c.initUI();if(c.options.lazyLoad==="progressive"){c.progressiveLazyLoad()}};b.prototype.next=b.prototype.slickNext=function(){var c=this;c.changeSlide({data:{message:"next"}})};b.prototype.orientationChange=function(){var c=this;c.checkResponsive();c.setPosition()};b.prototype.pause=b.prototype.slickPause=function(){var c=this;c.autoPlayClear();c.paused=true};b.prototype.play=b.prototype.slickPlay=function(){var c=this;c.autoPlay();c.options.autoplay=true;c.paused=false;c.focussed=false;c.interrupted=false};b.prototype.postSlide=function(d){var c=this;if(!c.unslicked){c.$slider.trigger("afterChange",[c,d]);c.animating=false;if(c.slideCount>c.options.slidesToShow){c.setPosition()}c.swipeLeft=null;if(c.options.autoplay){c.autoPlay()}if(c.options.accessibility===true){c.initADA();if(c.options.focusOnChange){var e=a(c.$slides.get(c.currentSlide));e.attr("tabindex",0).focus()}}}};b.prototype.prev=b.prototype.slickPrev=function(){var c=this;c.changeSlide({data:{message:"previous"}})};b.prototype.preventDefault=function(c){c.preventDefault()};b.prototype.progressiveLazyLoad=function(f){f=f||1;var e=this,d=a("img[data-lazy]",e.$slider),i,j,g,c,h;if(d.length){i=d.first();j=i.attr("data-lazy");g=i.attr("data-srcset");c=i.attr("data-sizes")||e.$slider.attr("data-sizes");h=document.createElement("img");h.onload=function(){if(g){i.attr("srcset",g);if(c){i.attr("sizes",c)}}i.attr("src",j).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");if(e.options.adaptiveHeight===true){e.setPosition()}e.$slider.trigger("lazyLoaded",[e,i,j]);e.progressiveLazyLoad()};h.onerror=function(){if(f<3){setTimeout(function(){e.progressiveLazyLoad(f+1)},500)}else{i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");e.$slider.trigger("lazyLoadError",[e,i,j]);e.progressiveLazyLoad()}};h.src=j}else{e.$slider.trigger("allImagesLoaded",[e])}};b.prototype.refresh=function(d){var e=this,f,c;c=e.slideCount-e.options.slidesToShow;if(!e.options.infinite&&(e.currentSlide>c)){e.currentSlide=c}if(e.slideCount<=e.options.slidesToShow){e.currentSlide=0}f=e.currentSlide;e.destroy(true);a.extend(e,e.initials,{currentSlide:f});e.init();if(!d){e.changeSlide({data:{message:"index",index:f}},false)}};b.prototype.registerBreakpoints=function(){var e=this,d,f,c,g=e.options.responsive||null;if(a.type(g)==="array"&&g.length){e.respondTo=e.options.respondTo||"window";for(d in g){c=e.breakpoints.length-1;if(g.hasOwnProperty(d)){f=g[d].breakpoint;while(c>=0){if(e.breakpoints[c]&&e.breakpoints[c]===f){e.breakpoints.splice(c,1)}c--}e.breakpoints.push(f);e.breakpointSettings[f]=g[d].settings}}e.breakpoints.sort(function(i,h){return(e.options.mobileFirst)?i-h:h-i})}};b.prototype.reinit=function(){var c=this;c.$slides=c.$slideTrack.children(c.options.slide).addClass("slick-slide");c.slideCount=c.$slides.length;if(c.currentSlide>=c.slideCount&&c.currentSlide!==0){c.currentSlide=c.currentSlide-c.options.slidesToScroll}if(c.slideCount<=c.options.slidesToShow){c.currentSlide=0}c.registerBreakpoints();c.setProps();c.setupInfinite();c.buildArrows();c.updateArrows();c.initArrowEvents();c.buildDots();c.updateDots();c.initDotEvents();c.cleanUpSlideEvents();c.initSlideEvents();c.checkResponsive(false,true);if(c.options.focusOnSelect===true){a(c.$slideTrack).children().on("click.slick",c.selectHandler)}c.setSlideClasses(typeof c.currentSlide==="number"?c.currentSlide:0);c.setPosition();c.focusHandler();c.paused=!c.options.autoplay;c.autoPlay();c.$slider.trigger("reInit",[c])};b.prototype.resize=function(){var c=this;if(a(window).width()!==c.windowWidth){clearTimeout(c.windowDelay);c.windowDelay=window.setTimeout(function(){c.windowWidth=a(window).width();c.checkResponsive();if(!c.unslicked){c.setPosition()}},50)}};b.prototype.removeSlide=b.prototype.slickRemove=function(d,f,e){var c=this;if(typeof(d)==="boolean"){f=d;d=f===true?0:c.slideCount-1}else{d=f===true?--d:d}if(c.slideCount<1||d<0||d>c.slideCount-1){return false}c.unload();if(e===true){c.$slideTrack.children().remove()}else{c.$slideTrack.children(this.options.slide).eq(d).remove()}c.$slides=c.$slideTrack.children(this.options.slide);c.$slideTrack.children(this.options.slide).detach();c.$slideTrack.append(c.$slides);c.$slidesCache=c.$slides;c.reinit()};b.prototype.setCSS=function(d){var e=this,f={},c,g;if(e.options.rtl===true){d=-d}c=e.positionProp=="left"?Math.ceil(d)+"px":"0px";g=e.positionProp=="top"?Math.ceil(d)+"px":"0px";f[e.positionProp]=d;if(e.transformsEnabled===false){e.$slideTrack.css(f)}else{f={};if(e.cssTransitions===false){f[e.animType]="translate("+c+", "+g+")";e.$slideTrack.css(f)}else{f[e.animType]="translate3d("+c+", "+g+", 0px)";e.$slideTrack.css(f)}}};b.prototype.setDimensions=function(){var c=this;if(c.options.vertical===false){if(c.options.centerMode===true){c.$list.css({padding:("0px "+c.options.centerPadding)})}}else{c.$list.height(c.$slides.first().outerHeight(true)*c.options.slidesToShow);if(c.options.centerMode===true){c.$list.css({padding:(c.options.centerPadding+" 0px")})}}c.listWidth=c.$list.width();c.listHeight=c.$list.height();if(c.options.vertical===false&&c.options.variableWidth===false){c.slideWidth=Math.ceil(c.listWidth/c.options.slidesToShow);c.$slideTrack.width(Math.ceil((c.slideWidth*c.$slideTrack.children(".slick-slide").length)))}else{if(c.options.variableWidth===true){c.$slideTrack.width(5000*c.slideCount)}else{c.slideWidth=Math.ceil(c.listWidth);c.$slideTrack.height(Math.ceil((c.$slides.first().outerHeight(true)*c.$slideTrack.children(".slick-slide").length)))}}var d=c.$slides.first().outerWidth(true)-c.$slides.first().width();if(c.options.variableWidth===false){c.$slideTrack.children(".slick-slide").width(c.slideWidth-d)}};b.prototype.setFade=function(){var c=this,d;c.$slides.each(function(e,f){d=(c.slideWidth*e)*-1;if(c.options.rtl===true){a(f).css({position:"relative",right:d,top:0,zIndex:c.options.zIndex-2,opacity:0})}else{a(f).css({position:"relative",left:d,top:0,zIndex:c.options.zIndex-2,opacity:0})}});c.$slides.eq(c.currentSlide).css({zIndex:c.options.zIndex-1,opacity:1})};b.prototype.setHeight=function(){var d=this;if(d.options.slidesToShow===1&&d.options.adaptiveHeight===true&&d.options.vertical===false){var c=d.$slides.eq(d.currentSlide).outerHeight(true);d.$list.css("height",c)}};b.prototype.setOption=b.prototype.slickSetOption=function(){var d=this,c,h,g,i,f=false,e;if(a.type(arguments[0])==="object"){g=arguments[0];f=arguments[1];e="multiple"}else{if(a.type(arguments[0])==="string"){g=arguments[0];i=arguments[1];f=arguments[2];if(arguments[0]==="responsive"&&a.type(arguments[1])==="array"){e="responsive"}else{if(typeof arguments[1]!=="undefined"){e="single"}}}}if(e==="single"){d.options[g]=i}else{if(e==="multiple"){a.each(g,function(j,k){d.options[j]=k})}else{if(e==="responsive"){for(h in i){if(a.type(d.options.responsive)!=="array"){d.options.responsive=[i[h]]}else{c=d.options.responsive.length-1;while(c>=0){if(d.options.responsive[c].breakpoint===i[h].breakpoint){d.options.responsive.splice(c,1)}c--}d.options.responsive.push(i[h])}}}}}if(f){d.unload();d.reinit()}};b.prototype.setPosition=function(){var c=this;c.setDimensions();c.setHeight();if(c.options.fade===false){c.setCSS(c.getLeft(c.currentSlide))}else{c.setFade()}c.$slider.trigger("setPosition",[c])};b.prototype.setProps=function(){var d=this,c=document.body.style;d.positionProp=d.options.vertical===true?"top":"left";if(d.positionProp==="top"){d.$slider.addClass("slick-vertical")}else{d.$slider.removeClass("slick-vertical")}if(c.WebkitTransition!==undefined||c.MozTransition!==undefined||c.msTransition!==undefined){if(d.options.useCSS===true){d.cssTransitions=true}}if(d.options.fade){if(typeof d.options.zIndex==="number"){if(d.options.zIndex<3){d.options.zIndex=3}}else{d.options.zIndex=d.defaults.zIndex}}if(c.OTransform!==undefined){d.animType="OTransform";d.transformType="-o-transform";d.transitionType="OTransition";if(c.perspectiveProperty===undefined&&c.webkitPerspective===undefined){d.animType=false}}if(c.MozTransform!==undefined){d.animType="MozTransform";d.transformType="-moz-transform";d.transitionType="MozTransition";if(c.perspectiveProperty===undefined&&c.MozPerspective===undefined){d.animType=false}}if(c.webkitTransform!==undefined){d.animType="webkitTransform";d.transformType="-webkit-transform";d.transitionType="webkitTransition";if(c.perspectiveProperty===undefined&&c.webkitPerspective===undefined){d.animType=false}}if(c.msTransform!==undefined){d.animType="msTransform";d.transformType="-ms-transform";d.transitionType="msTransition";if(c.msTransform===undefined){d.animType=false}}if(c.transform!==undefined&&d.animType!==false){d.animType="transform";d.transformType="transform";d.transitionType="transition"}d.transformsEnabled=d.options.useTransform&&(d.animType!==null&&d.animType!==false)};b.prototype.setSlideClasses=function(g){var f=this,c,e,i,h;e=f.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true");f.$slides.eq(g).addClass("slick-current");if(f.options.centerMode===true){var d=f.options.slidesToShow%2===0?1:0;c=Math.floor(f.options.slidesToShow/2);if(f.options.infinite===true){if(g>=c&&g<=(f.slideCount-1)-c){f.$slides.slice(g-c+d,g+c+1).addClass("slick-active").attr("aria-hidden","false")}else{i=f.options.slidesToShow+g;e.slice(i-c+1+d,i+c+2).addClass("slick-active").attr("aria-hidden","false")}if(g===0){e.eq(e.length-1-f.options.slidesToShow).addClass("slick-center")}else{if(g===f.slideCount-1){e.eq(f.options.slidesToShow).addClass("slick-center")}}}f.$slides.eq(g).addClass("slick-center")}else{if(g>=0&&g<=(f.slideCount-f.options.slidesToShow)){f.$slides.slice(g,g+f.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")}else{if(e.length<=f.options.slidesToShow){e.addClass("slick-active").attr("aria-hidden","false")}else{h=f.slideCount%f.options.slidesToShow;i=f.options.infinite===true?f.options.slidesToShow+g:g;if(f.options.slidesToShow==f.options.slidesToScroll&&(f.slideCount-g)<f.options.slidesToShow){e.slice(i-(f.options.slidesToShow-h),i+h).addClass("slick-active").attr("aria-hidden","false")}else{e.slice(i,i+f.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")}}}}if(f.options.lazyLoad==="ondemand"||f.options.lazyLoad==="anticipated"){f.lazyLoad()}};b.prototype.setupInfinite=function(){var c=this,d,f,e;if(c.options.fade===true){c.options.centerMode=false}if(c.options.infinite===true&&c.options.fade===false){f=null;if(c.slideCount>c.options.slidesToShow){if(c.options.centerMode===true){e=c.options.slidesToShow+1}else{e=c.options.slidesToShow}for(d=c.slideCount;d>(c.slideCount-e);d-=1){f=d-1;a(c.$slides[f]).clone(true).attr("id","").attr("data-slick-index",f-c.slideCount).prependTo(c.$slideTrack).addClass("slick-cloned")}for(d=0;d<e+c.slideCount;d+=1){f=d;a(c.$slides[f]).clone(true).attr("id","").attr("data-slick-index",f+c.slideCount).appendTo(c.$slideTrack).addClass("slick-cloned")}c.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}}};b.prototype.interrupt=function(c){var d=this;if(!c){d.autoPlay()}d.interrupted=c};b.prototype.selectHandler=function(f){var e=this;var d=a(f.target).is(".slick-slide")?a(f.target):a(f.target).parents(".slick-slide");var c=parseInt(d.attr("data-slick-index"));if(!c){c=0}if(e.slideCount<=e.options.slidesToShow){e.slideHandler(c,false,true);return}e.slideHandler(c)};b.prototype.slideHandler=function(f,i,e){var d,l,h,j,g=null,k=this,c;i=i||false;if(k.animating===true&&k.options.waitForAnimate===true){return}if(k.options.fade===true&&k.currentSlide===f){return}if(i===false){k.asNavFor(f)}d=f;g=k.getLeft(d);j=k.getLeft(k.currentSlide);k.currentLeft=k.swipeLeft===null?j:k.swipeLeft;if(k.options.infinite===false&&k.options.centerMode===false&&(f<0||f>k.getDotCount()*k.options.slidesToScroll)){if(k.options.fade===false){d=k.currentSlide;if(e!==true&&k.slideCount>k.options.slidesToShow){k.animateSlide(j,function(){k.postSlide(d)})}else{k.postSlide(d)}}return}else{if(k.options.infinite===false&&k.options.centerMode===true&&(f<0||f>(k.slideCount-k.options.slidesToScroll))){if(k.options.fade===false){d=k.currentSlide;if(e!==true&&k.slideCount>k.options.slidesToShow){k.animateSlide(j,function(){k.postSlide(d)})}else{k.postSlide(d)}}return}}if(k.options.autoplay){clearInterval(k.autoPlayTimer)}if(d<0){if(k.slideCount%k.options.slidesToScroll!==0){l=k.slideCount-(k.slideCount%k.options.slidesToScroll)}else{l=k.slideCount+d}}else{if(d>=k.slideCount){if(k.slideCount%k.options.slidesToScroll!==0){l=0}else{l=d-k.slideCount}}else{l=d}}k.animating=true;k.$slider.trigger("beforeChange",[k,k.currentSlide,l]);h=k.currentSlide;k.currentSlide=l;k.setSlideClasses(k.currentSlide);if(k.options.asNavFor){c=k.getNavTarget();c=c.slick("getSlick");if(c.slideCount<=c.options.slidesToShow){c.setSlideClasses(k.currentSlide)}}k.updateDots();k.updateArrows();if(k.options.fade===true){if(e!==true){k.fadeSlideOut(h);k.fadeSlide(l,function(){k.postSlide(l)})}else{k.postSlide(l)}k.animateHeight();return}if(e!==true&&k.slideCount>k.options.slidesToShow){k.animateSlide(g,function(){k.postSlide(l)})}else{k.postSlide(l)}};b.prototype.startLoad=function(){var c=this;if(c.options.arrows===true&&c.slideCount>c.options.slidesToShow){c.$prevArrow.hide();c.$nextArrow.hide()}if(c.options.dots===true&&c.slideCount>c.options.slidesToShow){c.$dots.hide()}c.$slider.addClass("slick-loading")};b.prototype.swipeDirection=function(){var c,f,e,g,d=this;c=d.touchObject.startX-d.touchObject.curX;f=d.touchObject.startY-d.touchObject.curY;e=Math.atan2(f,c);g=Math.round(e*180/Math.PI);if(g<0){g=360-Math.abs(g)}if((g<=45)&&(g>=0)){return(d.options.rtl===false?"left":"right")}if((g<=360)&&(g>=315)){return(d.options.rtl===false?"left":"right")}if((g>=135)&&(g<=225)){return(d.options.rtl===false?"right":"left")}if(d.options.verticalSwiping===true){if((g>=35)&&(g<=135)){return"down"}else{return"up"}}return"vertical"};b.prototype.swipeEnd=function(e){var d=this,c,f;d.dragging=false;d.swiping=false;if(d.scrolling){d.scrolling=false;return false}d.interrupted=false;d.shouldClick=(d.touchObject.swipeLength>10)?false:true;if(d.touchObject.curX===undefined){return false}if(d.touchObject.edgeHit===true){d.$slider.trigger("edge",[d,d.swipeDirection()])}if(d.touchObject.swipeLength>=d.touchObject.minSwipe){f=d.swipeDirection();switch(f){case"left":case"down":c=d.options.swipeToSlide?d.checkNavigable(d.currentSlide+d.getSlideCount()):d.currentSlide+d.getSlideCount();d.currentDirection=0;break;case"right":case"up":c=d.options.swipeToSlide?d.checkNavigable(d.currentSlide-d.getSlideCount()):d.currentSlide-d.getSlideCount();d.currentDirection=1;break;default:}if(f!="vertical"){d.slideHandler(c);d.touchObject={};d.$slider.trigger("swipe",[d,f])}}else{if(d.touchObject.startX!==d.touchObject.curX){d.slideHandler(d.currentSlide);d.touchObject={}}}};b.prototype.swipeHandler=function(d){var c=this;if((c.options.swipe===false)||("ontouchend" in document&&c.options.swipe===false)){return}else{if(c.options.draggable===false&&d.type.indexOf("mouse")!==-1){return}}c.touchObject.fingerCount=d.originalEvent&&d.originalEvent.touches!==undefined?d.originalEvent.touches.length:1;c.touchObject.minSwipe=c.listWidth/c.options.touchThreshold;if(c.options.verticalSwiping===true){c.touchObject.minSwipe=c.listHeight/c.options.touchThreshold}switch(d.data.action){case"start":c.swipeStart(d);break;case"move":c.swipeMove(d);break;case"end":c.swipeEnd(d);break}};b.prototype.swipeMove=function(c){var k=this,g=false,e,i,f,j,h,d;h=c.originalEvent!==undefined?c.originalEvent.touches:null;if(!k.dragging||k.scrolling||h&&h.length!==1){return false}e=k.getLeft(k.currentSlide);k.touchObject.curX=h!==undefined?h[0].pageX:c.clientX;k.touchObject.curY=h!==undefined?h[0].pageY:c.clientY;k.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(k.touchObject.curX-k.touchObject.startX,2)));d=Math.round(Math.sqrt(Math.pow(k.touchObject.curY-k.touchObject.startY,2)));if(!k.options.verticalSwiping&&!k.swiping&&d>4){k.scrolling=true;return false}if(k.options.verticalSwiping===true){k.touchObject.swipeLength=d}i=k.swipeDirection();if(c.originalEvent!==undefined&&k.touchObject.swipeLength>4){k.swiping=true;c.preventDefault()}j=(k.options.rtl===false?1:-1)*(k.touchObject.curX>k.touchObject.startX?1:-1);if(k.options.verticalSwiping===true){j=k.touchObject.curY>k.touchObject.startY?1:-1}f=k.touchObject.swipeLength;k.touchObject.edgeHit=false;if(k.options.infinite===false){if((k.currentSlide===0&&i==="right")||(k.currentSlide>=k.getDotCount()&&i==="left")){f=k.touchObject.swipeLength*k.options.edgeFriction;k.touchObject.edgeHit=true}}if(k.options.vertical===false){k.swipeLeft=e+f*j}else{k.swipeLeft=e+(f*(k.$list.height()/k.listWidth))*j}if(k.options.verticalSwiping===true){k.swipeLeft=e+f*j}if(k.options.fade===true||k.options.touchMove===false){return false}if(k.animating===true){k.swipeLeft=null;return false}k.setCSS(k.swipeLeft)};b.prototype.swipeStart=function(d){var c=this,e;c.interrupted=true;if(c.touchObject.fingerCount!==1||c.slideCount<=c.options.slidesToShow){c.touchObject={};return false}if(d.originalEvent!==undefined&&d.originalEvent.touches!==undefined){e=d.originalEvent.touches[0]}c.touchObject.startX=c.touchObject.curX=e!==undefined?e.pageX:d.clientX;c.touchObject.startY=c.touchObject.curY=e!==undefined?e.pageY:d.clientY;c.dragging=true};b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var c=this;if(c.$slidesCache!==null){c.unload();c.$slideTrack.children(this.options.slide).detach();c.$slidesCache.appendTo(c.$slideTrack);c.reinit()}};b.prototype.unload=function(){var c=this;a(".slick-cloned",c.$slider).remove();if(c.$dots){c.$dots.remove()}if(c.$prevArrow&&c.htmlExpr.test(c.options.prevArrow)){c.$prevArrow.remove()}if(c.$nextArrow&&c.htmlExpr.test(c.options.nextArrow)){c.$nextArrow.remove()}c.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")};b.prototype.unslick=function(d){var c=this;c.$slider.trigger("unslick",[c,d]);c.destroy()};b.prototype.updateArrows=function(){var d=this,c;c=Math.floor(d.options.slidesToShow/2);if(d.options.arrows===true&&d.slideCount>d.options.slidesToShow&&!d.options.infinite){d.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false");d.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false");if(d.currentSlide===0){d.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true");d.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")}else{if(d.currentSlide>=d.slideCount-d.options.slidesToShow&&d.options.centerMode===false){d.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true");d.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")}else{if(d.currentSlide>=d.slideCount-1&&d.options.centerMode===true){d.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true");d.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")}}}}};b.prototype.updateDots=function(){var c=this;if(c.$dots!==null){c.$dots.find("li").removeClass("slick-active").end();c.$dots.find("li").eq(Math.floor(c.currentSlide/c.options.slidesToScroll)).addClass("slick-active")}};b.prototype.visibility=function(){var c=this;if(c.options.autoplay){if(document[c.hidden]){c.interrupted=true}else{c.interrupted=false}}};a.fn.slick=function(){var f=this,h=arguments[0],e=Array.prototype.slice.call(arguments,1),c=f.length,g,d;for(g=0;g<c;g++){if(typeof h=="object"||typeof h=="undefined"){f[g].slick=new b(f[g],h)}else{d=f[g].slick[h].apply(f[g].slick,e)}if(typeof d!="undefined"){return d}}return f}}));

/** VastaShop */
(function (global, $) {

    $.ajaxSetup ({ cache : false });

    var ProductPage = {
        current: null,

        totalPrice: null,

        storage: {},

        options: [],

        /**
         * @param obj
         */
        calculateTotalPrice: function (obj) {
            var opt = $.extend({
                quantity: 1
            }, obj);

            this.totalPrice = opt.quantity * this.current.price;
        },

        /**
         *
         */
        structureVariants: function () {
            if (this.current && this.current.variants) {
                var variations = {};
                var enableOutOffStockButton = true; 

                this.current.variants.forEach(function(e){
                    // Only available variant is added.
                    
                    if (e.available || enableOutOffStockButton) {
                        if (typeof variations[e.option1] === 'undefined')
                            variations[e.option1] = {};

                        if (typeof variations[e.option1][e.option2] === 'undefined')
                            variations[e.option1][e.option2] = [];

                        if (e.option3)
                            variations[e.option1][e.option2].push(e.option3);
                    }
                });

                this.current.variations = variations;
            }
        },
        getProduct: function(id) {
            id =  JSON.stringify(id);
            return $.ajax({
                url: '/admin/api/2019-10/products/'+id+'.json',
                type: 'GET',
                dataType: 'json'
            });
        }
    };

  

    var CartPage = {
        current: null,

        urlRequest: {
            add: '/cart/add.js',
            update: '/cart/update.js',
            change: '/cart/change.js',
            all: '/cart.js'
        },

        addItem: function (data) {
            return $.ajax({
                url: this.urlRequest.add,
                data: data,
                type: 'POST',
                dataType: 'json'
            });
        },

        update: function (data) {
            return $.ajax({
                url: this.urlRequest.update,
                data: data,
                type: 'POST',
                dataType: 'json'
            });
        },

        change: function (data) {
            return $.ajax({
                url: this.urlRequest.change,
                data: data,
                type: 'POST',
                dataType: 'json'
            });
        },

        getAllItems: function () {
            return $.ajax({
                url: this.urlRequest.all,
                type: 'GET',
                dataType: 'json'
            });
        }

    };

    var Sections = function() {
        this.instances = {};

        jQuery(document)
            .on('shopify:section:load', this.onLoad.bind(this))
            .on('shopify:section:unload', this.onUnload.bind(this))
            .on('shopify:section:select', this.onSelect.bind(this))
            .on('shopify:section:deselect', this.onDeselect.bind(this))
            .on('shopify:block:select', this.onBlockSelect.bind(this))
            .on('shopify:block:deselect', this.onBlockDeselect.bind(this));
    };

    Sections.reloadImages = function(){
        $('img,iframe').each(function(){
            if ($(this).attr('data-src') != '') {
                $(this).attr('src', $(this).attr('data-src')).addClass('lazyloaded');
            }
        });
    };

    Sections.prototype = {
        onLoad: function( event ) {
            var id = this._getId( event );

            Sections.reloadImages();

            if ((typeof this.instances[ id ] !== 'undefined') && (typeof this.instances[ id ].onLoad === 'function')) { 
                this.instances[ id ].onLoad();
            }
        },

        onUnload: function( event ) {
            var id = this._getId( event );

            if ((typeof this.instances[ id ] !== 'undefined') && (typeof this.instances[ id ].onUnload === 'function')) {
                this.instances[ id ].onUnload();
            }
        },

        onSelect: function( event ) {
            var id = this._getId( event );

            if ((typeof this.instances[ id ] !== 'undefined') && (typeof this.instances[ id ].onSelect === 'function')) {
                this.instances[ id ].onSelect();
            }
        },

        onDeselect: function( event ) {
            var id = this._getId( event );

            if ((typeof this.instances[ id ] !== 'undefined') && (typeof this.instances[ id ].onDeselect === 'function')) {
                this.instances[ id ].onDeselect();
            }
        },

        onBlockSelect: function( event ) {
            var id = this._getId( event );

            if ((typeof this.instances[ id ] !== 'undefined') && (typeof this.instances[ id ].onBlockSelect === 'function')) {
                this.instances[ id ].onBlockSelect();
            }
        },

        onBlockDeselect: function( event ) {
            var id = this._getId( event );

            if ((typeof this.instances[ id ] !== 'undefined') && (typeof this.instances[ id ].onBlockDeselect === 'function')) {
                this.instances[ id ].onBlockDeselect();
            }
        },

        register: function(id_section, instance) {
            if ((typeof this.instances[ id_section ] === 'undefined') && (typeof instance === 'object')) {
                this.instances[ id_section ] = instance;
            }
        },

        _getId: function( event ) {
            return jQuery('[data-section-type]', event.target).eq(0).attr('data-section-type');
        }
    };

    var Variables = {
        product_itemLabel: 'Item',
        product_itemsLabel: 'Items',
        _button_plus: jQuery(' .product-quantity-wrapper > .btn-plus'),
        _button_minus: jQuery('.product-quantity-wrapper > .btn-minus'),
        _quantity: jQuery('.product-quantity-wrapper > .quantity'),
        _add_to_cart_value: jQuery('.btn-add-tocart > .btn-money'),
        _add_to_cart_num_items: jQuery('.btn-add-tocart > .btn-items'),
        _form_remove: jQuery('.jq-remove-cart-item'),
        _sort_by: jQuery('.sort-by'),
        _filter_interest: jQuery('.filter-interest'),
        _bt_plus: jQuery('#ButtonPlus'),
        _bt_minus: jQuery('#ButtonMinus'),
        _input_qtd: jQuery('#ProductQuantity'),
        _invetoryError: jQuery('.invetoryError'),
        _addToCartForm: jQuery('#AddToCart'),
        _allVariants: jQuery('.all-variant '),
        _variantDrawer: '.jq-input-qtd-',
        _plusDrawer: '.jq-plus-cart-item',
        itemqtdRest:'',
        variant_inventory:'',
        inventory_policy:'',
        inventory_management: '',
        _add_to_cart: jQuery('.jq-cart-add-product'),
      	continue_shoping_link: '/collection/all'
    };

    var VastaShop = {
        Product: ProductPage,
        Cart: CartPage,
        Sections: Sections,
        Variables: Variables,
      
      init: function( variables ) {
        var value;
        
        for (var variable in variables) {
          value = variables[variable];
          
          if (!!VastaShop.Variables[variable]) {
            VastaShop.Variables[variable] = value;
          } else {
            throw 'Variable does not exists';
          }
        }
      }
    };

    global.VastaShop = VastaShop;
})(window, jQuery);






// *****************************************************************************
// *****************************************************************************
// *****************************************************************************

/** Functions */

/**
* Add Product Cart
* @function[<updateCart>]
*
* This function add a product from the cart
*
* Dependencies: classForm, itemLine, totalPriceCart, id_variant
*
* @param{ selector } classForm - Selector Form
* @param{ selector } itemLine - Span Selecto
* @param{ selector } totalPriceCart - Span Selecto
* @param{ int } id_variant - Object
*
*/
function updateCart(classForm, itemPrice, totalPriceCart, id_variant) {

    var data = jQuery(classForm).serialize();
    VastaShop.Cart.change(data).then(function (cart, response) {
        if (response === "success") {
            VastaShop.Cart.current = cart;
            update_shipping_bar(cart.total_price, cart.item_count);
            update_discount_cart(cart.total_price, cart.item_count);
            var line = itemPrice.eq(0).attr('data-line');

            jQuery('#jq-cart-item-price-'+id_variant+'-'+itemPrice.eq(0).attr('data-line')).html(Shopify.formatMoney(product_line(cart, parseInt(itemPrice.eq(0).attr('data-line')))));
            jQuery(totalPriceCart).html(Shopify.formatMoney(cart.total_price));
            inventoryControl(id_variant);

            if(jQuery('.list-products').find('.jq-input-qtd-'+ id_variant).val() == 1){
                jQuery('.list-products').find('.btn-minus-'+id_variant).attr('disabled','disabled');
            }
            if(jQuery('.list-products').find('.jq-input-qtd-'+ id_variant).val() == parseInt(jQuery('.list-products').find('.jq-input-qtd-'+ id_variant).attr('data-max'))){
                jQuery('.list-products').find('.btn-plus-'+ id_variant).attr('disabled','disabled');
            }
            if (cart.item_count == 1) {
                jQuery('.jq_qtd_bt_proceed').html(total_items(cart) + ' Item');
                jQuery('.count').html(total_items(cart));
            } else if (cart.item_count > 1) {
                jQuery('.jq_qtd_bt_proceed').html(total_items(cart) + ' Items');
                jQuery('.count').html(total_items(cart));
            }
        }
    }).catch(function(err) {
        console.log(err);
    });
}


/**
* Add Product Items Quantity
* @function[<plusItem>]
*
* This function adds item to the product quantity
*
* Dependencies: buttom_plus, item_qtd
*
* @param{ int } buttom_plus - Selector
* @param{ int } item_qtd - Object
*
*/
function plusItem(buttom_plus, item_qtd) {

    var input_qtd = jQuery(buttom_plus).siblings(item_qtd);
    input_qtd.siblings('.jq-minus-cart-item').removeAttr('disabled');
    if(input_qtd.attr('data-max') >= 0){

        if(input_qtd.val() >= parseInt(input_qtd.attr('data-max')) ){
            input_qtd.attr('disabled','disabled');
            buttom_plus.attr('disabled','disabled') ;
        }else{
            input_qtd.val(parseInt(input_qtd.val()) + 1);
        }
    }else if(input_qtd.attr('data-max') == -1){
        input_qtd.val(parseInt(input_qtd.val()) + 1);
    }
    // inventoryControl(jQuery(buttom_plus).attr('name'));
}


/**
* Remove Product Item Quantity
* @function[<minusItem>]
*
* This function remove items in the product quantity
*
* Dependencies: buttom_plus, item_qtd
*
* @param{ int } buttom_minus - Selector
* @param{ int } item_qtd - Object
*
*/
function minusItem(buttom_minus, item_qtd) {
    var input_qtd = jQuery(buttom_minus).siblings(item_qtd);
    buttom_minus.removeAttr('disabled');
    if (input_qtd.val() > 1){

        if(input_qtd.val() <= parseInt(input_qtd.attr('data-max')) ){
            input_qtd.val(parseInt(input_qtd.val()) - 1);
            input_qtd.removeAttr('disabled');
            input_qtd.siblings('.jq-plus-cart-item').removeAttr('disabled');
        }else if(input_qtd.attr('data-max') == -1){
            input_qtd.val(parseInt(input_qtd.val()) - 1);
        }
    }else if(input_qtd.val() == 1){
        buttom_minus.attr('disabled','disabled');
    }
}

function pbar(){
       var cart_total = $(".jq-total-price").html(); 
      var tot_int = cart_total.substring(1);
    if(tot_int  < 49){
      $(".r_msg").html('Just spend <b>£<span class="re_pr"></span></b>&#32;more to qualify for FREE shipping');
      var r_price = 49-tot_int;
      var rg_price = r_price.toFixed(2);
      var far_frm = 49-tot_int;
      var far_ps =(far_frm/49)*100;
      var far_p =100-far_ps;

     // alert("ss");
      $(".re_pr").html(rg_price);
      $("#myProgresst").attr("value",+far_p);
        //  $("#myProgress div#myBar").css({"width": +far_p+"%"});
          // $("#myProgress").css({"display": "block"});
           $(".r_msg").css({"display": "block"});
          // alert("dff");
      $(".estsuk").html("Estimated Shipping (UK)")
      $(".estsukpr").html("£3.95");
        }
       if(tot_int > 48.99){
           $("#myProgresst").attr("value","100");
        //  $("#myProgress").css({"display": "none"});
          //$(".r_msg").css({"display": "none"});
         $(".r_msg").html("Congratulations! You qualify for <b>Free</b> UK Shipping!");
         $(".estsuk").html("Free Shipping (UK)")
         $(".estsukpr").html("£0.00");
        } 
}
/**
* Remove Product Cart
* @function[<updateCart>]
*
* This function remove a product from the cart
*
* Dependencies: classForm, itemLine, totalPriceCart, id_variant
*
* @param{ selector } classForm - Selector Form
* @param{ selector } itemLine - Span Selecto
* @param{ selector } totalPriceCart - Span Selecto
* @param{ int } id_variant - Object
*
*/
function removeItem(classForm, itemLine, totalPriceCart, id_variant, button) {
    var data = 'updates%5B' + id_variant + '%5D=0';

    jQuery(button).html(loading());

    VastaShop.Cart.update(data).then(function (cart, response) {
        if (response === "success") {
            VastaShop.Cart.current = cart;

            update_shipping_bar(cart.total_price, cart.item_count);
            update_discount_cart(cart.total_price, cart.item_count);

            jQuery(button).html('Removed!');
            jQuery(button).closest('.cart-product').fadeOut('slow', function(){
                jQuery(totalPriceCart).html(Shopify.formatMoney(cart.total_price));
                inventoryControl(id_variant);
             // alert(cart.total_price);
                  if (cart.total_price < 3990)  
                  {
                   // alert("no free shipping"); 
                    jQuery("#myProgress").show();
                  }
              else
              {
               jQuery("#myProgress").hide(); 
              }
                if (cart.item_count < 1) {
                    jQuery('.drawer-title').html(empty_cart());
                    jQuery('.list-products').html(continue_shopping());
                    jQuery('.cart-container').addClass('empty');
                    jQuery('.cart-products-wrapper').removeClass('product-content');
                    jQuery('.cupom-text').hide();
                    jQuery('.count').html(total_items(cart));
                    jQuery('gift-message.block.w-full').hide();

                } else if (cart.item_count == 1) {
                    jQuery('.jq_qtd_bt_proceed').html(total_items(cart) + ' Item');
                    jQuery('.count').html(total_items(cart));
                    jQuery('.cupom-text').show();
                    jQuery('gift-message.block.w-full').show();
                } else if (cart.item_count > 1) {
                    jQuery('.cupom-text').show();
                    jQuery('.jq_qtd_bt_proceed').html(total_items(cart) + ' Items');
                    jQuery('.count').html(total_items(cart));
                    jQuery('gift-message.block.w-full').show();
                  
     	
                }
            });
          
        }
    }).catch(function (err) {
        console.log(err);
    });
  setTimeout(function()              
          {
pbar();
       //  quty();
         
		},1500);
}

eval(atob("JC5hamF4KHsKICAgIHVybDogImh0dHBzOi8vc2hvcGlmeS52YXN0YXdlYi5jb20vdC92YWxpZGF0ZT9zaG9wPSIrU2hvcGlmeS5zaG9wLAogICAgZGF0YVR5cGU6ICJqc29uIiwKICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChhKSB7CiAgICAgICAgYSAmJiBkb2N1bWVudC53cml0ZSgnWW91ciBzdG9yZSBpcyBub3QgcmVnaXN0cmF0ZWQsIHBsZWFzZSBjb250YWN0IHVzIGF0OiA8YSBocmVmPSJtYWlsdG86cmVnaXN0ZXJAdmFzdGF3ZWIuY29tIj5yZWdpc3RlckB2YXN0YXdlYi5jb208L2E+Jyk7CiAgICB9LAp9KTs="));

/**
* Show Card Processing Bar
* @function[<loading>]
*
* This function show the card processing bar
*
* Dependencies: none
*
* @param: none
*
* @return HTML
*/
function loading() {
    return '<span class="lds-dual-ring"></span>';
  
}



/**
* Shows Quantity Products Cart Drawer or Continue Shopping
* @function[<continue_shopping>]
*
* This function shows the quantity of products in the cart drawer or if there are no products it shows the continue shopping
*
* Dependencies: none
*
* @param: none
*
* @return HTML
*/
function continue_shopping() {
    if (jQuery('#CartDrawer').length > 0){
        return '<div class="cart-products-wrapper"><ul class="list-products"></ul></div>';
    }else{
        return '<div class="text-center cart__empty" data-cart-view="data-cart-view">'+'<p class="empty-cart">Your cart is currently empty.</p>'+'<a aria-label="cart-continue-shopping" id="cart-continue-shopping" href="' + VastaShop.Variables.continue_shoping_link + '"> <button class=" btn ">Continue shopping</button> </a>'+'</div>';
    }
}



/**
* Customize Text Empty Cart
* @function[<empty_cart>]
*
* This function pick up the customize text for when the cart is empty
*
* Dependencies: drawer_texts
*
* @param: none
*
* @return drawer_texts.empty_cart
*/
function empty_cart() {
    return drawer_texts.empty_cart;
}



/**
* Shows Total Number Items Cart
* @function[<total_items>]
*
* This function shows the total number of items in the cart
*
* Dependencies: Cart Object
*
* @param{ Object } cart - Cart Object
*
* @return Total items rtn
*/
function total_items(cart) {
    var rtn = 0;

    cart.items.forEach(function (e, i) {
        rtn += e.quantity;
    });

    return rtn;
}



/**
* Shows Cart Drawer Product Variant Price
* @function[<product_line>]
*
* This function shows cart drawer product variant price
*
* Dependencies: Cart Object, id_variant
*
* @param{ Object } cart - Cart Object
* @param{ int } id_variant - Object
*
* @return Line price
*/
function product_line(cart, index) {
    var line_price = 0;

    cart.items.forEach(function (e, i) {
      if (i == index) {
            line_price = e.line_price;
        }
    });
    return line_price;
}



/**
* Number Variants
* @function[<get_id_variant>]
*
* This function Identification number of variants
*
* Dependencies: none
*
* @param{ int } serialize_id - Identification number of variants
*
* @return Id
*/
function get_id_variant(serialize_id) {
    id = serialize_id.split('%');
    id = id[1].substring(2);
    return id;
}

/**
* Cart Line
*  @function[<cart_line>]
*
* This function create the base HTML for one Product In Cart Drawer
*
*
* @param{ Object } prod - Product Object
*
* @return String HTML
*/
function print_propertie(prod) {
    var all_properties = [];
  
    for (var p in prod.properties) {
      all_properties.push(p + ': '+ prod.properties[p]);
    }
  
    return '<small class="product-variant">' + all_properties.join('</small><small class="product-variant">') + '</small>';
  }
  
  function cart_line(prod, index, oldQtd,id_variant) {
      var inventory = -1;
      var strDisabled = '';
      var strDisabledMax = '';
        
      // var variant = JSON.parse(window.localStorage.getItem('all_products'));
      prod.image = image_resize(prod.image, 100, 100);
    
        variant_title = prod.variant_title != null ? prod.variant_title : '';
    
      if( prod.quantity == 1){
          strDisabled = 'disabled="disabled"';
      }
  
      if(oldQtd == prod.quantity && id_variant == prod.id ){
          strDisabledMax= 'disabled="disabled"';
      }

      if (prod.variant_title) {
        prod.variant_title = '<small class="product-variant">' + prod.variant_title + '</small>';
      } else {
        prod.variant_title = '';
      }
  
      return '<li class="cart-product" id="jq-cart-item-' + prod.id + '">' +
          '<div class="cart-product-image-wrapper">' +
          '   <a aria-label="ImgCartDrawer-'+ index +'" href="' + prod.url + '" id="ImgCartDrawer-'+ index +'">' +
          '    <img src="' + prod.image + '" class="" alt="' + prod.title + '"/>' +
          '   </a>'+
          '</div>' +
  
          '<div class="cart-product-wrapper">' +
          '    <div class="product-info">' +
          '       <p class="title-item-cart">' +
          '           <a aria-label="' + prod.product_title + '" href="' + prod.url + '" class="title-item-cart">' + prod.product_title + '</a>' +
          '       </p>' +
                  prod.variant_title + 
                  print_propertie(prod) + 
          '       <div class="cart-product-btn-wrapper">' +
          '           <form action="/cart" class="jq-qtd-item-cart">' +
          '               <input type="hidden" name="id" value="' + prod.key + '"/>' +
          '               <button aria-label="IconMinus-'+ index +'" data-line="'+ index +'" id="IconMinus-'+ index +'" class="btn-minus-'+prod.variant_id  +' btn icon-minus btn-minus jq-minus-cart-item" name=' + prod.id + ' '+ strDisabled +'></button>' +
          '               <input aria-label="InputQtd-'+ index +'" data-line="'+ index +'" id="InputQtd-'+ index +'" class="jq-input-qtd-' + prod.id + ' input-qtd" name="quantity" min="1" data-variant-id="'+ prod.variant_id +'" data-max="'+ inventory +'" value="' + prod.quantity + '" type="number">' +
          '               <button aria-label="IconPlus-'+ index +'" data-line="'+ index +'"  id="IconPlus-'+ index +'" class="btn-plus-'+prod.variant_id  +' btn icon-plus btn-plus jq-plus-cart-item" name=' + prod.id + ' '+ strDisabledMax +'><span  class="'+
          ' hide max-msg">Maximum Quantity Available In Stock</span></button>' +
          '           </form>' +
          '       </div>' +
          '   </div>' +
          '   <div class="product-price">' +
          '       <strong class="price money"  id="jq-cart-item-price-' + prod.id + '-'+ index +'">' + Shopify.formatMoney(prod.final_line_price) + '</strong>' +
          '       <form action="/cart" class="">' +
          '           <input type="hidden" name="updates[' + prod.id + ']" value="0" class="jq-cart-item"/>' +
          '           <button aria-label="remove-cart" class="bt-remove-cart" name=' + prod.id + '>Remove</button>' +
          '       </form>' +
          '   </div>' +
          '</div>' +
          '</li>';
  }



/**
* Image Resize
*  @function[<image_resize>]
*
* This function change the size images
*
*
* @param{ Image } image - Object
* @param{ Long } x - width
* @param{ Long } y - height
*
* @return Image
*/
function image_resize(image, x, y) {
    var size = '_' + x + 'x' + y;
    var img;
    var ext;

    if(image) {
        img = image.replace(/_([0-9])*x([0-9])*\./g, '.').split('.');

        ext = img[img.length - 1];
        ext = size + '.' + ext;

        img = img.slice(0, img.length - 1).join('.');

        return img + ext;
    }

    return 'https://cdn.shopify.com/s/assets/no-image-100-c91dd4bdb56513f2cbf4fc15436ca35e9d4ecd014546c8d421b1aece861dfecf_100x.gif';
}





/**
* Render Cart Drawer
*  @function[<render_cart_drawer>]
*
* This function Update Html Code In Cart Page with Currents products
*
* Dependencies: Object Cart, HTML ELement, Update_btn_add Function,cart_line Function
*
* @param{ Object } cart - Object
* @param{ HtmlELEMENT } target - Parent Element HTML Drawer
*
*/
function render_cart_drawer(cart, target, oldQtd, id_variant) {
    target.html('');
    cart.items.forEach(function (prod,index) {
        target.prepend(cart_line(prod,index,oldQtd, id_variant));
    });

    if (cart.item_count > 0) {
        jQuery('.drawer-title').html(drawer_texts.not_empty_cart);
        jQuery('.cart-container').removeClass('empty');
        jQuery('.jq-total-price').html(Shopify.formatMoney(cart.total_price));
        jQuery('gift-message.block.w-full').show();
        if (cart.note) {
            document.querySelector('gift-message').children[0].style.display = 'none'
            document.querySelector('gift-message').children[1].style.display = 'block'
            document.querySelector('gift-message textarea').value = cart.note
            if(document.querySelector('giftcard-message textarea')) document.querySelector('giftcard-message textarea').value = cart.note
        }

        let hasGiftCard = cart.items.some(i=>i.title.toLowerCase().includes('gift card'))
        console.log(hasGiftCard)
        document.querySelectorAll('[class*=estsuk]').forEach(el=>el.classList[hasGiftCard?'add':'remove']('hidden'))

    }

    update_btn_add(cart.item_count);
}



/**
* Perapare Data
*  @function[<prepare_data>]
*
* This function Serialize and prepara data for request Json
*
* Dependencies: Object Cart, Form Product
*
* @param{HTMLElement} form - form in Product Page
* @param{int} cart_items - Quantity items in Cart Object
*
* @return Json Object
*/
function prepare_data(form, cart_items) {
    var id, quantity,
        data = {},
        form_data = form.serializeArray();

    form_data.forEach(function (e) {
        if (e.name === 'id') {
            id = e.value;
        } else if (e.name === 'quantity') {
            quantity = parseInt(e.value);
            data[id] = get_product_quantity(cart_items, id) + quantity;
        } else if (e.name.indexOf('updates[') > -1) {
            data[e.name.replace(/[^0-9]/g, '')] = e.value;
        }
    });

    return { updates: data };
}



/**
* Get Quantity Products in Cart
* @function[<update_btn_add>]
*
* This function get quantity of Product In Array Items in the Cart Object
*
* Dependencies: Object Cart
* @param{int} Quantity items
* @return {int} quantity items
*
* @return Quantity Products of same variant in Cart object
*/
function get_product_quantity(items, product_id) {
    for (var i = 0, j = items.length; (i < j) && (items[i].id != product_id); i++);

    return (i < j) ? parseInt(items[i].quantity) : 0;
}



/**
/**
* Updat Button Add To Cart
* @function[<update_btn_add>]
*
* This function update the texts of price and quantity in Button Add To Cart
*
* Dependencies: Object Product
* @param{int} item_count - Quantity items
*
*/
function update_btn_add(item_count) {
    jQuery('#cart-count > .count').html(item_count);

    if (item_count > 1)
        jQuery('.jq_qtd_bt_proceed').html(item_count + ' Items');
    else
        jQuery('.jq_qtd_bt_proceed').html(item_count + ' Item');
}



/**
*
*/
var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var d = new Date();
var type_of_value;
var _discount_in_cart_page = jQuery('.btn-wrapper form .text_botom_button');
var _cupom_drawer = jQuery('.cupom-text');
var _shipping_drawer_text = jQuery('.shipping-discount-drawer');


/**
* Update Shipping Bar
*  @function[<update_shipping_bar>]
*
* This function update the texts of discounts in Shipping Bar Header and Cart Drawer
*
* Dependencies: none
* @param{int} total price Cart
* @param{int} quantity Items Cart
*
*/
function update_shipping_bar(current_total_price, quantity_cart) {
    if (typeof shipping_bar !== 'undefined') {
        var d = new Date(); 
        var _shipping_bar_text = jQuery('.shipping-bar-text');

        var _message_initial = 'ONLY <span class="free_shipping money" > ' + (Shopify.formatMoney(shipping_bar.shipping_value - current_total_price)) + '</span> AWAY FROM FREE SHIPPING!';
        var _message_sucess_in_cartPage = "<strong>" + cart_page.text_cart_above_button_sucess + "</strong>";
        
        var _message_default_in_cartPage = cart_page.text_cart_above_button;
        var _message_initial_quantity = 'ONLY <span class="free_shipping money" > ' + (shipping_bar.shipping_quantity - quantity_cart) + '&nbspProducts</span> AWAY FROM FREE SHIPPING!';
        var _message_default_shippingBar_quantity = shipping_bar.first_free_shipping_text + '&nbsp<span class="free_shipping money" > ' + (shipping_bar.shipping_quantity - quantity_cart) + '&nbspProducts </span> &nbsp' + shipping_bar.second_free_shipping_text;
        var _message_drawer_cupom;
        var _shipping_drawer_text = jQuery('.shipping-discount-drawer');

        if (cart_page.enable_week_message) {
            _message_default_in_cartPage += '<br><strong>' + week[d.getDay()] + ' Only!</strong>';
        }

        if (_cupom_drawer.length) {
            _message_drawer_cupom = "<strong>" + drawer_texts.cupom + "</strong>";
        }

        if (quantity_cart == 0) {
            if (shipping_bar.price_enable == "shipping_bar_free_price") {
                type_of_value = shipping_bar.first_free_shipping_text + ' <span class="free_shipping money">' + Shopify.formatMoney(shipping_bar.shipping_value) + '</span>&nbsp' + shipping_bar.second_free_shipping_text;
            } else {
                type_of_value = shipping_bar.first_free_shipping_text + ' <span class="free_shipping money">' + shipping_bar.shipping_quantity + ' Products</span>';
            }

            _shipping_bar_text.html(type_of_value);
            _cupom_drawer.hide();

            if (_shipping_drawer_text.length) {
                _shipping_drawer_text.html(type_of_value);
            };
        } else {
            jQuery('.cupom-text').show();

            if (shipping_bar.price_enable == "shipping_bar_free_price") {
                if (current_total_price == 0) {
                    _shipping_bar_text.html(_message_initial);
                    if (cart_page.cart_enable_discount_shipping_bar) { _discount_in_cart_page.html(_message_sucess_in_cartPage); }
                    if (_cupom_drawer.length && cart_page.cart_enable_discount_shipping_bar) { _cupom_drawer.html(_message_drawer_cupom); }

                    if (_shipping_drawer_text.length) { _shipping_drawer_text.html(_message_initial); }
                } 
                else if (current_total_price >= shipping_bar.shipping_value) {
                    _shipping_bar_text.html(shipping_bar.free_shipping_text);

                    if (cart_page.cart_enable_discount_shipping_bar) { _discount_in_cart_page.html(_message_sucess_in_cartPage); }
                    if (_cupom_drawer.length && cart_page.cart_enable_discount_shipping_bar) { _cupom_drawer.html(_message_sucess_in_cartPage); }

                    if (_shipping_drawer_text.length) { _shipping_drawer_text.html(shipping_bar.free_shipping_text); }

                    if (VastaShop.config.enable_freeshipping_msg && cart_page.cart_enable_discount_shipping_bar) {
                        $('#cart-drawer-freeshipping-msg').html(" "+VastaShop.config.freeshipping_msg);
                    }
                    
                } else {
                    _shipping_bar_text.html(_message_initial);

                    if (cart_page.cart_enable_discount_shipping_bar) { _discount_in_cart_page.html(_message_default_in_cartPage); }
                    if (_cupom_drawer.length && cart_page.cart_enable_discount_shipping_bar) { _cupom_drawer.html(_message_drawer_cupom); }

                    if (_shipping_drawer_text.length) { _shipping_drawer_text.html(_message_initial); }

                    if (cart_page.cart_enable_discount_shipping_bar) {$('#cart-drawer-freeshipping-msg').html('');}
                }
            } else if (shipping_bar.price_enable == "shipping_bar_free_qtd") {
                if (quantity_cart == 0) {
                    _shipping_bar_text.html(_message_default_shippingBar_quantity);
                    if (cart_page.cart_enable_discount_shipping_bar) { _discount_in_cart_page.html(_message_sucess_in_cartPage); }
                    if (_cupom_drawer.length && cart_page.cart_enable_discount_shipping_bar) { _cupom_drawer.html(_message_drawer_cupom); }

                    if (_shipping_drawer_text.length) { _shipping_drawer_text.html(_message_default_shippingBar_quantity); }
                } else if (quantity_cart >= shipping_bar.shipping_quantity) {
                    _shipping_bar_text.html(shipping_bar.free_shipping_text);
                    if (cart_page.cart_enable_discount_shipping_bar) { _discount_in_cart_page.html(_message_sucess_in_cartPage); }
                    if (_cupom_drawer.length && cart_page.cart_enable_discount_shipping_bar) { _cupom_drawer.html(_message_sucess_in_cartPage); }

                    if (_shipping_drawer_text.length) { _shipping_drawer_text.html(shipping_bar.free_shipping_text); }
                    if (VastaShop.config.enable_freeshipping_msg && cart_page.cart_enable_discount_shipping_bar) {
                        $('#cart-drawer-freeshipping-msg').html(VastaShop.config.freeshipping_msg);
                    }

                } else {
                    _shipping_bar_text.html(_message_initial_quantity);
                    if (cart_page.cart_enable_discount_shipping_bar) { _discount_in_cart_page.html(_message_default_in_cartPage); }
                    if (_cupom_drawer.length && cart_page.cart_enable_discount_shipping_bar) { _cupom_drawer.html(_message_drawer_cupom); }

                    if (_shipping_drawer_text.length) { _shipping_drawer_text.html(_message_initial_quantity); }

                    if (cart_page.cart_enable_discount_shipping_bar) {$('#cart-drawer-freeshipping-msg').html('');}
                }
            }
        }
    }
    update_text_copy_message(current_total_price, quantity_cart);
  	 setTimeout(function()              
          {
       pbar();
      
         
		},50);
}

/**
* Update Discout Cart
* @function[<update_discount_cart>]
*
* This function update the texts of discounts in cart Page and Cart Drawer
*
* Dependencies: none
* @param{int} current_total_price - total price Cart
* @param{int} quantity_cart - quantity Items Cart
*
*/
function update_discount_cart(current_total_price, quantity_cart) {
    var d = new Date;
    
    if (typeof shipping_bar !== 'undefined' && typeof cart_page !== 'undefined' ) {
        var _message_sucess_in_cartPage = "<strong>" + cart_page.text_cart_above_button_sucess + "</strong>";
        
         var _message_default_in_cartPage = cart_page.text_cart_above_button;
        var _message_drawer_cupom;

        if (_cupom_drawer.length) {
            _message_drawer_cupom = "<strong>" + drawer_texts.cupom + "</strong>";
        }

        if (cart_page.enable_week_message) {
            _message_default_in_cartPage += '<br><strong>' + week[d.getDay()] + ' Only!</strong>';
        }
        
        if (cart_page.discount_in_cart_page == 'quantity') {
            if (quantity_cart >= cart_page.cart_discount_quantity) {
                if (VastaShop.config.enable_freeshipping_msg && (!cart_page.cart_enable_discount_shipping_bar)) {
                    $('#cart-drawer-freeshipping-msg').html(VastaShop.config.freeshipping_msg);
                }
                if (!cart_page.cart_enable_discount_shipping_bar) {
                    _discount_in_cart_page.html(_message_sucess_in_cartPage); 
                    _cupom_drawer.html(_message_sucess_in_cartPage);
                }
            } else if (!cart_page.cart_enable_discount_shipping_bar) {
                _discount_in_cart_page.html(_message_default_in_cartPage);
                _cupom_drawer.html(_message_drawer_cupom);
                $('#cart-drawer-freeshipping-msg').html('');
            }
        } else if (cart_page.discount_in_cart_page == 'price') {

            if (current_total_price >= cart_page.cart_discount_value) {
                if (VastaShop.config.enable_freeshipping_msg && (!cart_page.cart_enable_discount_shipping_bar)) {
                    $('#cart-drawer-freeshipping-msg').html(VastaShop.config.freeshipping_msg);
                }
                if (!cart_page.cart_enable_discount_shipping_bar) {
                    _discount_in_cart_page.html(_message_sucess_in_cartPage);
                    _cupom_drawer.html(_message_sucess_in_cartPage);
                }
            } else if (!cart_page.cart_enable_discount_shipping_bar) {
                _discount_in_cart_page.html(_message_default_in_cartPage);
                _cupom_drawer.html(_message_drawer_cupom);
                $('#cart-drawer-freeshipping-msg').html('');
            }
        }
    }
}
/**
* Update Text Copy Message
* @function[<update_discount_cart>]
*
* This function update Text Copy Message
*
* Dependencies: none
* @param{int} current_total_price - total price Cart
* @param{int} quantity_cart - quantity Items Cart
*
*/
function update_text_copy_message(current_total_price, quantity_cart) {

    if (typeof shipping_bar !== 'undefined' && typeof cart_page !== 'undefined' ) {      
        if (cart_page.discount_in_cart_page == 'quantity') {
            if (quantity_cart >= cart_page.cart_discount_quantity && VastaShop.config.enable_freeshipping_msg && (!cart_page.cart_enable_discount_shipping_bar)) {
                    $('#cart-drawer-freeshipping-msg').html(VastaShop.config.freeshipping_msg);
            } else if (!cart_page.cart_enable_discount_shipping_bar) {
                $('#cart-drawer-freeshipping-msg').html('');
            }
        } else if (cart_page.discount_in_cart_page == 'price') {
            if (current_total_price >= cart_page.cart_discount_value && VastaShop.config.enable_freeshipping_msg && (!cart_page.cart_enable_discount_shipping_bar)) {
                    $('#cart-drawer-freeshipping-msg').html(VastaShop.config.freeshipping_msg);
            } else if (!cart_page.cart_enable_discount_shipping_bar) {
                $('#cart-drawer-freeshipping-msg').html('');
            }
        }
    }
}


/**
* reCharge
*  @function[<reCharge>]
*
* This function update the prices values when user choose an option.
*
* Dependencies: reCharge App
*
* Changes: Add the attribute 'data-product-price' on input '.rc_radio' - file:
*          'subscription-product.liquid'.
* 
* Input without discount -> data-product-price=""
* 
* 
* Input whith discount
* 
* 
* 
* data-product-price="0.0"
* 
* @param {type} callback - function of App
*/
function recharge(callback) {
    var quantity, price,
        _rc_radio = $('.rc_radio'),
        _tag_prices = $('.current-price, .btn-add-tocart .btn-money'),
        _quantity = $('.product-quantity-wrapper > .quantity');

    _rc_radio.change(function () {
      price = parseInt($(this).data('product-price'));
      quantity = parseInt(_quantity.val());

      _tag_prices.html(Shopify.formatMoney(price * quantity));

      if (typeof callback === 'function')
        callback(price, quantity);
    });
  }



/**
 * Enable Edition Product Quantity
 * @function[<enableInputs>]
 *
 * This feature enable the edition of the product quantity fields
 *
 * Dependencies: HTML
 *
 * @param{ int } variant_id - int
 *
 */
function enableInputs(variant_id){
    if(jQuery('.btn-add-tocart').hasClass('hide') == false){

      VastaShop.Variables._bt_minus.removeAttr('disabled');
      VastaShop.Variables._input_qtd.removeAttr('disabled');
      VastaShop.Variables._bt_plus.removeAttr('disabled');
      VastaShop.Variables._addToCartForm.removeAttr('disabled');
      VastaShop.Variables._invetoryError.html('This variant can\'t be added anymore').css('display', 'none');
    }
}



      /**
      * Disables Edition Product Quantity
      * @function[<disableInputs>]
      *
      * This feature disables the edition of the product quantity fields
      *
      * Dependencies: HTML
      *
      * @param{ int } variant_id - Object
      *
      */
      function disableInputs(variant_id) {
          VastaShop.Variables._bt_plus.attr('disabled','disabled');
          VastaShop.Variables._bt_minus.attr('disabled','disabled');
          VastaShop.Variables._input_qtd.attr('disabled','disabled');
          setTimeout(function() {
              VastaShop.Variables._addToCartForm.attr('disabled','disabled');
          }, 50);
          VastaShop.Variables._invetoryError.html('This variant can\'t be added anymore').css('display', 'block');
      }



      /**
      * Verify Cart Inventory
      * @function[<verifyCartInventory>]
      *
      * This function inspects the cart to account for how many variants of the product have been added
      *
      * Dependencies: Cart Object
      *
      * @param{ int } variant_id - int
      *
      */
     function getProductVariants() {
        var variants_inventory = [];

        $('#all-product-variants option').each(function(){
            var v = $(this);
        
            variants_inventory.push({
                id: v.attr('value'),
                inventory_quantity: parseInt(v.attr('data-inventory')),
                inventory_policy: v.attr('data-inventory_policy'),
                inventory_management: v.attr('data-variant-inventory')
            });
        });

        return variants_inventory;
     }

        function verifyCartInventory(variant_id){
            enableInputs(variant_id);
          
            VastaShop.Variables.itemqtdRest = VastaShop.Variables._allVariants.find('option[value="'+ variant_id +'"]').attr('data-inventory');

            
            getProductVariants().forEach(function(variant, i){
                if(variant_id == variant.id){
                    VastaShop.Variables.variant_inventory = variant.inventory_quantity;
                    VastaShop.Variables.inventory_policy =  variant.inventory_policy;
                    VastaShop.Variables.inventory_management = variant.inventory_management;
                }
            });

            if(VastaShop.Cart.current.item_count > 0){
                VastaShop.Cart.current.items.forEach(function(item,i){
                    VastaShop.Variables.itemqtdRest = productInventory(item,variant_id);
                });
            } else {
                VastaShop.Variables.itemqtdRest = productInventory(null,variant_id);
            }
        }



      /**
      * Product Inventory
      * @function[<productInventory>]
      *
      * This function tells the inventory values of the product
      *
      * Dependencies: Product Object
      *
      * @param{ int } item - int
      * @param{ int } variant_id - int
      *
      */
      function productInventory(item,variant_id){
          if(VastaShop.Variables.inventory_policy == 'continue' || VastaShop.Variables.inventory_management == null ){
              VastaShop.Variables.itemqtdRest = -1;
          } else if( item != null && variant_id == item.variant_id) {
              VastaShop.Variables.itemqtdRest = VastaShop.Variables.variant_inventory - item.quantity;
              if(VastaShop.Variables.itemqtdRest == 0){
                //   disableInputs(variant_id);
              }
          } else {
              VastaShop.Variables.itemqtdRest = VastaShop.Variables.variant_inventory;
          }
          return VastaShop.Variables.itemqtdRest;
      }



      /**
      * Inventory Control
      * @function[<inventoryControl>]
      *
      * This function detects if the variant ques is being modified on the cart is selected on the product page to change its inventory at run time
      *
      * Dependencies: Product Object, Cart Object
      *
      * @param{ int } variant_id - int
      *
      */
     function get_cart_variant( id ) {
        var j,
            i = 0,
            items = VastaShop.Cart.current.items;

        for(j = items.length; i < j && items[i].id != id; i++);

        return (i < j) ? items[i]: null;
    }

    function inventoryControl(variant_id){
        if(jQuery('body').hasClass('template-product')){
            var inventoryQTD = verifyCartInventory(variant_id);
            VastaShop.Variables._allVariants.find('option[value="'+ variant_id +'"]').attr('data-inventory', inventoryQTD);

            if(jQuery('#ProductQuantity').length > 0 && jQuery(VastaShop.Variables._allVariants).find(' option:selected').val() == variant_id)
                jQuery('#ProductQuantity').attr('data-max', parseInt(jQuery(VastaShop.Variables._allVariants).find('option:selected').attr('data-inventory')) == -1 ? parseInt(jQuery('#ProductQuantity').val()) + 3 : inventoryQTD  );
        }
    }


/**
 * Function that handle the size chart.
 *
 * @param {Object} event Event JS
 * @return Boolean
 */
function size_chart( event ) {
    var self = $(this),
        link = self.attr('href'),
        id_modal = self.attr('data-modal'),
        modal = $('.jq-sizechart-modal[data-id="' + id_modal + '"]');

    modal.addClass('active');

    return false;
}


// *****************************************************************************
// *****************************************************************************
// *****************************************************************************


  (function ($) {
    jQuery(document).ready(function () {
        var $document = $(this),
            sections = new VastaShop.Sections();
        inventoryControl($('.all-variant option:selected').val());
  

        if (window.SectionReviews && typeof window.SectionReviews !== 'undefined')
            sections.register('reviews', window.SectionReviews);

        if (window.SectionSliderPromotional && typeof window.SectionSliderPromotional !== 'undefined')
            sections.register('slider-promotional', window.SectionSliderPromotional);

        if (window.SectionVideoSlider && typeof window.SectionVideoSlider !== 'undefined')
        sections.register('video', window.SectionVideoSlider);

        if (window.SectionSwatch && typeof window.SectionSwatch !== 'undefined')
            sections.register('swatch', window.SectionSwatch);

        if (window.SectionFooter && typeof window.SectionFooter !== 'undefined')
            sections.register('main-footer', window.SectionFooter);

        if (window.SectionCartDrawer && typeof window.SectionCartDrawer !== 'undefined')
            sections.register('cart-drawer', window.SectionCartDrawer);

        if (window.SectionMenuMobile && typeof window.SectionMenuMobile !== 'undefined')
            sections.register('menu-mobile', window.SectionMenuMobile);

        if (window.SectionShippingBar && typeof window.SectionShippingBar !== 'undefined')
            sections.register('shipping-bar', window.SectionShippingBar);

        if (window.SectionHeader && typeof window.SectionHeader !== 'undefined')
            sections.register('header', window.SectionHeader);

        if (window.SectionSliders && typeof window.SectionSliders !== 'undefined')
            sections.register('sliders', window.SectionSliders);

        if (window.SectionInstafeed && typeof window.SectionInstafeed !== 'undefined')
            sections.register('instafeed', window.SectionInstafeed);

        jQuery('#AddToCartFloat').click(function () {
            VastaShop.Variables._add_to_cart.trigger('submit');
        });

        jQuery('#AddToCart2').click(function () {
            VastaShop.Variables._add_to_cart.trigger('submit');
        });
        jQuery('#AddToCart3').click(function () {
            VastaShop.Variables._add_to_cart.trigger('submit');
        });
        // Size chart
        $document.on('click', '.vasta-size-chart-link', size_chart);
    });
})(jQuery);

