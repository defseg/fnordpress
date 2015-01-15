WordpressClone.Views.PostStatusDropdown = Backbone.View.extend({

  template: JST['posts/statusDropdown'],

  events: {
    'change select': 'handleSelect'
  },

  initialize: function () {
    // TODO make this use the status of the post
    this._selected = false;
  },

  render: function () {
    // TODO make this use the status of the post
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  handleSelect: function (event) {
    // var select = $(event.currentTarget);
    // if (select.val() == "Scheduled") {
    //   if (!this._selected) {
    //
    //   }
    // } else {
    //   this._selected = false;
    // }
    console.log($('select option:selected').text());
  }

});
