WordpressClone.Collections.Posts = Backbone.Collection.extend({
  url: 'api/posts',
  model: WordpressClone.Models.Post,

  initialize: function () {
    this._page = 1;
  },

  parse: function (response) {

    return response;
  },
});
