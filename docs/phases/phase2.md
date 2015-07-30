# Phase 2: Backbone integration and Photo Upload

## Rails
### Models

### Controllers
Api::PhotosController (create, destroy, show, update)

### Views
* photos/show.json.jbuilder
* photos/index.json.jbuilder

## Backbone
### Models
* Photo

### Collections
* Photos

### Views
* PhotoIndex (composite view, contains PhotoIndexItem subviews)
* PhotoIndexItem
* PhotoShow

## Gems/Libraries
