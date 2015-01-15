WordpressClone.Views.PostNew = Backbone.View.extend({

  template: JST['posts/form'],

  events: {
    'submit .post-form': 'submit'
  },

  render: function () {
    var content = this.template({post: new WordpressClone.Models.Post(),
                                 blog: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var newPost = new WordpressClone.Models.Post();

    var that = this;
    newPost.save(formData, {
      success: function () {
        that.model.posts().add(newPost);
        Backbone.history.navigate('#/posts/' + newPost.escape('id'));
      }
    });
  }

});
