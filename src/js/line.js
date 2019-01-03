function openLine(phone) {
    var defLineOptions = {
        profile: {
            avatar: 'http://blog.hanmajid.com/images/me-3.jpg',
            name: 'Farhan Majid',
            status: 'hanmajid.com'
        },
        friends: [
            {
                avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
                name: 'Abott',
                status: '',
                profileCover: 'https://picsum.photos/300/400',
                messages: [
                    {
                        isYou: false,
                        text: 'Hi',
                        timestamp: '14.46'
                    },
                    {
                        isYou: true,
                        text: 'Hello',
                        timestamp: '14.40'
                    },
                ]
            },
            {
                avatar: 'https://api.adorable.io/avatars/285/Nana@adorable.png',
                name: 'Nana',
                status: 'lol',
                profileCover: 'https://picsum.photos/270/360',
            }
        ],
        posts: [
            {
                avatar: 'https://api.adorable.io/avatars/285/Nana@adorable.png',
                name: 'Nana',
                text: 'Happy borthday to me!',
                timestamp: 'Nov 12 18:53',
                likes: 1,
                comments: [],
                shares: 2,
            },
        ]
    };
    phone.line = phone.line ? phone.line : defLineOptions;

    var o = {
        baseColor: 'white',
        header: {
            text: 'Chats',
            size: 'small',
            styles: {
                'background-color': '#54586e',
                'color': 'white',
            }
        },
        navBar: {
            iconColor: {
                default: '#9fa3b5',
                active: 'white',
            }
        },
        fragments: {
            home: {
                type: 'list',
                data: phone.line.friends,
                fill: function(selector, id, friend) {
                    if(friend.messages) {
                        $(selector).append('<button class="line-chat-list-item app-list-body-item" data-id="'+id+'"></button>');
                        $(selector+' .line-chat-list-item[data-id="'+id+'"]').append('<img src="'+friend.avatar+'" />');
                        $(selector+' .line-chat-list-item[data-id="'+id+'"]').append('<div><p class="title">'+friend.name+'</p><p class="subtitle">'+friend.messages[0].text+'</p></div>');
                        $(selector+' .line-chat-list-item[data-id="'+id+'"]').append('<span class="chat-date">'+friend.messages[0].timestamp+'</span>');
                        $(selector+' button.line-chat-list-item[data-id="'+id+'"]').click(function() {
                            phone.openDetail('chatDetail', {
                                header: friend.name,
                                data: friend
                            });
                        });   
                    }
                }
            },
            profile: {
                data: phone.line,
                fill: function(selector, data) {
                    var profile = data.profile;
                    var friends = data.friends;

                    $(selector).append('<div class="line-profile-item app-list-body-item" data-id="-1"></div>');
                    $(selector+' .line-profile-item[data-id="-1"]').append('<img src="'+profile.avatar+'" />');
                    $(selector+' .line-profile-item[data-id="-1"]').append('<div><p class="title">'+profile.name+'</p><p class="subtitle">'+profile.status+'</p></div>');
                    
                    $(selector).append('<button class="line-profile-group app-list-body-item" data-group-id="1"></button>');
                    $(selector+' .line-profile-group').append('<span>Friends '+friends.length+'</span>');
                    $(selector+' .line-profile-group').append('<i class="fa fa-chevron-up"></i>');
                    // append friend list
                    $(friends).each(function(id, friend) {
                        $(selector).append('<button class="line-profile-item app-list-body-item" data-id="'+id+'" data-group-id="1"></button>');
                        $(selector+' .line-profile-item[data-id="'+id+'"]').append('<img src="'+friend.avatar+'" />');
                        var el = '<div><p class="title">'+friend.name+'</p>';
                        if(friend.name)
                            el += '<p class="subtitle">'+friend.status+'</p>';
                        el += '</div>';
                        $(selector+' .line-profile-item[data-id="'+id+'"]').append(el);
                        
                        // post clicked
                        $(selector+' button.line-profile-item[data-id="'+id+'"]').click(function() {
                            phone.openDetail('profileDetail', {
                                header: '',
                                data: friend
                            });
                        });
                    });
                    $(selector+' .line-profile-group').click(function() {
                        var groupId = $(this).attr('data-group-id');
                        var isVisible = $(selector+' .line-profile-item[data-group-id="'+groupId+'"]').is(':visible');
                        if(isVisible) {
                            $(this).find('i').removeClass('fa-chevron-up');
                            $(this).find('i').addClass('fa-chevron-down');
                            $(selector+' .line-profile-item[data-group-id="'+groupId+'"]').hide();
                        }
                        else {
                            $(this).find('i').removeClass('fa-chevron-down');
                            $(this).find('i').addClass('fa-chevron-up');
                            $(selector+' .line-profile-item[data-group-id="'+groupId+'"]').show();
                        }
                    });
                }
            },
            timeline: {
                type: 'list',
                data: phone.line.posts,
                fill: function(selector, id, post) {
                    $(selector).append('<button class="line-post-item app-list-body-item" data-id="'+id+'"></button>');
                    $(selector+' .line-post-item[data-id="'+id+'"]').append('<div class="line-post-item-header"></div>');
                    $(selector+' .line-post-item[data-id="'+id+'"]').append('<div class="line-post-item-body"></div>');
                    $(selector+' .line-post-item[data-id="'+id+'"]').append('<div class="line-post-item-footer"></div>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-header').append('<button></button>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-header button').append('<img src="'+post.avatar+'" />');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-header button').append('<span>'+post.name+'</span>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-body').append('<p>'+post.text+'</p>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer').append('<div class="line-post-item-footer-left"></div>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left').append('<div class="line-post-item-footer-left-row line-row-1"></div>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-1').append('<button><i class="far fa-smile"></i></button>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-1').append('<button><i class="far fa-comment-dots"></i></button>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-1').append('<button><i class="fa fa-share-alt"></i></button>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left').append('<div class="line-post-item-footer-left-row line-row-2"></div>');
                    if(post.comments.length > 0)
                        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-2').append('<button>'+post.comments.length+' comments</button>');
                    if(post.shares > 0)
                        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-2').append('<button>'+post.shares+' shares</button>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left').append('<div class="line-post-item-footer-left-row line-row-3"></div>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-3').append('<span><i class="fa fa-globe-asia"></i> '+post.timestamp+'</span>');
                    $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer').append('<div class="line-post-item-footer-right"></div>');
                    
                    // profile clicked
                    $(selector+' button.line-post-item[data-id="'+id+'"] .line-post-item-header button').click(function() {
                        phone.openDetail('profileDetail', {
                            header: post.name,
                            data: post
                        });
                    });
                    // // post clicked
                    // $(selector+' button.line-post-item[data-id="'+id+'"]').click(function() {
                    //     phone.openDetail('postDetail', {
                    //         header: post.name,
                    //         data: post
                    //     });
                    // });
                }
            }
        },
        navMenus: [
            {
                icon: 'fa-user',
                click: function() {
                    phone.openFragment('profile');
                }
            },
            {
                icon: 'fa-comment-dots',
                active: true,
                click: function() {
                    phone.openFragment('home');
                }
            },
            {
                icon: 'fa-clock',
                click: function() {
                    phone.openFragment('timeline');
                }
            }
        ],
        details: {
            chatDetail: {
                transition: 'slide-right',
                type: 'chat',
                chatOptions: {

                },
                header: {
                    styles: {
                        'background-color': '#54586e',
                        'color': 'white',
                    },
                    back: {
                        styles: {
                            'color': 'white',
                        }
                    },
                    menus: [
                        {
                            icon: 'fas fa-home',
                            styles: {
                                'color': 'white',
                            },
                            click: function(phone, opt) {
                                console.log(opt);
                                // var friend = phone.line.friends[opt.data.friendId];
                                phone.openDetail('profileDetail', {
                                    header: opt.header,
                                    data: opt.data
                                });
                            }
                        },
                        // {
                        //     icon: 'fas fa-phone',
                        //     styles: {
                        //         'color': 'white',
                        //     },
                        //     click: function() {
                        //         console.log('phone');
                        //     }
                        // }
                    ]
                },
                body: {
                    color: 'white',
                },
                click: function(element, opt) {
                    console.log(opt);
                    $(element).find(' .app-detail-body').append('<div class="chat-body"></div>');
                    $(element).find(' .app-detail-body').append('<div class="chat-input-container"></div>');
                    $(element).find(' .app-detail-body .chat-input-container').append('<input type="text" class="chat-input" />');
                    $(element).find(' .app-detail-body .chat-input-container').append('<button class="chat-input-send"><i class="fas fa-play"></i></button>');
                    $(element).find(' .app-detail-body .chat-input-container .chat-input').on('keyup', function (e) {
                        if (e.keyCode == 13) {
                            var text = $(element).find(' .app-detail-body .chat-input-container .chat-input').val();
                            if(text.trim()) {
                                $(element).find(' .app-detail-body .chat-input-container .chat-input').val('');
                                var message = {
                                    isYou: true,
                                    text: text,
                                    timestamp: (new Date()).getHours()+':'+(new Date()).getMinutes(),
                                };
                                var id = opt.data.messages.length;                            
                                // console.log(phone.line.friends);
                                opt.data.messages.unshift(message);
                                $(element).find(' .app-detail-body .chat-body').prepend('<div class="chat-body-item chat-right" data-id="'+id+'"></div>');
                                $(element).find(' .chat-body-item[data-id="'+id+'"]').append('<div class="chat-body-desc"></div>');
                                $(element).find(' .chat-body-item[data-id="'+id+'"] .chat-body-desc').append('<div>'+message.timestamp+'</div>');
                                $(element).find(' .chat-body-item[data-id="'+id+'"]').append('<div class="chat-body-text">'+message.text+'</div>');
                            }
                        }
                    });                    
                    $(element).find(' .app-detail-body .chat-input-container .chat-input-send').click(function() {
                        var text = $(element).find(' .app-detail-body .chat-input-container .chat-input').val();
                        if(text.trim()) {
                            $(element).find(' .app-detail-body .chat-input-container .chat-input').val('');
                            var message = {
                                isYou: true,
                                text: text,
                                timestamp: (new Date()).getHours()+':'+(new Date()).getMinutes(),
                            };
                            var id = opt.data.messages.length;                            
                            // console.log(phone.line.friends);
                            opt.data.messages.unshift(message);
                            $(element).find(' .app-detail-body .chat-body').prepend('<div class="chat-body-item chat-right" data-id="'+id+'"></div>');
                            $(element).find(' .chat-body-item[data-id="'+id+'"]').append('<div class="chat-body-desc"></div>');
                            $(element).find(' .chat-body-item[data-id="'+id+'"] .chat-body-desc').append('<div>'+message.timestamp+'</div>');
                            $(element).find(' .chat-body-item[data-id="'+id+'"]').append('<div class="chat-body-text">'+message.text+'</div>');
                        }
                    });
                    var id = opt.data.messages.length-1;
                    $(opt.data.messages).each(function(i, message) {
                        if(message.isYou) {
                            $(element).find(' .app-detail-body .chat-body').append('<div class="chat-body-item chat-right" data-id="'+id+'"></div>');
                            $(element).find(' .chat-body-item[data-id="'+id+'"]').append('<div class="chat-body-desc"></div>');
                            $(element).find(' .chat-body-item[data-id="'+id+'"] .chat-body-desc').append('<div>'+message.timestamp+'</div>');
                            $(element).find(' .chat-body-item[data-id="'+id+'"]').append('<div class="chat-body-text">'+message.text+'</div>');
                        }
                        else {
                            $(element).find(' .app-detail-body .chat-body').append('<div class="chat-body-item chat-left" data-id="'+id+'"></div>');
                            $(element).find(' .chat-body-item[data-id="'+id+'"]').append('<div class="chat-body-text">'+message.text+'</div>');
                            $(element).find(' .chat-body-item[data-id="'+id+'"]').append('<div class="chat-body-desc"></div>');
                            $(element).find(' .chat-body-item[data-id="'+id+'"] .chat-body-desc').append('<div>'+message.timestamp+'</div>');
                        }
                        id--;
                    });
                }
            },
            postDetail: {
                transition: 'slide-right',
                header: {
                    styles: {
                        'background-color': '#54586e',
                        'color': 'white',
                    },
                    back: {
                        styles: {
                            'color': 'white',
                        }
                    }
                },
                body: {
                    color: 'white',
                    scroll: true,
                },
                click: function(element, opt) {
                    // console.log(opt);
                }
            },
            profileDetail: {
                transition: 'slide-right',
                header: {
                    styles: {
                        'background-color': 'red',
                        'height': '0px',
                        'min-height': '0px',
                        'padding': '0',
                    },
                    back: false,
                },
                body: {
                    color: 'white',
                    scroll: false,
                },
                click: function(element, opt) {
                    // $(element).find(' .app-detail-body').append('<img class="line-profile-bg" src="'+opt.data.profileCover+'" />');
                    $(element).find(' .app-detail-body').append('<div class="line-profile-container" style="background-image:url('+opt.data.profileCover+');background-size: 180px 200px; background-repeat: no-repeat;"></div>');
                    $(element).find(' .app-detail-body .line-profile-container').append('<img class="line-profile-avatar" src="'+opt.data.avatar+'" />');
                    $(element).find(' .app-detail-body .line-profile-container').append('<span class="line-profile-title">'+opt.data.name+'</span>');
                    $(element).find(' .app-detail-body .line-profile-container').append('<span class="line-profile-subtitle">'+opt.data.status+'</span>');
                    $(element).find(' .app-detail-body').append('<div class="line-profile-container-second"></div>');
                    $(element).find(' .app-detail-body .line-profile-container-second').append('<button></button>');
                    $(element).find(' .app-detail-body .line-profile-container-second button').append('<i class="fas fa-comment-dots"></i>');
                    $(element).find(' .app-detail-body .line-profile-container-second button').append('<span>Chat</span>');
                    $(element).find(' .app-detail-body .line-profile-container-second button').click(function() {
                        phone.openDetail('chatDetail', {
                            header: opt.data.name,
                            data: opt.data
                        });
                    });
                }
            }
        }
    };
    openApp(phone, o);
}