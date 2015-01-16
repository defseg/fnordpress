WordpressClone.Views.Header = Backbone.CompositeView.extend({

  initialize: function () {
    this.on("blogView", this.blogView);
    this.on("blogUnview", this.blogUnview);
  },

  blogView: function (model) {
    $('.blog-header').removeClass('invis');
    $('.blog-header-li').html('<a>' + model.escape('title') + '</a>')
    var followButton = new WordpressClone.Views.FollowButton({model: model});
    this.addSubview('.blog-header', followButton);
    this._currentSubview = followButton;
  },

  blogUnview: function () {
    this.stopListening();
    $('.blog-header').addClass('invis');
    this.removeSubview('.blog-header', this._currentSubview);
  }
});
