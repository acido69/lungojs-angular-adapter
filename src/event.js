angular.module('lungo:event', ['lungo:value']).
  //run(Lungo.Boot.Events.init);
  directive('router', ['Lungo','$rootElement','$rootScope', '$compile',function(lng, $rootElement, $rootScope, $compile){

    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var ELEMENT = lng.Constants.ELEMENT;

    var init = function(scope, element, attr){
        var isInAside = _isDescendant('aside', element[0]);
        if(isInAside) lng.dom(element[0]).tap(_hideAsideIfNecesary);
        lng.dom(element[0]).tap(_loadTarget);
    };

    var _isDescendant = function (parent, child) {
      var node = child.parentNode;
      var cacheNames = [''];

      if(node){
        while (node && node.nodeName !== 'BODY') {
          cacheNames.push(node.nodeName);
          node = node.parentNode;
        }
      }

      var nodesName = cacheNames.join('/').toLowerCase();
      var parentPosition = nodesName.lastIndexOf(parent);
      return (parentPosition>0);
    };

    var _hideAsideIfNecesary = function(event) {
        event.preventDefault();
        lng.View.Aside.hide();
    };

    var _loadTarget = function(event) {
        event.preventDefault();
        var link = lng.dom(this);

        if (link.data("async")) {
            _loadAsyncTarget(link);
        } else {
            _selectTarget(link);
        }
    };

    var _loadAsyncTarget = function(link) {
        lng.Notification.show();
        _load( link.data("async"), link.data(ATTRIBUTE.ROUTER) );
        link[0].removeAttribute("data-async");

        setTimeout(function() {
            _selectTarget(link);
            lng.Notification.hide();
        }, lng.Constants.TRANSITION.DURATION * 2);
    };

    var _load = function(resource, linkType) {
        try {
            var response = _loadSyncResource(resource);
            _pushResourceInBody(response);
            if(linkType === ELEMENT.ASIDE){
                lng.Element.Cache.asides = lng.dom(ELEMENT.ASIDE);
            }

        } catch(error) {
            lng.Core.log(3, error.message);
        }
    };

    var _loadSyncResource = function(url) {
        return $$.ajax({
            url: url,
            async: false,
            dataType: 'html',
            error: function() {
                console.error(ERROR.LOADING_RESOURCE + url);
            }
        });
    };

    var _pushResourceInBody = function(section) {
        if (lng.Core.toType(section) === 'string') {
            $compile(section)($rootScope, function(clone){
                $rootElement.find(ELEMENT.BODY).append(clone);
            });
        }
    };


    var _selectTarget = function(link) {
        var target_type = link.data(ATTRIBUTE.ROUTER);
        switch(target_type) {
            case ELEMENT.SECTION:
                var target_id = link.attr(ATTRIBUTE.HREF);
                _goSection(target_id);
                break;

            case ELEMENT.ARTICLE:
                _goArticle(link);
                break;

            case ELEMENT.ASIDE:
                _goAside(link);
                break;
        }
    };



    var _goSection = function(id) {
        id = lng.Core.parseUrl(id);
        if (id === '#back') {
            lng.Router.back();
        } else {
            lng.Router.section(id);
        }
    };

    var _goArticle = function(element) {
        var section_id = lng.Router.History.current();
        var article_id =  element.attr(ATTRIBUTE.HREF);

        lng.Router.article(section_id, article_id, element);
    };

    var _goAside = function(element) {
        var section_id = lng.Router.History.current();
        var aside_id = element.attr(ATTRIBUTE.HREF);

        lng.Router.aside(section_id, aside_id);
    };



    return init;
  }]).
  directive('checkbox', ['Lungo',function(lng){
    var _changeCheckboxValue = function(event)  {
        event.preventDefault();
        var el = lng.dom(this);
        var current_value = el.val() > 0 ? 0 : 1;
        el.toggleClass("active").attr('value', current_value);
    };
    return function(scope, iElement, iAttr){

      var element = iElement[0];
      $$(element).touch(_changeCheckboxValue);
    };

  }]);