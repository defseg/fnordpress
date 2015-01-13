WordpressClone.Views.PostFeed = Backbone.View.extend({
  template: JST['interface/feed'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({feed: this.collection});
    this.$el.html(content);
    return this;
  }
});
