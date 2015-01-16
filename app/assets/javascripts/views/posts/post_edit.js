WordpressClone.Views.PostEdit = Backbone.CompositeView.extend({

  template: JST['posts/form'],

  events: {
    'submit .post-form': 'submit'
  },

  render: function () {
    var content = this.template({post: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();

    var that = this;
    this.model.save(formData, {
      success: function () {
        Backbone.history.navigate('#/posts/' + that.model.escape('id'))
      }
    });
  }

});
