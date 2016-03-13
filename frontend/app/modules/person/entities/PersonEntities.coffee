@App.module "People.Entities", (Entities, App, Backbone, Marionette, $, _) ->

  class Person extends Backbone.Model

  class PersonCollection extends Backbone.Collection
    url: "/api/v1/person"
    model: Person

  API =
    list: () ->
      console.log("person:entities:list called")
      personCollection = new PersonCollection()
      personCollection.fetch()
      personCollection.add(new Person())
      personCollection.add(new Person())
      personCollection.add(new Person())
      personCollection

  App.reqres.setHandler 'person:entities:list', () -> API.list()

