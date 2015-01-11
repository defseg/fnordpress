WordpressClone.Views.BlogShow = Backbone.View.extend({

  template: JST['blogs/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit #new-post': 'submit'
  },

  render: function () {
    var content = this.template({blog: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    // TODO: is there a better way to do this?
    formData["post"]["blog_id"] = +(formData["post"]["blog_id"])
    console.log(formData);
    var newPost = new WordpressClone.Models.Post;

    var that = this;
    newPost.save(formData, {
      success: function () {
        that.model.posts().add(newPost);
        that.render();
      }
    })
  }
});
