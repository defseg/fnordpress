WordpressClone.Views.BlogsIndex = Backbone.View.extend({

  template: JST['blogs/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({blogs: this.collection});
    this.$el.html(content);
    return this;
  }

});
