function openTwitter(phone) {
    var defTwitterOptions = {
        home: [
            {
                avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
                name: 'Abott',
                username: 'abott',
                timestamp: '1h',
                text: 'Tis is epic.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Inside_the_Batad_rice_terraces.jpg/220px-Inside_the_Batad_rice_terraces.jpg',
                comments: 3,
                shares: 2,
                retweets: 7,
                loves: 41
            },
            {
                avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
                name: 'Abott',
                username: 'abott',
                timestamp: '1h',
                text: 'I fardok',
                comments: 3,
                shares: 2,
                retweets: 7,
                loves: 41
            },
            {
                avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
                name: 'Abott',
                username: 'abott',
                timestamp: '1h',
                text: 'I fardok',
                comments: 3,
                shares: 2,
                retweets: 7,
                loves: 41
            },
        ],
        trending: [
            {
                name: '#LemurDay',
                tweets: '30.3K',
            },
            {
                name: '#SavePenguin',
                tweets: '12.5K',
            },
            {
                name: '#Avengers10SecretWar',
                tweets: '2.1K',
            },
            {
                name: '#SwampShrekRedemption',
                tweets: '1.6K',
            },
        ],
        profile: {
            name: 'Farhan Majid',
            username: 'hanmajid',
            following: 11,
            followers: 12,
            avatar: 'http://blog.hanmajid.com/images/me-3.jpg',
        },
        messages: [

        ],
    };
    phone.twitter = 'twitter' in phone ? phone.twitter : defTwitterOptions;

    var o = {
        baseColor: 'white',
        header: {
            image: phone.twitter.profile.avatar,
            text: 'Home',
            size: 'big',
            styles: {
                'background-color': 'white',
                'color': 'black',
                'font-weight': 'bold',
                'border-bottom': '1px solid lightGray',
            }
        },
        splash: {
            styles: {
                'background-color': '#1da1f2'
            },
            time: 1000,
            icon: {
                class: 'fas fa-dove',
                styles: {
                    'color': 'white',
                    'font-size': '30px',
                }
            },
            firstLoad: function() {
                twitterGotoHome(phone);
            }
        },
        fragments: {
            home: {
                type: 'list',
                data: phone.twitter.home,
                fill: function(selector, id, tweet) {
                    $(selector).append('<button class="twitter-list-item app-list-body-item" data-id="'+id+'"></button>');
                    $(selector+' .twitter-list-item[data-id="'+id+'"]').append('<div class="twitter-item-body"></div>');
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-body').append('<button class="twitter-item-body-left"><img src="'+tweet.avatar+'" /></button>');
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-body').append('<div class="twitter-item-body-right"></div>');
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-body-right').append('<div class="twitter-item-header"></div>');
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-header').append('<span class="title">'+tweet.name+'</span><span class="subtitle">@'+tweet.username+'</span>');
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-header').append('<span class="tweet-date">. '+tweet.timestamp+'</span>');
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-body-right').append('<div class="tweet-text">'+tweet.text+'</span>');
                    if(tweet.image) {
                        $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-body-right').append('<img class="tweet-image" src="'+tweet.image+'" />');
                    }
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-body-right').append('<div class="twitter-item-footer"></div>');
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-footer').append('<button class="tweet-footer-button"><i class="far fa-comment"></i> '+tweet.comments+'</button>');
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-footer').append('<button class="tweet-footer-button"><i class="fas fa-retweet"></i> '+tweet.retweets+'</button>');
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-footer').append('<button class="tweet-footer-button"><i class="far fa-heart"></i> '+tweet.loves+'</button>');
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-footer').append('<button class="tweet-footer-button"><i class="fas fa-share-alt"></i></button>');
                    
                    $(selector+' .twitter-list-item[data-id="'+id+'"] .twitter-item-body-left').click(function() {
                        phone.openDetail('twitterProfile', {
                            header: tweet.name,
                            data: tweet,
                        });
                    });
                }
            },
            trending: {
                type: 'list',
                data: phone.twitter.trending,
                fill: function(selector, id, trend) {
                    $(selector).append('<button class="twitter-list-trending-item app-list-body-item" data-id="'+id+'"></button>');
                    $(selector+' .twitter-list-trending-item[data-id="'+id+'"]').append('<span class="tweet-trending-number">'+(id+1)+'</span>');
                    $(selector+' .twitter-list-trending-item[data-id="'+id+'"]').append('<span class="twitter-trending-item-body"></span>');
                    $(selector+' .twitter-list-trending-item[data-id="'+id+'"] .twitter-trending-item-body').append('<span class="title">'+trend.name+'</span>');
                    $(selector+' .twitter-list-trending-item[data-id="'+id+'"] .twitter-trending-item-body').append('<span class="subtitle">'+trend.tweets+' Tweets</span>');
                }
            },
            message: {
                type: 'list',
                data: phone.twitter.messages,
                fill: function(selector, id, message) {
                    
                }
            },
        },
        sidebar: {
            styles: {
                'background-color': 'white',
                'box-shadow': '1px 1px 5px 0px grey',
            },
            fill: function() {
                var selector = phone.selector;
                $(selector+' .app-sidebar-left').append('<img src="'+phone.twitter.profile.avatar+'" width="25" />');
                $(selector+' .app-sidebar-left').append('<span class="twitter-sidebar-title">'+phone.twitter.profile.name+'</span>');
                $(selector+' .app-sidebar-left').append('<span class="twitter-sidebar-subtitle">@'+phone.twitter.profile.username+'</span>');
                $(selector+' .app-sidebar-left').append('<div></div>');
                $(selector+' .app-sidebar-left div').append('<span><span class="twitter-number">'+phone.twitter.profile.following+'</span> Following</span>');
                $(selector+' .app-sidebar-left div').append('<span><span class="twitter-number">'+phone.twitter.profile.followers+'</span> Followers</span>');
                $(selector+' .app-sidebar').append('<div class="app-sidebar-right" />');
            },
        },
        footer: {
            styles: {
                'background-color': 'white',
                'border-top': '1px solid lightGray',
            },
            iconColor: {
                default: 'gray',
                active: '#1da1f2',
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
                icon: 'fas fa-search',
                click: function() {
                    phone.openFragment('trending');
                }
            },
            {
                icon: 'far fa-envelope',
                click: function() {
                    phone.openFragment('message');
                }
            }
        ],
        details: {
            twitterProfile: {
                transition: 'slide-right',
                header: {
                    styles: {
                        'background-color': 'white',
                        'color': 'black',
                    },
                    back: {
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