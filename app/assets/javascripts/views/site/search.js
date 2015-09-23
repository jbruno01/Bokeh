Bokeh.Views.Search = Backbone.CompositeView.extend({

	initialize: function () {
		// this.bindScroll(); // for infinite scroll
		this.searchResults = new Bokeh.Collections.SearchResults();
		this.searchResults.pageNum = 1;
		this.listenTo(this.searchResults, "sync", this.render);
	},

	events: {
		"change .search-input": "search",
		"click .next-page": "nextPage",
		"click .prev-page": "prevPage"
	},

	template: JST["site/search"],

	render: function () {
		var content = this.template({
			results: this.searchResults
		});
		// console.log(this.searchResults);
		this.$el.html(content);
		if(Bokeh.query){
			this.$(".search-input").val(Bokeh.query);
			Bokeh.query = null
			this.search(event)
		}

		return this;
	},

	search: function (event) {
		debugger
		event.preventDefault();
		this.searchResults.pageNum = 1;
		this.searchResults.query = this.$(".search-input").val();

		this.searchResults.fetch({
			data: {
				query: this.searchResults.query,
				page: 1
			}
		});
	},

	bindScroll: function () {
		$(window).on("scroll", this.handleScroll.bind(this));
	},

	handleScroll: function (event) {
		var $doc = $(document);
		var scrolledDist = $doc.height() - window.innerHeight - $doc.scrollTop();

		if (scrolledDist < 300) {
			this.nextPageInfiniteScroll();
		}
	},

	nextPage: function (event) {
		this.searchResults.fetch({
			data: {
				query: this.searchResults.query,
				page: this.searchResults.pageNum + 1
			},
			success: function () {
				this.searchResults.pageNum = this.searchResults.pageNum + 1;
			}.bind(this)
		});
	},

	prevPage: function (event) {
		this.searchResults.fetch({
			data: {
				query: this.searchResults.query,
				page: this.searchResults.pageNum - 1
			},
			success: function () {
				this.searchResults.pageNum = this.searchResults.pageNum - 1;
			}.bind(this)
		});
	},

	// Infinite scroll can be improved even more by using subviews.
	// Right now, we're rerendering the whole view when we add the
	// 25 results of the next page. Instead, a better approach would be
	// to `append` the html for each new result. This is way easy if we
	// have a subview for each result. We would also `listenTo` collection
	// `add` instead of `sync`. The callback to the `add` gets passed the
	// model that was just added, so at that point you can instantiate a
	// subview and append it to the list.
	// nextPageInfiniteScroll: function () {
	// 	if (this.requestingNextPage) return;
	//
	// 	this.requestingNextPage = true;
	// 	this.searchResults.fetch({
	// 		remove: false,
	// 		data: {
	// 			query: this.searchResults.query,
	// 			page: this.searchResults.pageNum + 1
	// 		},
	// 		success: function () {
	// 			this.requestingNextPage = false;
	// 			this.searchResults.pageNum++;
	// 		}.bind(this)
	// 	});
	// }

});
