WordpressClone.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main');
  },

  // TODO: make these URLs look more Wordpress-like
  // TODO: the root route shouldn't be blogsIndex, but instead your following feed
  routes: {
    '': 'mainPage',
    'me': 'blogsIndex',
    'blogs/new': 'blogNew',
    'users/:id': 'userShow',
    'blogs/:id': 'blogShow',
    'blogs/:blogId/posts/:postId': 'postNew',
    'posts/:id': 'postShow'
  },

  // ====== MAIN  ======

  mainPage: function () {
    var collection = new WordpressClone.Collections.Posts();
    collection.url = "/api/follows";
    collection.fetch({
      data: {page: 1}
    });
    var view = new WordpressClone.Views.PostFeed({collection: collection});
    this._swapView(view);
  },

  // ====== USERS ======

  userShow: function (id) {
    var model = new WordpressClone.Models.User({id: id});
    model.fetch();
    var view = new WordpressClone.Views.UserShow({model: model});
    this._swapView(view);
  },

  // ====== BLOGS ======

  blogNew: function () {
    var view = new WordpressClone.Views.BlogNew();
    this._swapView(view);
  },

  blogShow: function (id) {
    // TODO remove WordpressClone.Collections.blogs
    var model = WordpressClone.Collections.blogs.getOrFetch(id);
    var collection = new WordpressClone.Collections.Posts();
    collection.url = "/api/blogs/" + model.get('id') + "/posts";
    var view = new WordpressClone.Views.BlogShow({model: model, collection: collection});
    collection.fetch({
      data: {page: 1}
    });
    this._swapView(view);
  },

  blogsIndex: function (id) {
    // TODO remove WordpressClone.Collections.blogs
    var view = new WordpressClone.Views.BlogsIndex({collection: WordpressClone.Collections.blogs});
    this._swapView(view);
  },

  // ====== POSTS ======

  postNew: function (blogId, postId) {
    var model = WordpressClone.Collections.blogs.getOrFetch(blogId);
    var view = new WordpressClone.Views.PostNew({model: model});
    this._swapView(view);
  },

  postShow: function (id) {
    var model = new WordpressClone.Models.Post({id: id});
    model.fetch();
    var view = new WordpressClone.Views.PostShow({model: model});
    this._swapView(view);
  },

  // ====== PRIVATE ======

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
