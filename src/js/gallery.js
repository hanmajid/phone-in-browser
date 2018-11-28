function openGallery(phone) {
    
    var o = {
        baseColor: 'white',
        header: {
            text: 'All Albums',
            size: 'big',
            color: '#e8e8e8',
            textColor: 'black',
            border: true,
            borderColor: 'lightGray',
        },
        details: [
            {
                id: 'album-detail',
                slideFrom: 'right',
                header: {
                    color: '#e8e8e8',
                    textColor: 'black',
                },
                body: {
                    color: 'white',
                    scroll: true,
                },
                click: function(element, opt) {
                    var images = opt.data;
                    $(images).each(function(id, image) {
                        if(id % 4 === 0) {
                            $(element).find(' .app-detail-body').append('<div class="gallery-image-row-item"></div>');
                        }
                        $(element).find(' .gallery-image-row-item:last').append('<button class="gallery-image-item" data-id="'+id+'"></button>');
                        $(element).find(' .gallery-image-item[data-id="'+id+'"]').append('<img src="'+image.url+'" />');
                        $(element).find(' .gallery-image-item[data-id="'+id+'"]').click(function() {
                            phone.openDetail('image-detail', {
                                header: image.filename,
                                data: {
                                    id: id,
                                    url: image.url,
                                    images: images,
                                }
                            });
                        });
                    });
                    if(images.length % 4 !== 0) {
                        var iter = 4 - (images.length % 4);
                        for(var i=0; i<iter; i++) {
                            $(element).find(' .gallery-image-row-item:last').append('<div class="gallery-image-item-empty"></div>');
                        }
                    }
                }
            },
            {
                id: 'image-detail',
                slideFrom: 'right',
                header: {
                    color: '#e8e8e8',
                    textColor: 'black',
                },
                body: {
                    color: 'white',
                    scroll: false,
                },
                click: function(element, opt) {
                    var image = opt.data.url;
                    var images = opt.data.images;
                    var id = opt.data.id;
                    $(element).find(' .app-detail-body').append('<img class="gallery-image-detail" src="'+image+'" data-id="'+id+'" />');
                    $(element).find(' .app-detail-body').append('<button class="gallery-image-detail-arrow left"><i class="fa fa-arrow-left"></i></button>');
                    $(element).find(' .app-detail-body').append('<button class="gallery-image-detail-arrow right"><i class="fa fa-arrow-right"></i></button>');
                    $(element).find('.gallery-image-detail-arrow').click(function() {
                        var currentId = $(element).find('.gallery-image-detail').data('id');
                        var newId;
                        if($(this).hasClass('left')) {
                            newId = currentId-1;
                        }
                        else {
                            newId = currentId+1;
                        }                        
                        $(element).find('.gallery-image-detail').data('id', newId);
                        $(element).find('.gallery-image-detail').attr('src', images[newId].url);
                        $(element).find('.app-detail-header-title').text(images[newId].filename);
                        $(element).find('.gallery-image-detail-arrow').show();
                        if(newId == 0) {
                            $(element).find('.gallery-image-detail-arrow.left').hide();
                        }
                        if(newId == images.length-1) {
                            $(element).find('.gallery-image-detail-arrow.right').hide();
                        }
                    });                   
                    
                    if(id == 0) {
                        $(element).find('.gallery-image-detail-arrow.left').hide();
                    }
                    if(id == images.length-1) {
                        $(element).find('.gallery-image-detail-arrow.right').hide();
                    }
                }
            }
        ]
    };
    openApp(phone, o);
    galleryGotoHome(phone);
}

function gallerySetImage(element, images, id) {

}

function galleryGotoHome(phone) {
    var selector = phone.selector;
    var gallery = phone.gallery;
    
    $(gallery.albums).each(function(id, album) {
        $(selector+' .app-screen-body').append('<button class="gallery-album-item gallery-body-item" data-id="'+id+'"></button>');
        $(selector+' .gallery-album-item[data-id="'+id+'"]').append('<img src="'+album.images[0].url+'" />');
        $(selector+' .gallery-album-item[data-id="'+id+'"]').append('<div class="gallery-album-item-text"></div>');
        $(selector+' .gallery-album-item[data-id="'+id+'"] .gallery-album-item-text').append('<span class="title">'+album.name+'</span>');
        $(selector+' .gallery-album-item[data-id="'+id+'"] .gallery-album-item-text').append('<span class="subtitle">'+album.images.length+'</span>');
        $(selector+' .gallery-album-item[data-id="'+id+'"]').click(function() {
            phone.openDetail('album-detail', {
                header: album.name,
                data: album.images
            });
        });
    });
}