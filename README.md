A blogging platform written in Rails and Backbone. Strictly as an academic exercise, of course -- it hasn't been made crawlable yet.

Allows indefinite comment nesting; builds comment structure from Backbone. Gravatar integration for avatars. Authentication with Devise, and Omniauth Facebook integration.

In the future, multiple users will be able to edit blogs, with permissions implemented through enums.

Backbone CompositeView extension allows use of multiple views on one page. This is used to build pages that display multiple posts, as well as the header. (The header is generated in Rails so user data can be sent up easily.)

== MVP features
* User can create account
* User can CRUD blog
* Owner of blog can CRUD posts
* Anyone can comment on a blog post or a comment
* Moderators can moderate comments
* Blogs have posts; posts have categories and tags
* Blog/post discovery page based on tags or comment number

== Other features
* Users can follow blogs
* Permissions
* RSS
* Avatars
* Customizable maximum comment depth
* Analytics
* Unread posts/comments feature (this has been done in JS for Wordpress)
* Filter comments by username (do this in JS so it can be ported for Wordpress)

== End DB schema

=== User
* email
* username
* avatar
* URL?
* timestamps

=== Permissions (user-blog)
* user_id
* blog_id
* role
* is_moderator

=== Follows (user-blog)
* user_id
* blog_id

=== Blog
* path
* title
* tagline
* timestamps

=== Post
* blog_id
* source_id (for reblogs)
* author_id
* title
* content
* status
* timestamps
* published_at

=== Comment
* author_id
* parent_post_id
* parent_comment_id
* content
* timestamps

=== Tag
* name

=== Category
* name
* blog_id

=== PostTagging
* post_id
* tag_id

=== PostCategory
* post_id
* category_id

=== Page
* blog_id
* author_id
* ord
* title
* content
* timestamps

=== Like
* TODO
