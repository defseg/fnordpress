WordpressClone.Views.Header = Backbone.CompositeView.extend({

  initialize: function () {
    this.on("blogView", this.blogView);
    this.on("blogUnview", this.blogUnview);
  },

  blogView: function (model) {
    $('.blog-header').removeClass('invis');
    $('.blog-header-li').html('<a href="#/blogs/' + model.escape('id') + '">' + model.escape('title') + '</a>')
    if (this._currentSubview) this.removeSubview('.blog-header', this._currentSubview);
    var followButton = new WordpressClone.Views.FollowButton({model: model});
    this.addSubview('.blog-header', followButton);
    this._currentSubview = followButton;
  },

  blogUnview: function () {
    this.stopListening();
    this.removeSubview('.blog-header', this._currentSubview);
    $('.blog-header').addClass('invis');
  }
});
