WordpressClone.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main');
    this.$headerEl = $('header#page-header');
    // blogView triggers go in the views so they trigger on sync render
    WordpressClone.headerView = new WordpressClone.Views.Header({el: '#page-header'});
  },

  // TODO: make these URLs look more Wordpress-like
  // TODO: the root route shouldn't be blogsIndex, but instead your following feed
  routes: {
    '': 'feed',
    'recs': 'recommendations',
    'me': 'blogsIndex',
    'blogs/new': 'blogNew',
    'users/:id': 'userShow',
    'blogs/:id': 'blogShow',
    'blogs/:id/edit': 'blogEdit',
    'blogs/:blogId/posts/new': 'postNew',
    'blogs/:blogId/posts/:postId': 'postShow',
    'blogs/:blogId/posts/:id/edit': 'postEdit'
  },

  // ====== MAIN  ======

  recommendations: function () {
    var collection = new WordpressClone.Collections.Posts();
    collection.url = '/api/recommendations';
    var that = this;
    collection.fetch({
      data: {page: 1},
      success: function () {
        var view = new WordpressClone.Views.Recommendations({collection: collection});
        that._swapView(view);
        WordpressClone.headerView.trigger("blogUnview");
      }
    });
  },

  feed: function () {
    var collection = new WordpressClone.Collections.Posts();
    collection.url = "/api/follows";
    var that = this;
    collection.fetch({
      data: {page: 1},
      success: function () {
        if (collection.length === 0) {
          Backbone.history.navigate('recs', {trigger: true});
        } else {
          var view = new WordpressClone.Views.PostFeed({collection: collection});
          that._swapView(view);
          WordpressClone.headerView.trigger("blogUnview");
        }
      }
    });
    // You can't edit your own posts from here. This is intentional.
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
  // helper vars: this._swapBlog() and this._currentBlog

  blogNew: function () {
    var view = new WordpressClone.Views.BlogNew();
    this._swapView(view);
    WordpressClone.headerView.trigger("blogUnview");
  },

  blogShow: function (id) {
    this._swapBlog(id);
    var collection = new WordpressClone.Collections.Posts();
    collection.url = "/api/blogs/" + this._currentBlog.get('id') + "/posts";
    var view = new WordpressClone.Views.BlogShow({model: this._currentBlog, collection: collection});
    var that = this;
    collection.fetch({data: {page: 1}, success: function () {
      that._swapView(view)
    }});
  },

  blogEdit: function (id) {
    // _swapBlog won't work here; we're going to have to fetch the data anyway
    // the edit jbuilder is designed to be compatible with everything else
    // that is, we should be able to stick things in _currentBlog here
    // and go on to use _currentBlog elsewhere when we click something else
    // TODO: added .includes(id) to posts collection, so use that here
    this._currentBlog = new WordpressClone.Models.Blog();
    this._currentBlog.url = "api/blogs/" + id + "/edit";
    this._currentBlog.fetch();
    var view = new WordpressClone.Views.BlogEdit({model: this._currentBlog});
    this._swapView(view);

  },

  blogsIndex: function (id) {
    var collection = new WordpressClone.Collections.Blogs();
    collection.fetch();
    var view = new WordpressClone.Views.BlogsIndex({collection: collection});
    this._swapView(view);
    WordpressClone.headerView.trigger("blogUnview");
  },

  // ====== POSTS ======

  postNew: function (id) {
    this._swapBlog(id);
    var view = new WordpressClone.Views.PostNew({model: this._currentBlog, blogId: id});
    this._swapView(view);
  },

  postShow: function (blogId, postId) {
    var model = new WordpressClone.Models.Post({id: postId});
    model.fetch();
    var view = new WordpressClone.Views.PostShow({model: model});
    this._swapView(view);
  },

  postEdit: function (blogId, postId) {
    // fetching the model anew because some data isn't sent up (status, etc.)
    this._swapBlog(blogId);
    var model = new WordpressClone.Models.Post({id: postId});
    var that = this;
    model.fetch({
      success: function () {
        var view = new WordpressClone.Views.PostEdit({model: model, blogId: blogId});
        that._swapView(view);
      }
    })
  },

  // ====== PRIVATE ======

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  _swapBlog: function (id) {
    if (!this._currentBlog || (this._currentBlog && this._currentBlog.get('id') != id)) {
      this._currentBlog = new WordpressClone.Models.Blog({id: id});
      this._currentBlog.fetch();
    }
  }
});
