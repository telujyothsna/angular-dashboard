'use strict';

class ScrollPosDirective {
  // priority = 0;
  // multiElement = false;
  scope = {
    scrollPosition: '=',
    scrollTriggerHeight: '='
  };
  transclude = false;
  restrict = 'EA';
  /*@ngInject*/
  constructor() {

  }

  /*
   * This property is used only if the compile property is not defined.
   * The compile function deals with transforming the template DOM. Since most directives do not do template transformation, it is not used often.
   *
   * @param {object} scope - The scope to be used by the directive for registering watches.
   * @param {DOMElement} element - The element where the directive is to be used. It is safe to manipulate the children of the element only in postLink function since the children have already been linked.
   * @param {Object} attrs - Normalized list of attributes declared on this element shared between all directive linking functions.
   * @param {function} ctrl -
   */
  link(scope, element, attrs, ctrl, transclude) {
    window.addEventListener('scroll', () => {

      var scrollTop = window.scrollY > scope.scrollTriggerHeight;

      if (scrollTop !== scope.prevScrollTop) {

        scope.$apply(function() {
          scope.scrollPos = scrollTop;
        });
      }
      scope.prevScrollTop = scrollTop;
    });
  }
}

class ScrollPosDirectiveController {
  constructor() {

  }
}

export default angular.module('dashboard.scrollpos', [])
  .directive('scrollPos', () => new ScrollPosDirective())
  .name;