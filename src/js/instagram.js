function openInstagram(phone) {
    var defInstagramOptions = {
        home: [
            {
                avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
                name: 'Abott',
                location: 'Charleston',
                timestamp: '1h',
                text: 'Tis is epic.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Inside_the_Batad_rice_terraces.jpg/220px-Inside_the_Batad_rice_terraces.jpg',
                comments: 3,
                loves: 41
            },
            {
                avatar: 'https://api.adorable.io/avatars/285/nana@adorable.png',
                name: 'Nana',
                location: 'Charleston',
                timestamp: '1h',
                text: 'Tis is epic.',
                image: 'data:image/jpeg;base64,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',
                comments: 3,
                loves: 41
            },
        ],
        profile: {
            name: 'Farhan Majid',
            username: 'hanmajid',
            following: 11,
            followers: 12,
            avatar: 'http://blog.hanmajid.com/images/me-3.jpg',
        }
    };
    phone.instagram = 'instagram' in phone ? phone.instagram : defInstagramOptions;

    var o = {
        baseColor: 'white',
        header: {
            icon: 'fas fa-camera-retro',
            text: 'Pictogram',
            size: 'small',
            color: 'white',
            textColor: 'black',
            border: true,
            borderColor: 'lightGray',
        },
        footer: {
            color: 'white',
            border: true,
            borderColor: 'lightGray',
            iconColor: {
                default: 'gray',
                active: 'black',
            }
        },
        footerMenus: [
            {
                icon: 'fas fa-home',
                active: true,
                click: function() {
                    instaGotoHome(phone);
                }
            },
            {
                icon: 'fas fa-plus',
                openDetail: true,
                click: function() {
                    phone.openDetail('insta-create', {
                        header: 'Gallery',
                    });
                }
            },
            {
                icon: 'fas fa-user',
                click: function() {
                    instaGotoProfile(phone);
                }
            }
        ],
        details: [
            {
                id: 'insta-create',
                slideFrom: 'bottom',
                header: {
                    color: 'white',
                    textColor: 'black',
                    icon: 'fas fa-times',
                },
                body: {
                    color: 'white',
                    scroll: true,
                },
                click: function(element, opt) {
                    console.log(opt);
                }
            },
        ]
    };
    openApp(phone, o);
    instaGotoHome(phone);
}
function instaCleanBody(phone) {
    var selector = phone.selector;
    $(selector+' .insta-body-item').remove();
}
function instaGotoHome(phone) {
    var selector = phone.selector;
    instaCleanBody(phone);
    $(phone.instagram.home).each(function(id, post) {
        $(selector+' .app-screen-body').append('<div class="insta-post-item insta-body-item" data-id="'+id+'"></div>');
        $(selector+' .insta-post-item[data-id="'+id+'"]').append('<div class="insta-post-item-header"></div>');
        $(selector+' .insta-post-item[data-id="'+id+'"]').append('<div class="insta-post-item-body"></div>');
        $(selector+' .insta-post-item[data-id="'+id+'"]').append('<div class="insta-post-item-footer"></div>');
        $(selector+' .insta-post-item[data-id="'+id+'"] .insta-post-item-header').append('<img src="'+post.avatar+'" />');
        $(selector+' .insta-post-item[data-id="'+id+'"] .insta-post-item-header').append('<div class="insta-post-item-header-text"></div>');
        $(selector+' .insta-post-item[data-id="'+id+'"] .insta-post-item-header-text').append('<span class="title">'+post.name+'</span>');
        $(selector+' .insta-post-item[data-id="'+id+'"] .insta-post-item-body').append('<img src="'+post.image+'" />');
        // $(selector+' .insta-post-item[data-id="'+id+'"]').append('<div><p class="title">'+chat.name+'</p><p class="subtitle">'+chat.messages[0].text+'</p></div>');
        // $(selector+' .insta-post-item[data-id="'+id+'"]').append('<span class="chat-date">'+chat.messages[0].timestamp+'</span>');
    });
}
function instaGotoCreate(phone) {
    instaCleanBody(phone);
}
function instaGotoProfile(phone) {
    instaCleanBody(phone);
}