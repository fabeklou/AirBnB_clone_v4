$(document).ready(function () {
  const $amenitiesID = [];
  const $amenitiesNAME = [];

  $('.amenities li input').change(function (event) {
    if (this.checked) {
      $amenitiesID.push(event.target.dataset.id);
      $amenitiesNAME.push(event.target.dataset.name);
    } else {
      $amenitiesID.splice($.inArray(event.target.dataset.id, $amenitiesID), 1);
      $amenitiesNAME.splice($.inArray(event.target.dataset.name, $amenitiesNAME), 1);
    }

    let amenitiesStr = $amenitiesNAME.join(', ');
    const maxLen = 24;
    if (amenitiesStr.length > maxLen) {
      amenitiesStr = amenitiesStr.slice(0, maxLen - 2) + '...';
    }
    $('.amenities h4').text(amenitiesStr);
  });

  /**
   * GET HBNB Api status before any request
   * -- change address to localhost if <net::ERR_ADDRESS_INVALID> is raised
   */
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (res) {
      if (res.status === 'OK') $('div#api_status').addClass('available');
      else $('div#api_status').removeClass('available');
    }
  });

  /**
   * POST request "http://0.0.0.0:5001/api/v1/places_search"
   * to get the list of places available
   * -- change address to localhost if <net::ERR_ADDRESS_INVALID> is raised
   */
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({}),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (places) {
      for (const place of places) {
        $('section.places').append(`
        <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>

            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>

            <div class="user">
            </div>
            <div class="description">
              ${place.description}
            </div>
        </article>
        `);
      }
    }
  });
});
