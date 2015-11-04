Bokeh.Views.PhotoShow = Backbone.CompositeView.extend({
  tagName: "div",
  className: "master-photo-show",
  template: JST["photos/show"],

  initialize: function () {
    this.addComments();
    this.renderDetails();
    this.addTaggings();
    this.listenToOnce(this.model, "sync", this.render);
    this.listenTo(this.model, "change", this.renderDetails);
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.listenTo(this.model.taggings(), "add", this.addTagging);
    this.listenTo(this.model.taggings(), "remove", this.removeTagging)
  },

  events: {
      "click .photo-details" : "editDetails",
      "click .add-tag" : "checkThanAdd",
      "submit .new-tag" : "checkThanAdd"
  },

  loadingGifInit: function () {
    $(".main-photo").toggleClass("hidden");
    $(".main-photo").load(function() {
      $(".loader-gif").hide();
      $(".main-photo").toggleClass("hidden")
    });
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

  addTaggings: function() {
    this.model.taggings().forEach(function (tag){
      this.addTagging(tag);
    }.bind(this))
  },

  addTagging: function (tag){
    var subview = new Bokeh.Views.TagsIndexItem({ model: tag });
    this.addSubview('.tag-index', subview);
  },

  checkThanAdd: function (event) {
    event.preventDefault();
    var name = $(".tag-name").val();
    if(name === ""){
      $(".tag-error").addClass("active");
      $(".tag-error").html("Tag can't be blank")
      return
    } else if (this.model.tagNames().indexOf(name) !== -1) {
      $(".tag-error").addClass("active");
      $(".tag-error").html("No duplicate tags")
      return
    }
    this.createTagging();
  },

  createTagging: function () {
    var content = $(".new-tag").serializeJSON();
    var newTagging = new Bokeh.Models.Tagging();
    content.tagging.photo_id = this.model.id;
    newTagging.set(content)
    var that = this;
    newTagging.save({},{
      success: function (response) {
        that.model.taggings().add(newTagging);
        that.model.tagNames().push(content.tagging.name)
        that.$(".tag-name").val("")
        that.$(".tag-error").removeClass("active")
      }
    });
  },

  removeTagging: function (tagging) {
    this.removeModelSubview(".tag-index", tagging)
    var temp = this.model.tagNames().indexOf(tagging.attributes.tag_name);
    this.model.tagNames().splice(temp,1);
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
    this.attachSubviews();
    this.loadingGifInit();
    return this;
  }
})
