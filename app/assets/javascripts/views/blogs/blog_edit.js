WordpressClone.Views.BlogEdit = Backbone.View.extend({

  template: JST['blogs/edit'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'dblclick .editable': 'editField',
    'blur .editing': 'saveField',
    'submit form': 'submit'
  },

  render: function () {
    var content = this.template({blog: this.model, posts: this.model.posts()});
    this.$el.html(content);
    WordpressClone.headerView.trigger("blogView", this.model);
    return this;
  },

  editField: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);
    var field = $currentTarget.data('field');
    var $input = $("<input type='text'>").addClass('editing');
    $input.data('field', field);
    $input.val(this.model.escape(field));
    $currentTarget.removeClass('editable');
    $currentTarget.html($input);
    $input.focus();
  },

  saveField: function (event) {
    event.preventDefault();
    var field = $(event.currentTarget).data('field');
    var newValue = $(event.currentTarget).val();
    var url = '/api/blogs/' + this.model.escape('id');

    this.model.set(field, newValue);
    this.model.save(null, {
      url: url
    });
    this.render();
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
