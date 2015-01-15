WordpressClone.Views.PostFeed = Backbone.CompositeView.extend({
  template: JST['interface/feed'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.renderPosts);
  },

  events: {
    'windowScroll #scrollListener': 'scroll'
  },

  render: function () {
    var content = this.template({feed: this.collection});
    this.$el.html(content);
    this.renderPosts();
    return this;
  },

  renderPosts: function () {
    var that = this;
    this.collection.each ( function (post) {
      var postView = new WordpressClone.Views.PostFeedShow({model: post});
      that.addSubview('#feed', postView);
    });
  },

  nextPage: function (event) {
    if (event) event.preventDefault();
    console.log(this.collection._page);
    this.collection.fetch({
      data: {
        page: (this.collection._page || 1) + 1
      }, success: function () {
        this.collection._page++;
        this.$el.append('<div id="scrollListener"></div>');
      }.bind(this)
    });
  }

});
