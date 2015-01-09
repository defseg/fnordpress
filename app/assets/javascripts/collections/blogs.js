WordpressClone.Collections.Blogs = Backbone.Collection.extend({

  model: WordpressClone.Models.Blog,
  url: 'api/blogs',

  // TODO: DRY?
  getOrFetch: function (id) {
    var blog = this.get(blog);
    var blogs = this;
    if (!blog) {
      blog = new WordpressClone.Models.Blog({id: id});
      blog.fetch({
        success: function () {
          blogs.add(blog);
        },
      });
    } else {
      blog.fetch();
    }
    return blog;
  }

});
