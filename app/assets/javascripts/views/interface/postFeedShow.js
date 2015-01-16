WordpressClone.Views.PostFeedShow = Backbone.View.extend({

  template: JST['interface/postFeedShow'],

  initialize: function (params) {
    this.listenTo(this.model, 'sync', this.render);
    console.log(params)
    this.blog = params.blog;
  },

  render: function () {
    var content = this.template({post: this.model, blog: this.blog});
    this.$el.html(content);
    return this;
  },

});
