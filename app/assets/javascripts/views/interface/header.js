WordpressClone.Views.Header = Backbone.View.extend({

  initialize: function () {
    this.on("blogView", this.blogView)
    this.on("blogUnview")
  },

  blogView: function (model) {
    console.log(model.get('id'));
    console.log(model.attributes.is_following);
    console.log(model.get('is_staff'));
    console.log(model.get('is_tagline'));
  }
});
