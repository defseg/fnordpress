WordpressClone.Views.PostStatusDropdown = Backbone.View.extend({

  template: JST['posts/statusDropdown'],

  events: {
    'change select': 'handleSelect'
  },

  initialize: function () {
    // TODO make this use the status of the post
    this._scheduled = false;
  },

  render: function () {
    // TODO make this use the status of the post
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  handleSelect: function (event) {
    if (this.$('select option:selected').text() == "Scheduled") {
      this.$('.datetime').removeClass('invis');
      this.$('.datetime').prop('name', 'post[published_at]');
    } else {
      this.$('.datetime').addClass('invis');
      this.$('.datetime').prop('name', "''");
    }
    console.log($('select option:selected').text());
  }

});
