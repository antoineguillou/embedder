(function (document, window) {
  var embedder = function(selector, options){
    this.servicesSupported = [{
      name: 'youtube',
      filter: /(?:https?:\/\/)?(?:(?:www\.)?(?:youtube(?:-nocookie)?|youtube.googleapis)\.com.*(?:v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i
    },{
      name: 'vimeo',
      filter: /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)/i
    },{
      name: 'dailymotion',
      filter: /(?:https?:\/\/)?(?:www\.)?dai\.?ly(?:motion)?(?:\.com)?\/?.*(?:video|embed)?(?:.*v=|v\/|\/)([a-z0-9]+)/i
    },{
      name: 'twitch',
      filter: /(?:https?:\/\/)?(?:www\.)?(?:twitch(?:-nocookie)?|twitch.googleapis)\.(?:com|tv).*(?:v\/|v=|vi=|vi\/|videos\/)([0-9]+)/i
    }];
    this.selector = selector;
    this.options = {
      autoplay: false, // bool
      cover: null, // cover image
      id: null, // video ID
      ratio: '16:9', // any valid video ratio
      service: null, // video streaming site
      url: null // video url
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
      if(!this.selector.hasAttribute('data-embedder'))
        this.selector.setAttribute('data-embedder', '');

      if(this.selector.hasAttribute('data-ratio'))
        this.options.ratio = this.selector.getAttribute('data-ratio');
      this._setRatio();

      if(this.selector.hasAttribute('data-autoplay'))
        this.options.autoplay = true;

      if (this.options.service == null || this.options.id == null){
        var lenService = this.servicesSupported.length;
        var idxService = 0;
        for(;idxService < lenService; idxService++) {
          var currentDataService = 'data-'+this.servicesSupported[idxService].name;
          if(this.selector.hasAttribute(currentDataService)){
            this.options.id = this.selector.getAttribute(currentDataService);
            this.options.service = this.servicesSupported[idxService].name;
            break;
          }
        }
      }
      if (this.options.url == null){
        if(this.selector.hasAttribute('data-url')){
          this.options.url = this.selector.getAttribute('data-url');
        }
      }

      if ((this.options.service == null || this.options.id == null) && this.options.url !== null){
        var self = this;
        this._parseUrl(function(){
          self._buildIframe(self);
        });
      } else if(this.options.service !== null && this.options.id !== null){
        this._buildIframe();
      } else {
        if(this.options.service == null && this.options.id == null && this.options.url == null){
          this._log('Please provide a valid video URL or service + ID');
        } else if(this.options.service == null && this.options.id !== null){
          this._log('Please provide the video service for ID '+this.options.id);
        }  else if(this.options.service !== null && this.options.id == null){
          this._log('Please provide the '+this.options.service+' video ID');
        }
      }

    },
    _addClickEvent: function(){
      var self = this;
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
    _parseUrl: function(callback){
      var output;
      var lenService = this.servicesSupported.length;
      var idxService = 0;

      for(;idxService < lenService; idxService++) {
        var test = this.servicesSupported[idxService].filter.exec(this.options.url);
        if(test){
          //console.log(test);
          this.options.service = this.servicesSupported[idxService].name;
          this.options.id = test[1];
          break;
        }
      }
      callback();
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

      var src = "https://player.twitch.tv/?video="+id;
      if(window.location.hostname){
        var hostname = window.location.hostname;
        src += "&parent="+hostname;
      }
      if(this.options.autoplay)
        src += "&autoPlay=1";
      iframe.src = src;
      return iframe;
    },
    _buildIframe: function(){
      this.iframe = this['_create'+ this.options.service[0].toUpperCase() + this.options.service.slice(1)+'Iframe'](this.options.id);
      //console.log(this.iframe);
      this._addClickEvent();
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
