Bokeh.Views.Header = Backbone.CompositeView.extend({
  template: JST["shared/header"],

  initialize: function(options){
    this.listenTo(Bokeh.currentUser, "signIn signOut", this.render);
    this.render();
  },

  events: {
    "click #sign-out-link": "signOut",
  },

  explore: function(event) {
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true })
  },

  render: function(){
  var renderedContent = this.template({ currentUser: Bokeh.currentUser });
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
