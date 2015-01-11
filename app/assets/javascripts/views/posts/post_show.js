WordpressClone.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({post: this.model});
    var postShow = this;
    this.$el.html(content);

    var commentsByParent = {}
    this.model.comments().each (function (comment) {
      if (!commentsByParent.hasOwnProperty(comment.escape('parent_comment_id'))) {
        commentsByParent[comment.escape('parent_comment_id')] = []
      }
      var commentHTML = $('<ul />').addClass(comment.escape('id')).html(comment.get('content'));
      commentsByParent[comment.escape('parent_comment_id')].push(commentHTML)
    })

    if (commentsByParent[""]) {
      commentsByParent[""].forEach ( function (topLevelComment) {
        postShow.$el.append(topLevelComment);
      })
      delete commentsByParent[""]
    }

    Object.keys(commentsByParent).forEach(function (commentKey) {
      postShow.$('ul.' + commentKey).append(commentsByParent[commentKey])
    });

    return this;
  }
})
