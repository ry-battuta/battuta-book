@App.module "AboutApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  Controller =
    show: (region) ->
      aboutView = new About()
      region.show aboutView

  class About extends Marionette.ItemView
    template: require "./templates/about"

  App.reqres.setHandler 'about:show', (region) -> Controller.show(region)