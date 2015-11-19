window.onload = function () {
  var venueTemplateSource = document.getElementById('venue-template').innerHTML;
  var venueTemplate = Handlebars.compile(venueTemplateSource);

  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var url = 'https://api.foursquare.com/v2/venues/search?ll=' + lat + ',' + lon + '&oauth_token=1RMB3OQH1I0KIDBSK2ALPPVABKYM3UZMSNO1XCQAFYUZKUS3&v=20151119';

    window.fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      for (var venue_i in data.response.venues) {
        var parentNode = document.getElementById('venues');

        var venue = data.response.venues[venue_i];
        var categories = [];

        for (category_i in venue.categories) {
          categories.push(venue.categories[category_i].name);
        }

        var venueHtml = venueTemplate({
          name: venue.name,
          categories: categories.join(','),
          address: venue.location.address
        });

        parentNode.innerHTML += venueHtml;
      }
    });
  });
};
