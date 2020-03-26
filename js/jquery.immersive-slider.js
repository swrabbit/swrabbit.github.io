
!function($){
  
  var defaults = {
    animation: "bounce",
    slideSelector: ".slide",
    container: ".main",
    cssBlur: false,		// 背景图片是否模糊
    pagination: true,	// 是否显示分页
    loop: true,			// 是否循环轮播
    autoStart: 4000		// 轮播时间间隔
	};
  	
	$.fn.swipeEvents = function() {
      return this.each(function() {

        var startX,
            startY,
            $this = $(this);

        $this.bind('touchstart', touchstart);

        function touchstart(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            startX = touches[0].pageX;
            startY = touches[0].pageY;
            $this.bind('touchmove', touchmove);
          }
          event.preventDefault();
        }

        function touchmove(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            var deltaX = startX - touches[0].pageX;
            var deltaY = startY - touches[0].pageY;

            if (deltaX >= 50) {
              $this.trigger("swipeLeft");
            }
            if (deltaX <= -50) {
              $this.trigger("swipeRight");
            }
            if (deltaY >= 50) {
              $this.trigger("swipeUp");
            }
            if (deltaY <= -50) {
              $this.trigger("swipeDown");
            }
            if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
              $this.unbind('touchmove', touchmove);
            }
          }
          event.preventDefault();
        }

      });
    };
  
  $.fn.transformSlider = function(settings, pos) {
    var el = $(this)
    switch(settings.animation) {
      case 'slide':
        el.addClass("ease").css({
          "-webkit-transform": "translate3d(" + pos + "%, 0, 0)", 
          "-moz-transform": "translate3d(" + pos + "%, 0, 0)", 
          "-ms-transform": "translate3d(" + pos + "%, 0, 0)", 
          "transform": "translate3d(" + pos + "%, 0, 0)"
        });
      break;
      case 'slideUp':
        el.addClass("ease").css({
          "-webkit-transform": "translate3d(0, " + pos + "%, 0)", 
          "-moz-transform": "translate3d(0, " + pos + "%, 0)", 
          "-ms-transform": "translate3d(0, " + pos + "%, 0)", 
          "transform": "translate3d(0, " + pos + "%, 0)"
        });
      break;
      case 'bounce':
        el.addClass("bounce").css({
          "-webkit-transform": "translate3d(" + pos + "%, 0, 0)", 
          "-moz-transform": "translate3d(" + pos + "%, 0, 0)", 
          "-ms-transform": "translate3d(" + pos + "%, 0, 0)", 
          "transform": "translate3d(" + pos + "%, 0, 0)"
        });
      break;
      case 'bounceUp':
        el.addClass("bounce").css({
          "-webkit-transform": "translate3d(0, " + pos + "%, 0)", 
          "-moz-transform": "translate3d(0, " + pos + "%, 0)", 
          "-ms-transform": "translate3d(0, " + pos + "%, 0)", 
          "transform": "translate3d(0, " + pos + "%, 0)"
        });
      break;
      case 'fade':
        el.addClass("no-animation").fadeOut("slow", function() {
          el.css({
            "-webkit-transform": "translate3d(" + pos + "%, 0, 0)", 
            "-moz-transform": "translate3d(" + pos + "%, 0, 0)", 
            "-ms-transform": "translate3d(" + pos + "%, 0, 0)", 
            "transform": "translate3d(" + pos + "%, 0, 0)"
          }).fadeIn("slow");
        });
      break;
    }
  }
 
  
  $.fn.positionSlides = function(settings, index) {
    var el = $(this);
    if (settings.animation == "slideUp" || settings.animation == "bounceUp") {
      el.css({
        top: (index * 100) + "%"
      });
    }else {
      el.css({
        left: (index * 100) + "%"
      });
    }
  }
  
  
  
  $.fn.immersive_slider = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this),
        cssblur = "",
        pagination = "";
        
    // 添加所有js特定类 
    el.addClass("immersive_slider")
    el.find(settings.slideSelector).addClass("is-slide");
    
    // 使用CSS模糊插件自动找到的第一个图像 
    if (settings.cssBlur == true) {
      el.find(".is-slide img:first-child").each(function( index ) {
        var activeclass = ""
        if(index == 0) activeclass = "active"
        var img = $(this);
        
        $(settings.container).addClass("is-container").prepend("<div id='slide_" + (index + 1) + "_bg' class='is-background gs_cssblur " + activeclass + "'>" + img.clone().wrap("<div />").parent().html() + "</div>")
        $("#slide_" + (index + 1) + "_bg").positionSlides(settings, index)
      });
    } else {
      el.find(".is-slide").each(function( index ) {
        var activeclass = ""
        if(index == 0) activeclass = "active"
        var img = "<img src='"+ $(this).data("blurred") +"'>";
        
        $(settings.container).addClass("is-container").prepend("<div id='slide_" + (index + 1) + "_bg' class='is-background " + activeclass + "'>" + img + "</div>")
        $("#slide_" + (index + 1) + "_bg").positionSlides(settings, index)
      });
    }
    var timer;
	// 定时器设置自动下一页
    if(settings.autoStart != 0 || settings.autoStart != false) {
		timer = setInterval(function() {
        el.moveNext();
      }, settings.autoStart);
    }
	
	/*
	var divBox = document.getElementById('.immersive_slider');
	divBox.onmouseover = function(){
		clearInterval(timer);
	}
	
	//$(".immersive_slider").click(function() {
	//		clearInterval(timer);
	//});
	*/
    $(settings.container).find(".is-background").wrapAll( "<div class='is-bg-overflow' />");
    el.find(".is-slide").wrapAll( "<div class='is-overflow' />");
    el.find(".is-slide").each(function( index ) {
      var activeclass = ""
      if(index == 0) activeclass = "active"
      $(this).attr("id","slide_" + (index + 1)).addClass(activeclass)
      $(this).positionSlides(settings, index)
      if(settings.pagination == true) {
        pagination += "<li><a class='is-page " + activeclass + "' href='#slide_" + (index + 1) + "'></a></li>"
      }
    });
    
    $("<ul class='is-pagination'>"+pagination+"</ul>").appendTo(el)
    
    if(settings.pagination == true)  {
      $(".is-pagination li a").click(function (){
        var page_index = $(this).attr("href");
        
        if (!$(this).hasClass("active")) {
          el.moveSlider(settings, page_index)
        }
        return false
      });
    }
   $(".is-next").click(function() {
     el.moveNext();
     return false;
   });
   $(".is-prev").click(function() {
     el.movePrev();
     return false;
   });
  
	
	
    $.fn.moveSlider = function(settings, page_index) {
      var el = $(this),
          current = el.find(".is-slide.active"),
          next = el.find(".is-slide" + page_index),
          bg_current = $(settings.container).find(".is-background.active"),
          bg_next = $(settings.container).find(".is-background" + page_index + "_bg");
      if(next) {
        current.removeClass("active")
        next.addClass("active")
        
        bg_current.removeClass("active")
        bg_next.addClass("active")
        $(".is-pagination li a" + ".active").removeClass("active");
        $(".is-pagination li a" + "[href='" + (page_index) + "']").addClass("active");
      }
      pos = ((page_index.replace('#slide_','') - 1) * 100) * -1;
      el.find(".is-overflow").transformSlider(settings, pos);
      $(settings.container).find(".is-bg-overflow").transformSlider(settings, pos);
    }
    
	// 下一张图片
    $.fn.moveNext = function() {
      var el = $(this),
        total = el.find(settings.slideSelector).length + 1,
        page_index_number = parseInt($(this).find(".is-slide.active").attr("id").replace('slide_','')) + 1;
      if(page_index_number < total) {
        el.moveSlider(settings, "#slide_" + page_index_number)
      } else {
        if (settings.loop == true ) el.moveSlider(settings, "#slide_1")
      }
    }
    
	// 上一张图片
    $.fn.movePrev = function() {
      var el = $(this),
        total = el.find(settings.slideSelector).length + 1,
        page_index_number = parseInt($(this).find(".is-slide.active").attr("id").replace('slide_','')) - 1;
      if(page_index_number <= total && page_index_number > 0) {
        el.moveSlider(settings, "#slide_" + page_index_number)
      }else {
        if (settings.loop == true ) el.moveSlider(settings, "#slide_" + (total - 1 ))
      }
    }
    
    el.swipeEvents().bind("swipeRight",  function(){ 
      el.movePrev();
    }).bind("swipeLeft", function(){ 
      el.moveNext(); 
    });
  }
    
}(window.jQuery);


