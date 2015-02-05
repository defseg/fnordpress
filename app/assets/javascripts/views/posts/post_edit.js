WordpressClone.Views.PostEdit = Backbone.CompositeView.extend({

  template: JST['posts/form'],

  initialize: function (params) {
    this.blogId = params.blogId;
  },

  events: {
    'submit .post-form': 'submit'
  },

  render: function () {
    var that = this;
    var content = this.template({post: this.model, blogId: this.blogId});
    this.$el.html(content);
    var dropdown = new WordpressClone.Views.PostStatusDropdown();
    this.addSubview('.status-dropdown', dropdown);
    return this;
    },

  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();

    var that = this;
    this.model.save(formData, {
      success: function () {
        Backbone.history.navigate('#/blogs/' + that.model.escape('blog_id') + '/posts/' + that.model.escape('id'));
      }
    });
  }

});
