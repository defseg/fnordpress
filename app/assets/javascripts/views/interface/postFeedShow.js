WordpressClone.Views.PostFeedShow = Backbone.View.extend({

  template: JST['interface/postFeedShow'],

  initialize: function (params) {
    this.listenTo(this.model, 'sync', this.render);
    if (params.blog) {
      this.blog = params.blog;
    } else {
      this.blog = new WordpressClone.Models.Blog({id: this.model.get('blog_id')});
    }
  },

  render: function () {
    var content = this.template({post: this.model, blog: this.blog});
    this.$el.html(content);
    return this;
  },

});
