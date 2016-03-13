@App.module "PersonApp.New", (New, App, Backbone, Marionette, $, _) ->

  Controller =
    new: (region) ->
      console.log("person:create called")
      person = App.request("person:entities:create")
      personView = new Person(
        model: person
      )
      region.show personView

  class Person extends Marionette.ItemView
    template: require './templates/person'
    events:
      'click #save'      : 'save',
    bindings:
      "#first_name"        : "first_name"
      "#last_name"         : "last_name"
      "#email"             : "email"
      "#password"          : "password"
      "#twitter_handle"    : "twitter_handle"
      "#avatar"            : "avatar"
      "#homebase"          : "homebase"
      "#profession"        : "profession"
      "#passions"          : "passions"
      "#skills"            : "skills"
      "#current_location"  : "current_location"
      "#blurb"             : "blurb"
    save: () =>
      @model.save()
    onRender: () =>
      @stickit()
    onDestroy: () =>
      @unstickit()

  App.reqres.setHandler "person:create", (region) -> Controller.new(region)
