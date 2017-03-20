function AutoPlayBanner(obj){
  this.obj_banner =$(obj);
  this.obj_ul = this.obj_banner.find('ul');
  this.obj_li = this.obj_banner.find('li');
  this.obj_dot = this.obj_banner.find('dot');
  this.len= this.obj_li.length-1;
  this.timer;
  this.now= 0;
  this.sWidth = 0;
  this.init();
}
  AutoPlayBanner.prototype.init = function(){
    var dot = "<div class='dot'>";
    for(var i = 0;i<= this.len;i++){
        dot +="<span></span>";
    }
    dot+="</div>";
    var btn = "<div class='preNext pre'></div><div class='preNext next'></div>";
    this.obj_banner.append(dot);
    $('body').append(btn);

    var _this = this;
    this.timer = setInterval(function(){
        _this.autoPlay();
    },3000);
    this.obj_span = this.obj_banner.find("span");
    this.obj_span.eq(0).addClass("on");
    this.hover();
    this.next();
    this.prev();
    this.objSpan();
    $(window).resize(function(){
        _this.sWidth = _this.obj_li.width();
        _this.obj_ul.width(_this.sWidth * _this.obj_li.length);
        _this.obj_ul.css({"left":-(Math.abs($(window).width()-_this.sWidth)/2)});
    }).resize();
  };
  AutoPlayBanner.prototype.next = function(){
    var _this = this;
    $(".next").click(function(){
        
        clearInterval(_this.timer);
        _this.now = _this.now==_this.len?0:_this.now+1;
        _this.doit(_this.now);
        _this.timer = setInterval(function(){_this.autoPlay()},3000);
    });
  };
  AutoPlayBanner.prototype.prev = function(){
    var _this = this;
    $(".pre").click(function(){
        
        clearInterval(_this.timer);
        _this.now = _this.now==0?_this.len:_this.now-1;
        _this.doit(_this.now);
        _this.timer = setInterval(function(){_this.autoPlay();},3000);
    });
  };
  AutoPlayBanner.prototype.autoPlay = function(){
        var _this = this;
        _this.now = _this.now == _this.len ? 0 : _this.now + 1;
        var nowLeft = _this.now * _this.sWidth;
        _this.obj_ul.stop(true,false).animate({"left":-nowLeft},300);
        _this.obj_span.removeClass('on').eq(_this.now).addClass('on');
  };
  AutoPlayBanner.prototype.objSpan = function(){
        var _this = this;
        console.log(_this.obj_span);
        _this.obj_span.click(function(){
            clearInterval(_this.timer);
            _this.now = $(this).index();
            _this.doit(_this.now);
            _this.timer = setInterval(function(){_this.autoPlay();},3000);
        });       
  };
  AutoPlayBanner.prototype.doit = function(now){
        var nowLeft = this.now * this.sWidth;
        this.obj_ul.stop(true,false).animate({"left":-nowLeft},300);
        this.obj_span.removeClass('on').eq(now).addClass('on');
  };
  AutoPlayBanner.prototype.hover = function(){

    $(".preNext").css("opacity",0.2).hover(function(){
        $(this).stop(true,false).animate({"opacity":"0.5"},300);
    },function(){
        $(this).stop(true,false).animate({"opacity":"0.2"},300);
    });
  }		
