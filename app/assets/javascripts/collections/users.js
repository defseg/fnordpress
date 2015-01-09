WordpressClone.Collections.Users = Backbone.Collection.extend({

  model: WordpressClone.Models.User,
  url: 'api/blogs',

  getOrFetch: function (id) {
    var user = this.get(id);
    var users = this;
    if (!user) {
      user = new WordpressClone.Models.User({id: id});
      user.fetch({
        success: function () {
          users.add(user);
        },
      });
    } else {
      user.fetch();
    }
    return user;
  }
});
