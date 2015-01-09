WordpressClone.Views.BlogShow = Backbone.View.extend({

  template: JST['blogs/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({blog: this.model});
    this.$el.html(content);
    return this;
  }

});
