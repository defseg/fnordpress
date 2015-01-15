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
    var followButton = new WordpressClone.Views.FollowButton({model: this.model});
    this.addSubview('.followButton', followButton);
    // TODO: don't want to spend time on this now but might be faster to cache height
    // if this goes back in, will need a resize listener to force recalculation
    // this._height = $(document).height() - $(window).height();
    return this;
  },

  renderPosts: function () {
    console.log('rendering posts');
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
    this.collection.fetch({
      data: {
        page: (this.model._page || 1) + 1
      }, success: function () {
        this.model._page++;
        this.$el.append('<div id="scrollListener"></div>');
      }.bind(this)
    });
  },

});
