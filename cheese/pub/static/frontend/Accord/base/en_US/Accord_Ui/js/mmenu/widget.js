define([
  'jquery',
  'mmenu'
], function($) {
  "use strict";

  $.widget('mobile.menu', {
    _create: function() {
      $(this.element).mmenu({
         "offCanvas": false
      }, {
       
      });
    }
  });

  return $.mobile.menu;
});
