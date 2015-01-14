WordpressClone.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  parse: function (response) {
    if (response.blogs) {
      this.blogs().set(response.blogs, {parse: true});
      delete response.blogs;
    }

    return response;
  },

  blogs: function () {
    if (!this._blogs) {
      this._blogs = new WordpressClone.Collections.Blogs([], {user: this});
    }

    return this._blogs;
  }
});
