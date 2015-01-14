WordpressClone.Views.BlogShow = Backbone.CompositeView.extend({

  template: JST['blogs/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.renderPosts);
  },

  // <% blog.posts().each (function (post) { %>
  //   <h2 class="blog-post-title"><a href="<%= '#/posts/' + post.escape('id') %>"><%= post.escape('title') %></a></h2> (<%= post.escape('commentCount') %> comments)
  //   <%= post.get('content') %>
  //   <% }) %>
  //

  events: {
    'submit #new-post': 'submit',
    'click .prev-page': 'prevPage',
    'click .next-page': 'nextPage',
    'windowScroll #scrollListener': 'scroll'
  },

  render: function () {
    var content = this.template({blog: this.model});
    this.$el.html(content);
    // TODO: don't want to spend time on this now but might be faster to cache height
    // if this goes back in, will need a resize listener to force recalculation
    // this._height = $(document).height() - $(window).height();
    return this;
  },

  renderPosts: function () {
    console.log('sfgdfsggdfsgdfsgdfs')
    var that = this;
    this.collection.each(function (post) {
      var postView = new WordpressClone.Views.PostFeedShow({model: post});
      that.addSubview('#posts', postView);
    });
  },

  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var newPost = new WordpressClone.Models.Post();

    var that = this;
    newPost.save(formData, {
      success: function () {
        that.model.posts().add(newPost);
        newPost.set("commentCount", 0);
        that.render();
      }
    });
  },

  nextPage: function (event) {
    if (event) event.preventDefault();
    console.log(this.model._page);
    this.collection.fetch({
      // TODO reappend scrollListener
      data: {
        page: (this.model._page || 1) + 1
      }, success: function () {
        this.model._page++;
      }.bind(this)
    });
  },

  scroll: function (event) {
    // this will get complicated if there's ever a footer
    // may want to cache it later
    var distanceFromBottom = $(document).height() - $(window).height() - $(document).scrollTop();

    if (distanceFromBottom < 100) {
      // $('#scrollListener').detach();
      this.nextPage();
    }
  }
});
