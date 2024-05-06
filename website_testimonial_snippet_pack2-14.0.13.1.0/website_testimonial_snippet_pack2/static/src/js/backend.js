odoo.define('website_testimonial_snippet_pack2.testimonial_pack2_backend_js', function(require) {
    'use strict';

    var options = require('web_editor.snippets.options');

    var web_editor = require('web_editor.editor');

    options.registry.testimonial_pack2_slider = options.Class.extend({

      /**
       * @override
       */
      start: function () {
          var self = this;
          var style = this.$target.parents('section')
          .attr('class').match(/\bpack2_style[^\s]+\b/);
          this.o_id = 'testimonial_'+ style + '_';
          var items = this.$target.attr('data-item-show');
          var speed = this.$target.attr('data-slidespeed');
          var autoplay = Boolean(this.$target.attr('data-autoplay'));
          this.item = this.$target.find('.testimonial_content:first');
          this.owl = this.$target.owlCarousel({
            itemClass:'owl-item card-item',
            stageClass: 'owl-stage cards',
            loop:false,
            margin:20,
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
          this.id = this.$target.attr('id');
          this.$inner = this.$target.find('.owl-stage');

          return this._super.apply(this, arguments);
      },

      onFocus: function() {
        this.owl.trigger('stop.owl.autoplay');
        this.$target.find('.popup-video').off('click');
        this.$target.find('.popup-video').removeData('magnificPopup');
      },

      clean:function(){
        this.$target.trigger('destroy.owl.carousel')
          .removeClass('owl-carousel owl-loaded owl-drag');
        this.$target.find('.owl-nav, .owl-dots').remove();
        this.$target.find('.owl-stage-outer').children().unwrap();
        this.$target.find('.owl-item.cloned').remove();

      },

      reinit: function() {
        this.clean();
        this.$target.addClass('owl-carousel');
        this.start();
      },

      /**
       * Associates unique ID on slider elements.
       *
       * @override
       */
      onBuilt: function () {
        this.id = this.o_id + new Date().getTime();
        this.$target.attr('id', this.id);
        this._super.apply(this, arguments);
      },

      onClone: function () {
        this.id = this.o_id + new Date().getTime();
        this.$target.attr('id', this.id);
        this._super.apply(this, arguments);
      },

      /**
       * @override
       */
      cleanForSave: function () {
        this.clean();
        this._super.apply(this, arguments);
      },

      /**
       * Adds a slide.
       *
       * @see this.selectClass for parameters
       */
      addSlide: function (previewMode) {
          this.owl.trigger('stop.owl.autoplay');
          var self = this;
          var $active = this.$inner.find('.owl-item.active').last();
          var index = $active.index();
          var $clone = this.item.clone(true);
          this.owl.trigger('add.owl.carousel', $clone)
            .trigger('refresh.owl.carousel');
      },
      /**
       * Removes the current slide.
       *
       * @see this.selectClass for parameters.
       */
      removeSlide: function (previewMode) {
        this.owl.trigger('stop.owl.autoplay');
        var cycle = this.$inner.find('.owl-item').length;
        console.log(cycle);
        var indexToRemove = (cycle - 1)
        if(cycle > 1) {
          this.owl.trigger('remove.owl.carousel', indexToRemove)
            .trigger('refresh.owl.carousel');
        }
      },
      /**
       * Changes the slidespeed for autoplay.
       *
       * @see this.selectClass for parameters
       */
      slidespeed: function (previewMode, value) {
          this.$target.attr('data-slidespeed', value);
          this.reinit();
      },

      itemShow: function (previewMode, value) {
        this.$target.attr('data-item-show', value);
        this.$target.removeClass (function (index, className) {
            return (className.match (/\bitems-\S+/g) || []).join(' ');
        });
        this.$target.addClass('items-'+value)
        this.reinit();
      },

      autoplay: function (previewMode, value) {
        this.$target.attr('data-autoplay', value);
        this.reinit();
      },

      //--------------------------------------------------------------------------
      // Private
      //--------------------------------------------------------------------------

      /**
       * @override
       */
      _setActive: function () {
        this._super.apply(this, arguments);
        this.$el.find('[data-item-show]').removeClass('active')
            .filter('[data-item-show=' + this.$target.attr('data-item-show') + ']')
            .addClass('active');
        this.$el.find('[data-autoplay]').removeClass('active')
            .filter('[data-autoplay=' + this.$target.attr('data-autoplay') + ']')
            .addClass('active');
        this.$el.find('[data-slidespeed]').removeClass('active')
            .filter('[data-slidespeed=' + this.$target.attr('data-slidespeed') + ']')
            .addClass('active');
      },

    });


});
