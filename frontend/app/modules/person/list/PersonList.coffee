@App.module "PersonApp.List", (List, App, Backbone, Marionette, $, _) ->

  Controller =
    list: (region) ->
      console.log("person:list called")
      personCollection = App.request("person:entities:list")
      personCollectionView = new PersonCollection(
        collection: personCollection
      )
      region.show personCollectionView

  class Person extends Marionette.ItemView
    template: require './templates/person'
    modelEvents:
      "sync" : "render"

  class PersonCollection extends Marionette.CollectionView
    childView: Person
    collectionEvents:
      'sync' : 'render'

  App.reqres.setHandler "person:list", (region) -> Controller.list(region)
