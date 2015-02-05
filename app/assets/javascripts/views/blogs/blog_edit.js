WordpressClone.Views.BlogEdit = Backbone.View.extend({

  template: JST['blogs/edit'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit form': 'submit'
  },

  render: function () {
    var content = this.template({blog: this.model, posts: this.model.posts()});
    this.$el.html(content);
    WordpressClone.headerView.trigger("blogView", this.model);
    return this;
  },

  // TODO post pagination

  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();

    var that = this;
    this.model.save(formData, {
      success: function () {
        Backbone.history.navigate('#/blogs/' + that.model.escape('id'));
      }
    });
  }

});
