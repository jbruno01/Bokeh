# Phase 2: Backbone integration and Photo Upload

## Rails
### Models

### Controllers
Api::AlbumsController (create, destroy, index, show, update)
Api::PhotosController (create, destroy, show, update)
Api::TagsController (create)

### Views
* albums/show.json.jbuilder
* photos/show.json.jbuilder
* photos/index.json.jbuilder

## Backbone
### Models
* Album
* Photo
* Tag

### Collections
* Albums
* Photos
* Tags

### Views
* AlbumForm
* AlbumIndex
* AlbumShow (composite view, contains PhotoIndex subview)
* PhotoIndex (composite view, contains PhotoIndexItem subviews)
* PhotoIndexItem
* PhotoShow

## Gems/Libraries
