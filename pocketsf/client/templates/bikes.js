Template.bikes.events({
  "click .bike-destination": function (e) {
    Session.set("destinationRender", true)
  },
  "click .bike-nearby": function (e) {
    Session.set("destinationRender", false)
  }
})
