WordpressClone.Collections.Posts = Backbone.Collection.extend({
  url: 'api/posts',
  model: WordpressClone.Models.Post,

  parse: function (response) {

    if (response._page) {
      this._page = +response._page;
      delete response._page;
    } else {
      this._page = 1;
    }

    return response;
  },
});
