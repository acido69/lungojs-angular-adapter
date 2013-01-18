angular.module('lungo:data', []).
  directive('icon', [function(){
    return {
      link: function(scope, elm, attr, ngModelCtrl) {
            elm.append('<span class="icon {{value}}"></span>'.replace('{{value}}', attr.icon));
        }
    };
  }]).
  directive('image', [function(){
    return {
      link: function(scope, elm, attr, ngModelCtrl) {
        elm.append('<img src="{{value}}" class="icon" />'.replace('{{value}}', attr.image));
      }
    };
  }]).
  directive('title', [function(){
    return {
      link: function(scope, elm, attr, ngModelCtrl) {
        var node_name = elm[0].nodeName.toLowerCase();
        if(node_name ==='header')
          elm.append('<span class="title centered">{{value}}</span>'.replace('{{value}}', attr.title));
      }
    };
  }]).
  directive('back', [function(){
    return {
      link: function(scope, elm, attr, ngModelCtrl) {
        var node_name = elm[0].nodeName.toLowerCase();
        if(node_name ==='header')
          elm.append('<nav class="left"><a href="#back" data-router="section" class="left"><span class="icon {{value}}"></span></a></nav>'.replace('{{value}}', attr.back));
      }
    };
  }]).
  directive('label', [function(){
    return {
      link: function(scope, elm, attr, ngModelCtrl) {
        var node_name = elm[0].nodeName.toLowerCase();
        if(node_name ==='a' || node_name === 'button')
          elm.append('<abbr>{{value}}</abbr>'.replace('{{value}}', attr.label));
      }
    };
  }]).
  directive('count', [function(){
    return {
      link: function(scope, elm, attr, ngModelCtrl) {
          elm.append('<span class="tag theme count">{{value}}</span>'.replace('{{value}}', attr.count));
      }
    };
  }]).
  directive('pull', [function(){
    return {
      link: function(scope, elm, attr, ngModelCtrl) {
        var node_name = elm[0].nodeName.toLowerCase();
        if(node_name ==='section')
          elm.append('<div class="{{value}}" data-control="pull" data-icon="down" data-loading="black"><strong>title</strong></div>'.replace('{{value}}', attr.pull));
      }
    };
  }]).
  directive('progress', [function(){
    return {
      link: function(scope, elm, attr, ngModelCtrl) {
          elm.append('<div class="progress"><span class="bar"><span class="value" style="width:{{value}};"></span></span></div>'.replace('{{value}}', attr.progress));
      }
    };
  }]).
  directive('loading', [function(){
    return {
      link: function(scope, elm, attr, ngModelCtrl) {
          elm.append('<div class="loading {{value}}"><span class="top"></span><span class="right"></span><span class="bottom"></span><span class="left"></span></div>'.replace('{{value}}', attr.loading));
      }
    };
  }]);