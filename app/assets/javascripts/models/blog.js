WordpressClone.Models.Blog = Backbone.Model.extend({
  urlRoot: 'api/blogs',

  // TODO: there will be a gem to pull n posts and save where you are
  parse: function (response) {
    if (response.posts) {
      this.posts().set(response.posts, {parse: true});
      delete response.posts;
    }

    if (response._page) {
      this._page = +response._page;
      console.log(this._page);
      delete response._page;
    } else {
      this._page = 1;
    }

    return response;
  },

  posts: function () {
    if (!this._posts) {
      this._posts = new WordpressClone.Collections.Posts([], {blog: this});
    }

    return this._posts;
  }
});
