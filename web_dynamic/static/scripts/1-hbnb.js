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
});
