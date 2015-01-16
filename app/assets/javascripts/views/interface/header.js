WordpressClone.Views.Header = Backbone.View.extend({

  initialize: function () {
    this.on("blogView", this.blogView);
    this.on("blogUnview", this.blogUnview);
  },

  blogView: function (model) {
    console.log('blog view')
    console.log(this.$('.blog-header'))
    $('.blog-header').removeClass('invis');
    $('.blog-header-li').html('<a>' + model.escape('title') + '</a>')
  },

  blogUnview: function () {
    console.log('blog unview')
    $('.blog-header').addClass('invis');
  }
});
