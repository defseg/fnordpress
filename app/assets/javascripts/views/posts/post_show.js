WordpressClone.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit .new-comment': 'submit',
    'click .comment-reply-button': 'toggleReplyForm'
  },

  render: function () {
    var content = this.template({post: this.model});
    var postShow = this;
    this.$el.html(content);

    var commentsByParent = {};

    // grab comment form only once
    var commentForm = $('.new-comment').clone();
    this.model.comments().each (function (comment) {
      if (!commentsByParent.hasOwnProperty(comment.escape('parent_comment_id'))) {
        commentsByParent[comment.escape('parent_comment_id')] = [];
      }
      var commentHTML = $('<ul />').addClass(comment.escape('id')).html(comment.get('content'));

      // build comment box from commentForm
      var thisCommentForm = commentForm;
      thisCommentForm.attr("data-id", comment.escape('id'));
      thisCommentForm.addClass("comment-reply");
      thisCommentForm.addClass("invis");
      commentHTML.append(thisCommentForm.clone());

      // build reply button
      var replyButton = $('<button>Reply</button>').attr("data-id", comment.escape('id'));
      replyButton.addClass('comment-reply-button');
      commentHTML.append(replyButton.clone());

      commentsByParent[comment.escape('parent_comment_id')].push(commentHTML);
    });

    if (commentsByParent[""]) {
      commentsByParent[""].forEach ( function (topLevelComment) {
        postShow.$('section.comments').append(topLevelComment);
      });
      delete commentsByParent[""];
    }

    Object.keys(commentsByParent).forEach(function (commentKey) {
      postShow.$('ul.' + commentKey).append(commentsByParent[commentKey]);
    });

    return this;
  },

  toggleReplyForm: function (event) {
    event.preventDefault();
    var commentID = $(event.currentTarget).data("id");
    $('form[data-id="' + commentID + '"]').toggleClass("invis");
  },

  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var commentID = $(event.currentTarget).data("id");
    if (commentID) formData["comment"]["parent_comment_id"] = commentID;

    // TODO: find a less kludgey way to do this.
    // the problem this is trying to solve is that simple_format wraps
    // comments in <p> tags when it sends them up. so when you post a comment,
    // it shows up as an inline element, but things sent up from the server are
    // block elements.
    // formData["comment"]["content"] = "<p>" + formData["comment"]["content"] + "</p>"

    var newComment = new WordpressClone.Models.Comment();
    var that = this;
    newComment.save(formData, {
      success: function () {
        that.model.comments().add(newComment);
        that.render();
      }
    });
  }
});
