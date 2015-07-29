Bokeh.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST["photos/show"],

  initialize: function () {
    this.addComments();
    this.renderDetails();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "change", this.renderDetails)
    // this.listenTo(this.model, "sync", this.addComments);
    this.listenTo(this.model.comments(), "add", this.addComment)
  },

  events: {
      "click .photo-details" : "editDetails"
  },

  renderDetails: function () {
    if(this.model.attributes.title === null){
      this.model.attributes.title = this.model.attributes.image_file_name;
    };
    if(this.editDetailsView){
      this.removeSubview(".photo-info", this.editDetailsView);
      this.editDetailsView = null;
    };
    if(this.detailsView){
      this.removeSubview(".photo-info", this.detailsView);
      this.detailsView = null;
    };

    this.detailsView = new Bokeh.Views.PhotoDetails({ model: this.model })
    this.addSubview(".photo-info", this.detailsView)
  },

  addComment: function (comment) {
    var subview = new Bokeh.Views.CommentIndexItem({ model: comment });
    if(this.newCommentview){
      this.removeSubview(".comment-index", this.newCommentview);
      this.newCommentview = null;
    }
    this.addSubview('.comment-index', subview);
    this.renderNewForm();
  },

  addComments: function() {
    this.model.comments().forEach(function (comment) {
      this.addComment(comment);
    }.bind(this))
    if(this.newCommentview){
      this.removeSubview(".comment-index", this.newCommentview);
      this.newCommentview = null;
    }
    this.renderNewForm();
  },

  renderNewForm: function () {
    this.newCommentview = new Bokeh.Views.CommentForm({
      collection: this.model.comments(),
      model: this.model
    });
    this.addSubview(".comment-index", this.newCommentview)

  },

  editDetails: function(event) {
    event.preventDefault();
    if(this.model.attributes.user_id === Bokeh.currentUser.id){
      if(!this.editDetailsView){
        this.removeSubview(".photo-info", this.detailsView);
        this.detailsView = null;
        this.renderEditDetails()
      }
    };
  },

  renderEditDetails: function() {
    this.editDetailsView = new Bokeh.Views.EditPhotoDetails({ model: this.model })
    this.addSubview(".photo-info", this.editDetailsView)
  },

  render: function () {
    var renderedContent = this.template({ photo: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews()
    return this;
  }
})
