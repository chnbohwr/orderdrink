 angular.module('onsen').factory('reversedSlide', function (NavigatorTransitionAnimator) {

     /**
      * Slide animator for navigator transition.
      */
     var reversedSlide = NavigatorTransitionAnimator.extend({

         /** Black mask */
         backgroundMask: angular.element(
             '<div style="z-index: 2; position: absolute; width: 100%;' +
             'height: 100%; background-color: black; opacity: 0;"></div>'
         ),

         timing: 'cubic-bezier(.1, .7, .4, 1)',
         duration: 0.3,
         blackMaskOpacity: 0.4,

         init: function (options) {
             options = options || {};

             this.timing = options.timing || this.timing;
             this.duration = options.duration !== undefined ? options.duration : this.duration;
         },

         /**
          * @param {Object} enterPage
          * @param {Object} leavePage
          * @param {Function} callback
          */
         push: function (enterPage, leavePage, done) {
             var mask = this.backgroundMask.remove();
             enterPage.element[0].parentNode.insertBefore(mask[0], enterPage.element[0].nextSibling);

             animit.runAll(

                 animit(mask[0])
                 .queue({
                     opacity: this.blackMaskOpacity,
                     transform: 'translate3d(0, 0, 0)'
                 })
                 .queue({
                     opacity: 0
                 }, {
                     duration: this.duration,
                     timing: this.timing
                 })
                 .resetStyle()
                 .queue(function (done) {
                     mask.remove();
                     done();
                 }),

                 animit(enterPage.element[0])
                 .queue({
                     css: {
                         transform: 'translate3D(-45%, 0px, 0px)',
                         opacity: 0.9
                     },
                     duration: 0
                 })
                 .queue({
                     css: {
                         transform: 'translate3D(0px, 0px, 0px)',
                         opacity: 1.0
                     },
                     duration: this.duration,
                     timing: this.timing
                 })
                 .resetStyle(),

                 animit(leavePage.element[0])
                 .queue({
                     css: {
                         transform: 'translate3D(0px, 0px, 0px)'
                     },
                     duration: 0
                 })
                 .queue({
                     css: {
                         transform: 'translate3D(100%, 0px, 0px)'
                     },
                     duration: this.duration,
                     timing: this.timing
                 })
                 .wait(0.2)
                 .queue(function (finish) {
                     done();
                     finish();
                 })
             );
         }
     });

     return reversedSlide;
 });


 angular.module('onsen').run(function (NavigatorView, reversedSlide) {
     NavigatorView.registerTransitionAnimator('foo', new reversedSlide());
 });