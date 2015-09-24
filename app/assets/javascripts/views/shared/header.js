Bokeh.Views.Header = Backbone.CompositeView.extend({
  template: JST["shared/header"],

  initialize: function(options){
    this.listenTo(this.model, "sync signIn signOut", this.render);
    this.render();
  },

  events: {
    "click #sign-out-link" : "signOut",
    "submit .search-form" : "search"
  },

  search: function (event) {
    event.preventDefault();
    Bokeh.query = $(".search-input").val();
    $(".search-input").val("");
    Backbone.history.navigate("#/search", {trigger: true})
  },

  explore: function(event) {
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true })
  },

  render: function(){
    var renderedContent = this.template({ currentUser: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  signOut: function(event){
    event.preventDefault();
    Bokeh.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }
})
