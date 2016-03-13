@App.module "PersonApp.Entities", (Entities, App, Backbone, Marionette, $, _) ->

  class Person extends Backbone.Model
    defaults:
      first_name: "Juan",
      last_name: "Garcia",
      email: 'i@gmail.com',
      password: '****',
      twitter_handle: '@i',
      links: ['www.google.com']
      avatar: 'http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      homebase: 'US',
      profession: 'Software Developer',
      passions: ['Cakes', 'Coffee'],
      skills: ['Software'],
      current_location: 'Buenos Aires',
      blurb: 'Here I am'
    url: "/api/v1/person"

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
    active: () ->
      me = new Person({ id: "me" })
      me.fetch()
      me
    create: () ->
      new Person()

  App.reqres.setHandler 'person:entities:list', () -> API.list()
  App.reqres.setHandler 'person:entities:create', () -> API.create()
  App.reqres.setHandler 'person:entities:active', () -> API.active()
