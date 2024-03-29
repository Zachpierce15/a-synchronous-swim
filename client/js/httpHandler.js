(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  const commandFetch = () => {
    $.ajax({
      url: serverUrl + '/command',
      type: 'GET',
      success: (data) => {
        // reload the page
        SwimTeam.move(data);
        console.log("Command Fetch Success:" , data)
      },
      error: (error) => {
        console.log(error);
      }
      
    });

  };
  //setInterval(commandFetch,1000);

  const imageFetch = () => {
    $.ajax({
      url: serverUrl + '/image',
      type: 'GET',
      success: (data) => {
        // reload the page
        //$('div .pool').css('background-image', serverUrl + '/image');
        console.log("Command Fetch Success:" , data)
      },
      error: (error) => {
        console.log(error);
      }
      
    });

  };
  imageFetch();

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl+'/background.jpg',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
