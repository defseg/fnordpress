WordpressClone.Views.FollowButton = Backbone.View.extend({

  initialize: function () {
    this.isFollowing = this.model.get("is_following");
    this.followState = this.isFollowing ? "followed" : "unfollowed"
  },

  events: {
    'click': 'handleClick'
  },

  tagName: 'li',

  render: function () {
    var button = $('<button />').addClass('follow-button');

    if (this.followState === "followed") {
      button.prop("disabled", false);
      button.html("Unfollow")
    } else if (this.followState === "unfollowed") {
      button.prop("disabled", false);
      button.html("Follow")
    } else if (this.followState === "following") {
      button.prop("disabled", true);
      button.html("Following...")
    } else if (this.followState === "unfollowing") {
      button.prop("disabled", true);
      button.html("Unfollowing...")
    }

    this.$el.html(button);
    return this;
  },

  handleClick: function (event) {
    event.preventDefault();
    var that = this;

    if (this.followState === "followed") {
      this.followState = "unfollowing";
      this.render();

      $.ajax({
        url: "/api/blogs/" + this.model.get('id') + "/follow",
        dataType: "json",
        method: "DELETE",
        success: function () {
          that.followState = "unfollowed";
          that.render();
        }
      });
    } else if (this.followState === "unfollowed") {
      this.followState = "following";
      this.render();

      $.ajax({
        url: "/api/blogs/" + this.model.get('id') + "/follow",
        dataType: "json",
        method: "POST",
        success: function () {
          that.followState = "followed";
          that.render();
        }
      });
    }
  },

});
