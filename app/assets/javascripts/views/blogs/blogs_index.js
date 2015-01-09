WordpressClone.Views.BlogsIndex = Backbone.View.extend({

  template: JST['blogs/index'],

  render: function () {
    var content = this.template({model: model});
    this.$el.html(content);
    return this;
  }

});
