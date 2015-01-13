WordpressClone.Views.PostFeed = Backbone.CompositeView.extend({
  template: JST['interface/feed'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({feed: this.collection});
    this.$el.html(content);

    var feedDiv = this.$('#feed');
    var that = this;

    this.collection.each ( function (post) {
      var postView = new WordpressClone.Views.PostFeedShow({model: post});
      that.addSubview('#feed', postView);
    });

    return this;
  }
});
