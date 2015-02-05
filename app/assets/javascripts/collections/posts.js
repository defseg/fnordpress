WordpressClone.Collections.Posts = Backbone.Collection.extend({
  url: 'api/posts',
  model: WordpressClone.Models.Post,

  initialize: function () {
    this._page = 1;
  },

  includes: function (id) {
    // alas
    for (var i = 0; i < this.length; i++) {
      if (this.models[i].get('id') === id) return true;
    }
    return false;
  }
});
