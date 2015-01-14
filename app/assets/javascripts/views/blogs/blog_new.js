WordpressClone.Views.BlogNew = Backbone.View.extend({

  template: JST['blogs/new'],

  events: {
    'submit #new-blog': 'submit'
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var newBlog = new WordpressClone.Models.Blog();

    var that = this;
    newBlog.save(formData, {
      success: function () {
        // TODO: going to remove this collection later...?
        // may want to pass a collection to this template
        WordpressClone.Collections.blogs.add(newBlog);
        Backbone.history.navigate("#/blogs/" + newBlog.escape('id'));
      }
    });
  }
});
