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
                status: ''
            },
            {
                avatar: 'https://api.adorable.io/avatars/285/Nana@adorable.png',
                name: 'Nana',
                status: 'lol'
            }
        ],
        chats: [
            {
                avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
                name: 'Abott',   
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
    phone.line = 'line' in phone ? phone.line : defLineOptions;

    var o = {
        baseColor: 'white',
        header: {
            text: 'Chats',
            size: 'small',
            color: '#54586e',
            textColor: 'white',
        },
        navBar: {
            iconColor: {
                default: '#9fa3b5',
                active: 'white',
            }
        },
        navMenus: [
            {
                icon: 'fa-user',
                click: function() {
                    lineGotoProfile(phone);
                }
            },
            {
                icon: 'fa-comment-dots',
                active: true,
                click: function() {
                    lineGotoChats(phone);
                }
            },
            {
                icon: 'fa-clock',
                click: function() {
                    lineGotoTimeline(phone);
                }
            }
        ],
    };
    openApp(phone, o);
    lineGotoChats(phone);
}
function lineCleanBody(phone) {
    var selector = phone.selector;
    $(selector+' .line-body-item').remove();
}
function lineGotoChats(phone) {
    var selector = phone.selector;
    var line = phone.line;
    lineCleanBody(phone);
    // append chat list
    $(line.chats).each(function(id, chat) {
        $(selector+' .app-screen-body').append('<button class="line-chat-list-item line-body-item" data-id="'+id+'"></button>');
        $(selector+' .line-chat-list-item[data-id="'+id+'"]').append('<img src="'+chat.avatar+'" />');
        $(selector+' .line-chat-list-item[data-id="'+id+'"]').append('<div><p class="title">'+chat.name+'</p><p class="subtitle">'+chat.messages[0].text+'</p></div>');
        $(selector+' .line-chat-list-item[data-id="'+id+'"]').append('<span class="chat-date">'+chat.messages[0].timestamp+'</span>');
    });
}
function lineGotoProfile(phone) {
    var selector = phone.selector;
    var line = phone.line;
    var profile = line.profile;
    var friends = line.friends;
    lineCleanBody(phone);

    $(selector+' .app-screen-body').append('<div class="line-profile-item line-body-item" data-id="-1"></div>');
    $(selector+' .line-profile-item[data-id="-1"]').append('<img src="'+profile.avatar+'" />');
    $(selector+' .line-profile-item[data-id="-1"]').append('<div><p class="title">'+profile.name+'</p><p class="subtitle">'+profile.status+'</p></div>');
    
    $(selector+' .app-screen-body').append('<button class="line-profile-group line-body-item" data-group-id="1"></button>');
    $(selector+' .line-profile-group').append('<span>Friends '+friends.length+'</span>');
    $(selector+' .line-profile-group').append('<i class="fa fa-chevron-up"></i>');
    // append friend list
    $(line.friends).each(function(id, friend) {
        $(selector+' .app-screen-body').append('<div class="line-profile-item line-body-item" data-id="'+id+'" data-group-id="1"></div>');
        $(selector+' .line-profile-item[data-id="'+id+'"]').append('<img src="'+friend.avatar+'" />');
        var el = '<div><p class="title">'+friend.name+'</p>';
        if(friend.name)
            el += '<p class="subtitle">'+friend.status+'</p>';
        el += '</div>';
        $(selector+' .line-profile-item[data-id="'+id+'"]').append(el);
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

function lineGotoTimeline(phone) {
    var selector = phone.selector;
    var line = phone.line;
    lineCleanBody(phone);

    $(line.posts).each(function(id, post) {
        $(selector+' .app-screen-body').append('<div class="line-post-item line-body-item" data-id="'+id+'"></div>');   
        $(selector+' .line-post-item[data-id="'+id+'"]').append('<div class="line-post-item-header"></div>');
        $(selector+' .line-post-item[data-id="'+id+'"]').append('<div class="line-post-item-body"></div>');
        $(selector+' .line-post-item[data-id="'+id+'"]').append('<div class="line-post-item-footer"></div>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-header').append('<img src="'+post.avatar+'" />');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-header').append('<span>'+post.name+'</span>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-body').append('<p>'+post.text+'</p>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer').append('<div class="line-post-item-footer-left"></div>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left').append('<div class="line-post-item-footer-left-row line-row-1"></div>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-1').append('<button><i class="far fa-smile"></i></button>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-1').append('<button><i class="far fa-comment-dots"></i></button>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-1').append('<button><i class="fa fa-share-alt"></i></button>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left').append('<div class="line-post-item-footer-left-row line-row-2"></div>');
        if(post.comments.length > 0)
            $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-2').append('<button>'+post.comments.lenght+' comments</button>');
        if(post.shares > 0)
            $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-2').append('<button>'+post.shares+' shares</button>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left').append('<div class="line-post-item-footer-left-row line-row-3"></div>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-left-row.line-row-3').append('<span><i class="fa fa-globe-asia"></i> '+post.timestamp+'</span>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer').append('<div class="line-post-item-footer-right"></div>');
        $(selector+' .line-post-item[data-id="'+id+'"] .line-post-item-footer-right').append('<div>right</div>');
    });
}