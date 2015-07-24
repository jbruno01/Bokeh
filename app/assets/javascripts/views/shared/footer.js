Bokeh.Views.Footer = Backbone.CompositeView.extend({
  template: JST["shared/footer"],

  render: function(){
  var renderedContent = this.template();
  this.$el.html(renderedContent);

  return this;
  }

})
