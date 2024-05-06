odoo.define('website_testimonial_snippet_pack2.testimonial_pack2_frontend_js',function(require){
  'use strict';
  var animation = require('website.content.snippets.animation');

  animation.registry.testimonial_pack2_slider = animation.Class.extend({

    selector : ".testimonial_pack2",

    /**
     * @override
     */
    start: function () {
      this.redrow();
      return this._super.apply(this, arguments);
    },

    stop: function(){
      this.clean();
    },

    redrow: function(debug){
      this.clean(debug);
      this.build(debug);
    },

    clean:function(debug){
      this.$target.trigger('destroy.owl.carousel')
        .removeClass('owl-carousel owl-loaded owl-drag');
      this.$target.find('.owl-nav, .owl-dots').remove();
      this.$target.find('.owl-stage-outer').children().unwrap();
      this.$target.find('.owl-item.cloned').remove();
    },

    build: function(debug) {
      var self = this
      var style = this.$target.attr('class').match(/\bpack2_style[^\s]+\b/);
      var items = this.$target.data('item-show');
      var speed = this.$target.data('slidespeed');
      var autoplay = Boolean(this.$target.data('autoplay'));
      this.$inner = this.$target.find('.owl-stage');
      this.$target.addClass('owl-carousel');
      this.owl = this.$target.owlCarousel({
          itemClass:'owl-item card-item',
          stageClass: 'owl-stage cards',
          margin:20,
          autoplay:autoplay,
          autoplayTimeout:speed,
          autoplayHoverPause:true,
          dots:true,
          nav:false,
          responsiveClass:true,
          navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
          '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
          autoHeight: false,
          autoHeightClass: 'owl-height',
          responsive:{
              0:{
                  items:1,
                  slideBy:1,
              },
              480:{
                  items:1,
                  slideBy:1,
                  nav:false,
                  dots:true,
              },
              768:{
                  items:2,
                  slideBy:2,
                  nav:false,
                  dots:true,
              },
              1024:{
                  items:items,
                  slideBy:items,
              }
          }
      });

      if($('.o_editable').length === 0) {
        var options = this.owl.data('owl.carousel').options;
        options.loop = true;
        this.owl.trigger('refresh.owl.carousel');
      }
    },

    /**
     * @override
     */
    destroy: function () {
      this.clean();
      return this._super.apply(this, arguments);
    },

  });

});
