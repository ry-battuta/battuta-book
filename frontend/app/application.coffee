# The application object.
@App = do(Marionette, Backbone) ->
  App = new Marionette.Application

  App.addRegions
    mainRegion:   "#main-region"

  App.on "start", ->
    console.log("starting app")
    App.request "person:list", App.mainRegion

    if Backbone.history
      console.log("enabling history")
      Backbone.history.start()

  App