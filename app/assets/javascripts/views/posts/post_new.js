WordpressClone.Views.PostNew = Backbone.CompositeView.extend({

  template: JST['posts/form'],

  initialize: function (params) {
    this._blogId = params.blogId;
  },

  events: {
    'submit .post-form': 'submit'
  },

  render: function () {
    var blogId = (this.model.isNew()) ? this._blogId : this.model.get('id');


    var content = this.template({post: new WordpressClone.Models.Post(),
                                 blog: this.model, blogId: blogId});
    this.$el.html(content);
    var dropdown = new WordpressClone.Views.PostStatusDropdown();
    this.addSubview('.status-dropdown', dropdown);

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
        Backbone.history.navigate('#/blogs/' + that._blogId + '/posts/' + newPost.escape('id'));
      }
    });
  }

});
