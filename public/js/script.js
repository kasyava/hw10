
let baseURL;
let msgList;

$(() => {

    baseURL = location.href;
    msgList = $('#msgList');


    const getQuery = (router) =>{
        return $.ajax(
            {
                url: baseURL + router,
                type: 'GET',
                processData: false,
                contentType: false,

                error: function(err) {
                    errorMsg.html(err.responseJSON.error);
                }
            }
        );
    };

    getQuery('artists')
        .then(result => {
            console.log(result);
            printArtist(result);

        });

    const printArtist = (data) =>{
        let container = msgList;
        container.empty();
        $('#wrapper').append(container);
        for(let i = 0; i < data.length; i++) {
            let div = $('<div id="mess" class="col">');

            let name = $(`<p name="name" id="name${i}">`).text("Исполнитель: " + data[i].name);

            let information = $(`<p name="information" id="information${i}">`).text(data[i].information);

            let allAlbums = $(`<a id="allAlbums${data[i]._id}" href="">`).text("Все альбомы");

            if(data[i].image)
            {
                let image = $('<img height="150">');
                image.attr("src", baseURL + "/uploads/" + data[i].image);

                let imgDiv = $('<div id="mess" class="message-image">');
                imgDiv.append(image);
                div.append(imgDiv);
            }
            //form.append(name, '<br>', information,);
            let divName = $('<div class="message-author">').append(name);
            let divText = $('<div class="message-text">').append(information, allAlbums);

            div.append(divName, divText);
            container.append(div);


            $(`#allAlbums${data[i]._id}`).click((e)=>{

                e.preventDefault();

                const formData  = {
                    "id": data[i].id,
                    "name": $(`#name${i}`).val(),
                    "description": $(`#description${i}`).val(),
                    "price": $(`#price${i}`).val()
                };

                $.ajax(
                    {
                        url: baseURL + 'albums?artist=' + data[i]._id,
                        type: 'GET',
                        processData: false,
                        contentType: false,

                        error: function(err) {
                            errorMsg.html(err.responseJSON.error);
                        }
                    }
                ).then((responce) =>{
                    console.log(responce);
                    printAlbums(responce);

                });

            });
        }
    };



    const printAlbums = (data) =>{
        let container = msgList;
        container.empty();
        $('#wrapper').append(container);
        for(let i = 0; i < data.length; i++) {
            let div = $('<div id="mess" class="col">');

            let title = $(`<p name="name" id="name${i}">`).text("Альбом: " + data[i].title);

            let artist = $(`<p  name="artist" id="artist${i}">`).text("Исполнитель: " + data[i].artist.name);
            let year = $(`<p name="year" id="year${i}"></p>`).text("Год выпуска: " + data[i].year);
            let allTracks = $(`<a id="allTracks${data[i]._id}" href="">`).text("Все трэки альбома");

            if(data[i].cover)
            {
                let image = $('<img height="150">');
                image.attr("src", baseURL + "/uploads/" + data[i].cover);

                let imgDiv = $('<div id="mess" class="message-image">');
                imgDiv.append(image);
                div.append(imgDiv);
            }
            //form.append(name, '<br>', information,);
            let divName = $('<div class="message-author">').append(title);
            let divText = $('<div class="message-text">').append(artist, year, allTracks);

            div.append(divName, divText);
            container.append(div);


            $(`#allTracks${data[i]._id}`).click((e)=>{

                e.preventDefault();


                $.ajax(
                    {
                        url: baseURL + 'tracks?album=' + data[i]._id,
                        type: 'GET',
                        processData: false,
                        contentType: false,

                        error: function(err) {
                            errorMsg.html(err.responseJSON.error);
                        }
                    }
                ).then((responce) =>{

                    printTracks(responce);
                });

            });
        }
    };
    const printTracks = (data) =>{

        let container = msgList;
        container.empty();
        $('#wrapper').append(container);
        for(let i = 0; i < data.length; i++) {
            console.log(data[i].album.artist);
            let div = $('<div id="mess" class="col">');

            let title = $(`<p name="name" id="name${i}">`).text("Название: " + data[i].title);

            let album = $(`<p  name="album" id="album${i}">`).text("Название альбома: " + data[i].album.title);
            let year = $(`<p name="year" id="year${i}"></p>`).text("Год выпуска: " + data[i].album.year);
            let artist = $(`<p name="artist" id="artist${i}"></p>`).text("Продолжительность: " + data[i].duration);

            if(data[i].cover)
            {
                let image = $('<img height="150">');
                image.attr("src", baseURL + "/uploads/" + data[i].cover);

                let imgDiv = $('<div id="mess" class="message-image">');
                imgDiv.append(image);
                div.append(imgDiv);
            }
            //form.append(name, '<br>', information,);
            let divName = $('<div class="message-author">').append(title);
            let divText = $('<div class="message-text">').append(album,year,  artist);

            div.append(divName, divText);
            container.append(div);


            // $(`#saveChanges${i}`).click((e)=>{
            //
            //     e.preventDefault();
            //
            //     const formData  = {
            //         "id": data[i].id,
            //         "name": $(`#name${i}`).val(),
            //         "description": $(`#description${i}`).val(),
            //         "price": $(`#price${i}`).val()
            //     };
            //
            //     $.ajax(
            //         {
            //             headers: {
            //                 "Content-Type":"application/json",
            //                 "Accept":"application/json"
            //             },
            //             url: baseURL + 'products/change',
            //             type: 'POST',
            //             data: JSON.stringify(formData),
            //             processData: false,
            //             contentType: false,
            //
            //             error: function(err) {
            //                 errorMsg.html(err.responseJSON.error);
            //             }
            //         }
            //     ).then((responce) =>{
            //         errorMsg.empty();
            //         if(responce.code) errorMsg.html(responce.message);
            //         else errorMsg.html("Данные успешно сохранены")
            //     });
            //
            // });
        }
    };


    $('#idArtists').on('click', (e) => {
        e.preventDefault();
        getQuery('artists').then(result => printArtist(result));
    });

    $('#idAlbums').on('click', (e) => {
        e.preventDefault();
        getQuery('albums').then(result => printAlbums(result));
    });

    $('#idTracks').on('click', (e) => {
        e.preventDefault();
        getQuery('tracks').then(result => printTracks(result));
    });


});