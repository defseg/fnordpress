WordpressClone.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main');
    this.$headerEl = $('header#page-header');
    WordpressClone.headerView = new WordpressClone.Views.Header({el: '#page-header'});
  },

  // TODO: make these URLs look more Wordpress-like
  // TODO: the root route shouldn't be blogsIndex, but instead your following feed
  routes: {
    '': 'mainPage',
    'me': 'blogsIndex',
    'blogs/new': 'blogNew',
    'users/:id': 'userShow',
    'blogs/:id': 'blogShow',
    'blogs/:blogId/posts/new': 'postNew',
    'blogs/:blogId/posts/:postId': 'postShow',
    'blogs/:blogId/posts/:id/edit': 'postEdit'
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
    WordpressClone.headerView.trigger("blogUnview");
  },

  // ====== USERS ======

  userShow: function (id) {
    var model = new WordpressClone.Models.User({id: id});
    model.fetch();
    var view = new WordpressClone.Views.UserShow({model: model});
    this._swapView(view);
    WordpressClone.headerView.trigger("blogUnview");
  },

  // ====== BLOGS ======

  blogNew: function () {
    var view = new WordpressClone.Views.BlogNew();
    this._swapView(view);
    WordpressClone.headerView.trigger("blogUnview");
  },

  blogShow: function (id) {
    // TODO remove WordpressClone.Collections.blogs
    var model = WordpressClone.Collections.blogs.getOrFetch(id);
    var collection = new WordpressClone.Collections.Posts();
    collection.url = "/api/blogs/" + model.get('id') + "/posts";
    var view = new WordpressClone.Views.BlogShow({model: model, collection: collection});
    var that = this;
    collection.fetch({data: {page: 1}, success: function () {
      that._swapView(view)
    }});
  },

  blogsIndex: function (id) {
    // TODO remove WordpressClone.Collections.blogs
    var view = new WordpressClone.Views.BlogsIndex({collection: WordpressClone.Collections.blogs});
    this._swapView(view);
    WordpressClone.headerView.trigger("blogUnview");
  },

  // ====== POSTS ======

  postNew: function (blogId) {
    var model = WordpressClone.Collections.blogs.getOrFetch(blogId);
    var view = new WordpressClone.Views.PostNew({model: model, blogId: blogId});
    this._swapView(view);
  },

  postShow: function (blogId, postId) {
    var model = new WordpressClone.Models.Post({id: postId});
    model.fetch();
    var view = new WordpressClone.Views.PostShow({model: model});
    this._swapView(view);
  },

  postEdit: function (blogId, postId) {
    // render in the success callback to make sure the post content is there
    var model = new WordpressClone.Models.Post({id: postId});
    var that = this;
    WordpressClone.Collections.blogs.fetch(blogId, {
      success: function () {
        var view = new WordpressClone.Views.PostEdit({model: model});
        that._swapView(view);
        that.headerView.trigger("blogView", model);
      }
    });
    WordpressClone.headerView.trigger("blogView", model);
  },

  // ====== PRIVATE ======

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
