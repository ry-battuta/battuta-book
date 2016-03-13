@App.module "HeaderApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  Controller =
    show: (region) ->
      headerView = new Header
      region.show headerView

  class Header extends Marionette.ItemView
    template: require "./templates/header"

  App.reqres.setHandler 'header:show', (region) -> Controller.show(region)