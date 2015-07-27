Bokeh.Views.NewUserForm = Backbone.CompositeView.extend({
  template: JST ["shared/sign_up"],

  events: {
    "click .splash-sign-in-up" : "submit",
     "click .close-modal": "closeNewUserForm",
  },

  closeNewUserForm: function(event) {
    event.preventDefault();
    this.remove();
    Backbone.history.navigate("", {trigger: true})
  },

  submit: function(event){
    event.preventDefault();
    var formData = $("#sign_in_up_form").serializeJSON();
    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        Bokeh.currentUser.fetch()
        Backbone.history.navigate("explore", { trigger: true })
      },
      error: function(){
        alert("Error: make these better");
      }
    });
  },

  render: function () {
    var renderedContent = this.template ({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})
