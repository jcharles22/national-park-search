

function displayParks(responseJson) {
    if(responseJson.total==="0"){
        $('#js-error-message').text(`Please try a different state`);
    } else {
    console.log(responseJson);
    $("#js-error-message").empty();
    $('#results-list').empty();
    for(let i = 0; i<responseJson.data.length; i++) {
        $('#results-list').append(`<li><h3>${responseJson.data[i].fullname}</h3>
        <p>${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p></li>`
        )}
    
      $('#results').removeClass('hidden');
    };
};


function formatParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
};

function getParks(state, limit) {
    let mainUrl ="https://developer.nps.gov/api/v1/parks"
    let params = {
        stateCode: state,
        limit,
        start: 0,
        api_key: 'rHLMaEkO50cWL96fygnETb7vWxdxrKBmF6wKhzrC'
    };
    const queryString = formatParams(params);
    let url = mainUrl +"?"+ queryString;

    fetch(url)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayParks(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        let state = $('#js-search-state').val();
        let numOfParks = $('#js-max-results').val();
        getParks(state, numOfParks);
    });
}


$(watchForm);