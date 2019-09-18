(function (document, window) {
  var embedder = function(selector, options){
    this.servicesSupported = ['youtube','vimeo','dailymotion','twitch'];
    this.selector = selector;
    this.options = {
      autoplay: false, // bool
      cover: null, // cover image
      id: 'ayf1sYiNLhQ', // video ID
      ratio: '16:9', // any valid video ratio
      service: null // youtube, vimeo, dailymotion
    };
    if(!options){ options = {} }

    var i;
    for (i in this.options) {
      if(i in options) {
        this.options[i] = options[i];
      }
    }

    this._init();
  }
  embedder.prototype = {
    _init: function(){
      var self = this;
      if(!this.selector.hasAttribute('data-embedder'))
        this.selector.setAttribute('data-embedder', '');

      if(this.selector.hasAttribute('data-ratio'))
        this.options.ratio = this.selector.getAttribute('data-ratio');
      this._setRatio();

      if(this.selector.hasAttribute('data-autoplay'))
        this.options.autoplay = true;

      var lenService = this.servicesSupported.length;
      var idxService = 0;
      if (this.options.service !== null) {
        this.iframe = this['_create'+ this.options.service[0].toUpperCase() + this.options.service.slice(1)+'Iframe'](this.options.id);
      } else {
        for(;idxService < lenService; idxService++) {
          var currentDataService = 'data-'+this.servicesSupported[idxService];
          if(this.selector.hasAttribute(currentDataService)) {
            this.options.id = this.selector.getAttribute(currentDataService);
            this.options.service = this.servicesSupported[idxService];
            this.iframe = this['_create'+ this.servicesSupported[idxService][0].toUpperCase() + this.servicesSupported[idxService].slice(1)+'Iframe'](this.options.id);
            break;
          }
        }
      }

      this.selector.addEventListener('click', function(e){
        self.selector.appendChild(self.iframe);
      });
    },
    _setRatio: function(){
      var ratio = this.options.ratio;
      var exp = /(\d*\.?\d+):(\d|\.)/gs;
      exp.test(ratio);
      var padding = (RegExp.$2 / RegExp.$1 * 100);
      this.selector.style.paddingBottom = padding + '%';
    },
    _createBaseIframe: function(){
      var iframe = document.createElement('iframe');
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "");
      return iframe;
    },
    _createYoutubeIframe: function(id){
      var iframe = this._createBaseIframe();
      var src = "https://www.youtube.com/embed/"+id;
      if(this.options.autoplay)
        src += "?autoplay=1";
      iframe.src = src;
      iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
      return iframe;
    },
    _createVimeoIframe: function(id){
      var iframe = this._createBaseIframe();
      var src = "https://player.vimeo.com/video/"+id;
      if(this.options.autoplay)
        src += "?autoplay=1";
      iframe.src = src;
      iframe.setAttribute("allow", "autoplay; fullscreen");
      return iframe;
    },
    _createDailymotionIframe: function(id){
      var iframe = this._createBaseIframe();
      var src = "https://www.dailymotion.com/embed/video/"+id;
      if(this.options.autoplay)
        src += "?autoPlay=1";
      iframe.src = src;
      iframe.setAttribute("allow", "autoplay");
      return iframe;
    },
    _createTwitchIframe: function(id){
      var iframe = this._createBaseIframe();
      var src = "https://player.twitch.tv/?channel="+id;
      if(this.options.autoplay)
        src += "?autoPlay=1";
      iframe.src = src;
      return iframe;
    },
    _log: function(){
      if (window.console && console.log)
        console.log('[embedder] ' + Array.prototype.join.call(arguments,' '));
    }
  }
  embedder.init = function(el){
    embed = new embedder(el);
  }
  embedder.domInspect = function() {
      var elements = document.querySelectorAll('[data-embedder]');
      for (var i = 0; i < elements.length; i++) {
      embedder.init(elements[i]);
    }
  };

  window.embedder = embedder;
  embedder.domInspect();

}(document, window));
