Bokeh.Views.NewUserForm = Backbone.CompositeView.extend({
  template: JST ["shared/sign_up"],

  events: {
    "click .sign-up" : "submit",
     "click .close_modal": "closeNewUserForm",
  },

  closeNewUserForm: function(event) {
    event.preventDefault();
    this.remove();
    Backbone.history.navigate("", {trigger: true})
  },

  submit: function(event){
    event.preventDefault();
    var formData = $("#signup_form").serializeJSON();
    this.model.set(formData);
    debugger
    this.model.save({}, {
      success: function () {
        Bokeh.currentUser.fetch()
        Backbone.history.navigate("", { trigger: true })
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
