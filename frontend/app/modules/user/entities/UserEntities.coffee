@App.module "UserApp.Entites", (Entites, App, Backbone, Marionette, $, _) ->

  class User extends Backbone.Model
    url: "/api/v1/person/me"

  API =
    active: () =>
      user = new User({
        in: true
      })
      user.fetch()
      user.on("change", () => console.log("User changed"))
      setUser = () =>
        user.set("in", true)
      setTimeout(setUser, 5000)

      user

  App.reqres.setHandler 'user:entities:active', () -> API.active()

