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
        id: 'appInstagram',
        baseColor: 'white',
        splash: {
            styles: {
                'background-color': 'white'
            },
            time: 500,
            // image: 'http://blog.hanmajid.com/images/me-3.jpg'
            icon: {
                class: 'fas fa-camera-retro',
                styles: {
                    'color': 'black',
                    'font-size': '30px',
                }
            }
        },
        fragments: {
            home: {
                type: 'list',
                data: phone.instagram.home,
                fill: function(selector, id, post) {
                    $(selector).append('<div class="insta-post-item app-list-body-item" data-id="'+id+'"></div>');
                    $(selector+' .insta-post-item[data-id="'+id+'"]').append('<div class="insta-post-item-header"></div>');
                    $(selector+' .insta-post-item[data-id="'+id+'"]').append('<div class="insta-post-item-body"></div>');
                    $(selector+' .insta-post-item[data-id="'+id+'"]').append('<div class="insta-post-item-footer"></div>');
                    $(selector+' .insta-post-item[data-id="'+id+'"] .insta-post-item-header').append('<img src="'+post.avatar+'" />');
                    $(selector+' .insta-post-item[data-id="'+id+'"] .insta-post-item-header').append('<div class="insta-post-item-header-text"></div>');
                    $(selector+' .insta-post-item[data-id="'+id+'"] .insta-post-item-header-text').append('<span class="title">'+post.name+'</span>');
                    $(selector+' .insta-post-item[data-id="'+id+'"] .insta-post-item-body').append('<img src="'+post.image+'" />');
                    // $(selector+' .insta-post-item[data-id="'+id+'"]').append('<div><p class="title">'+chat.name+'</p><p class="subtitle">'+chat.messages[0].text+'</p></div>');
                    // $(selector+' .insta-post-item[data-id="'+id+'"]').append('<span class="chat-date">'+chat.messages[0].timestamp+'</span>');
                }
            },
            profile: {
                data: phone.instagram.profile,
                fill: function(selector, data) {
                    $(selector).append('<div class="insta-post-item app-list-body-item">'+data.name+'</div>');
                }
            },
        },
        header: {
            icon: 'fas fa-camera-retro',
            text: 'Pictogram',
            size: 'small',
            styles: {
                'background-color': 'white',
                'color': 'black',
                'border-bottom': '1px solid lightGray',
            }
        },
        footer: {
            styles: {
                'background-color': 'white',
                'border-top': '1px solid lightGray',
            },
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
                    phone.openFragment('home');
                }
            },
            {
                icon: 'fas fa-plus',
                openDetail: true,
                click: function() {
                    phone.openDetail('instaCreate', {
                        header: 'Gallery',
                    });
                }
            },
            {
                icon: 'fas fa-user',
                click: function() {
                    phone.openFragment('profile');
                }
            }
        ],
        details: {
            instaCreate: {
                transition: 'slide-bottom',
                header: {
                    styles: {
                        'background-color': 'white',
                        'color': 'black',
                    },
                    back: {
                        icon: 'fas fa-times',
                        styles: {
                            'color': 'black',
                        }
                    }
                },
                body: {
                    color: 'white',
                    scroll: true,
                },
                click: function(element, opt) {
                    console.log(opt);
                }
            },
        }
    };
    openApp(phone, o);
}