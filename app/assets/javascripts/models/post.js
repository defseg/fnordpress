WordpressClone.Models.Post = Backbone.Model.extend({
  urlRoot: 'api/posts',

  parse: function (response) {
    if (response.comments) {
      this.comments().set(response.comments, {parse: true});
      delete response.comments;
    }

    return response;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new WordpressClone.Collections.Comments([], {user: this});
    }

    return this._comments;
  }
})
