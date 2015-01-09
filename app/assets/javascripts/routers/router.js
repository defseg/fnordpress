WordpressClone.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main')
  },

  routes: {
    '': 'userMain',
    'blogs/:id': 'blogShow'
  },

  // TODO: figure out how to call blogs_by_user from here
  userMain: function () {

  },

  blogShow: function (id) {
    var model = WordpressClone.Collections.blogs.getOrFetch(id);
    var view = new WordpressClone.Views.BlogShow({model: model});
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
