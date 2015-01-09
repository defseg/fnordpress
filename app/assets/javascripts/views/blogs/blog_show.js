WordpressClone.Views.BlogShow = Backbone.View.extend({

  template: JST['blogs/show'],

  render: function () {
    var content = this.template({blog: this.model});
    this.$el.html(content);
    return this;
  }

});
