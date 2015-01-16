WordpressClone.Views.PostFeedShow = Backbone.View.extend({

  template: JST['interface/postFeedShow'],

  initialize: function (params) {
    this.listenTo(this.model, 'sync', this.render);
    this.blog = WordpressClone.Collections.blogs.get(this.model.get('blog_id'));
  },

  render: function () {
    var content = this.template({post: this.model, blog: this.blog});
    this.$el.html(content);
    return this;
  },

});
