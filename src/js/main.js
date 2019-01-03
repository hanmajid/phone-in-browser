function phone(selector, options) {
    if(!window.jQuery) {
        console.error('jQuery is not defined.');
        return null;
    }
    var ph = {};
    if(!selector)
        selector = '#phone';

    var defOptions = {
        isPassword: false,
        isLocked: true,
        isOn: true,
        apps: [
            [
                'line',
                'gallery',
                '',
                ''
            ],
        ],
        appConfig: {
            //
        },
        battery: 80,
        isInternet: true,
        gallery: {
            albums: [
                {
                    name: "Camera",
                    images: [
                        {
                            filename: "Landscape",
                            timestamp: "11/22/2018 15:17:46",
                            width: 1200,
                            height: 1200,
                            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Inside_the_Batad_rice_terraces.jpg/220px-Inside_the_Batad_rice_terraces.jpg",
                        },
                    ]
                },
                {
                    name: "Downloads",
                    images: [
                        {
                            filename: "Kitty",
                            timestamp: "11/22/2018 15:17:46",
                            width: 1200,
                            height: 1200,
                            url: "https://placekitten.com/300/300",
                        },
                        {
                            filename: "Katty",
                            timestamp: "11/22/2018 15:17:46",
                            width: 1200,
                            height: 1200,
                            url: "https://placekitten.com/200/200",
                        }, 
                        {
                            filename: "Ketty",
                            timestamp: "11/22/2018 15:17:46",
                            width: 1200,
                            height: 1200,
                            url: "https://placekitten.com/400/400",
                        }, 
                        {
                            filename: "Kotty",
                            timestamp: "11/22/2018 15:17:46",
                            width: 1200,
                            height: 1200,
                            url: "https://placekitten.com/210/210",
                        }, 
                    ]
                }
            ]
        },
    };
    if(!options) {
        options = defOptions;
    }

    for (var key in defOptions) {
        ph[key] = key in options ? options[key] : defOptions[key];
    }
    ph.line = 'line' in options ? options.line : null;
    // ph.isPassword = 'isPassword' in options ? options.isPassword : defOptions.isPassword;
    // ph.isLocked = 'isLocked' in options ? options.isLocked : defOptions.isLocked;
    // ph.isOn = 'isOn' in options ? options.isOn : defOptions.isOn;
    // ph.apps = 'apps' in options ? options.apps : defOptions.apps;
    ph.selector = selector;
    ph.isRunningApp = false;
    ph.powerButton = function() {
        pressPowerButton($(this).get(0));
    };
    ph.homeButton = function() {
        pressHomeButton($(this).get(0));
    };
    ph.backButton = function() {
        pressBackButton($(this).get(0));
    };

    drawPhone(ph);

    return ph;
}
function drawPhone(phone) {
    var selector = phone.selector;
    $(selector).addClass('phone-selector');
    $(selector).html('<div class="phone-container"></div>');
    $(selector).append('<button class="phone-power-button"></button>');
    $(selector+' .phone-container').append('<div class="phone-header"></div>');
    $(selector+' .phone-header').append('<div class="phone-speaker"></div>');
    $(selector+' .phone-container').append('<div class="phone-screen"></div>');
    $(selector+' .phone-screen').append('<div class="phone-main-screen"></div>');
    $(selector+' .phone-main-screen').append('<div class="phone-main-screen-header"></div>');
    $(selector+' .phone-main-screen').append('<div class="phone-main-screen-body"></div>');
    $(selector+' .phone-main-screen-body').append('<button class="button-unlock-screen"><i class="fas fa-lock"></i></button>');
    $(selector+' .phone-main-screen').append('<div class="phone-main-screen-footer"></div>');
    $(selector+' .phone-main-screen-footer').append('<div class="phone-main-screen-clock phone-clock"></div>');
    $(selector+' .phone-main-screen-footer').append('<div class="phone-main-screen-date phone-date"></div>');
    $(selector+' .phone-main-screen-header').append('<div class="phone-main-screen-header-left"></div>');
    $(selector+' .phone-main-screen-header').append('<div class="phone-main-screen-header-center"></div>');    
    $(selector+' .phone-main-screen-header').append('<div class="phone-main-screen-header-right"></div>');
    if(phone.isInternet) {
        $(selector+' .phone-main-screen-header-left').append('<div class="phone-signal">4G LTE <i class="fas fa-signal"></i></div>');
    }
    else {
        $(selector+' .phone-main-screen-header-left').append('<div class="phone-signal">E <i class="fas fa-signal"></i></div>');
    }
    var batteryClass;
    if(phone.battery >= 90) {
        batteryClass = 'fa-battery-full';
    }
    else if(phone.battery >= 75) {
        batteryClass = 'fa-battery-three-quarters';
    }
    else if(phone.battery >= 50) {
        batteryClass = 'fa-battery-half';
    }
    else if(phone.battery >= 10) {
        batteryClass = 'fa-battery-quarter';
    }
    else {
        batteryClass = 'fa-battery-empty';
    }
    $(selector+' .phone-main-screen-header-right').append('<div class="phone-battery"><i class="fas '+batteryClass+'"></i></div>');
    $(selector+' .phone-container').append('<div class="phone-footer"></div>');
    $(selector+' .phone-footer').append('<button class="button-bars button-side"><i class="fas fa-bars"></i></button>');
    $(selector+' .phone-footer').append('<button class="button-home"></button>');
    $(selector+' .phone-footer').append('<button class="button-back button-side"><i class="fas fa-undo"></i></button>');
    
    if(!phone.isOn)
        $(selector+' .phone-main-screen').hide();
    startTime();
    setupDate();
    setupButtons(phone);
}
function setupDate() {
    var today = new Date();
    var dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT','SUN'];
    var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var day = dayNames[today.getDay()];
    var date = today.getDate();
    var month = monthNames[today.getMonth()];
    $('.phone-date').html(day + " " + date + " " + month);
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('.phone-clock').html(h + ":" + m);
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }  // add zero in front of numbers < 10
    return i;
}

function pressHomeButton(phone) {
    if(phone.isOn) {
        if(phone.isRunningApp) {
            backToHome(phone);
        }
    }
}

function pressBackButton(phone) {
    if(phone.isOn) {
        if(phone.isRunningApp) {
            var lastPageId = phone[phone.runningApp].pages.pop();
            if(lastPageId) {
                $(phone.selector+' .app-detail[data-id="'+lastPageId+'"]').removeClass('active');
                setTimeout(function() {
                    $(phone.selector+' .app-detail[data-id="'+lastPageId+'"]').remove();
                }, 100);
            }
            else {
                backToHome(phone);
            }
        }
    }
}

function setupButtons(phone) {
    var selector = phone.selector;
    $(selector+' .button-home').unbind();
    $(selector+' .button-unlock-screen').unbind();
    $(selector+' .phone-power-button').unbind();
    $(selector+' .button-back').unbind();

    $(selector+' .phone-power-button').click(function() {
        pressPowerButton(phone);
    });
    $(selector+' .button-home').click(function() {
        pressHomeButton(phone);
    });
    $(selector+' .button-back').click(function() {
        pressBackButton(phone);
    });
    $(selector+' .button-unlock-screen').click(function() {
        if(phone.isPassword) {
            $(selector+' .phone-main-screen').addClass('blur-screen');
            phone.isLocked = !phone.isLocked;
        }
        else {
            unlockPhone(phone);
        }
    });
}
function pressPowerButton(phone) {
    if(phone.isOn) {
        powerOff(phone);
    }
    else {
        powerOn(phone);
    }
}

function backToHome(phone) {
    var selector = phone.selector;
    $(selector+' .app-splash').remove();
    $(selector+' .app-sidebar').remove();
    $(selector+' .app-detail').remove();
    $(selector+' .app-screen-header').remove();
    $(selector+' .app-screen-body').remove();
    $(selector+' .app-screen-footer').remove();
    $(selector+' .phone-main-screen-body').css('background', 'transparent');

    $(selector+' .app-container-row').show();
    phone.isRunningApp = false;
    phone.runningApp = null;
}
function powerOff(phone) {
    var selector = phone.selector;
    $(selector+' .phone-main-screen').fadeOut();
    phone.isOn = false;
}
function powerOn(phone) {
    var selector = phone.selector;
    $(selector+' .phone-main-screen').fadeIn();
    $(selector+' .phone-main-screen').removeClass('blur-screen');
    $(selector+' .phone-main-screen-footer').empty();
    $(selector+' .phone-main-screen-footer').append('<div class="phone-main-screen-clock phone-clock"></div>');
    $(selector+' .phone-main-screen-footer').append('<div class="phone-main-screen-date phone-date"></div>');
    $(selector+' .phone-main-screen-body').empty();
    $(selector+' .phone-main-screen-body').css('background', 'transparent');
    $(selector+' .phone-main-screen-body').css('justify-content', 'center');
    $(selector+' .phone-main-screen-body').css('align-items', 'center');
    $(selector+' .phone-main-screen-body').append('<button class="button-unlock-screen hvr-icon-bob"><i class="hvr-icon fas fa-lock"></i></button>');
    $(selector+' .phone-main-screen-header-center').empty();
    
    startTime();
    setupDate();
    setupButtons(phone);
    phone.isOn = true;
    phone.isLocked = true;
}

function unlockPhone(phone) {
    var selector = phone.selector;
    $(selector+' .phone-main-screen-header-center').empty();
    $(selector+' .phone-main-screen-header-center').append('<div class="phone-main-screen-header-clock phone-clock"></div>');
    $(selector+' .phone-main-screen').removeClass('blur-screen');   
    $(selector+' .phone-main-screen-footer').empty();
    $(selector+' .phone-main-screen-body').empty();
    $(selector+' .phone-main-screen-body').css('justify-content', 'start');
    $(selector+' .phone-main-screen-body').css('align-items', 'start');

    $(selector+' .phone-main-screen-body').hide();
    $(phone.apps).each(function(i, app) {
        $(selector+' .phone-main-screen-body').append('<div class="app-container-row" data-id="'+i+'"></div>');
        $(app).each(function(j, a) {
            var appInfo = {};
            if(a === 'line') {
                appInfo = {
                    name: 'Chat',
                    icon: 'fas fa-comment-alt',
                    iconColor: '#00b900',
                    click: function() {
                        openLine(phone);
                    }
                };
            }
            else if(a === 'twitter') {
                appInfo = {
                    name: 'Chipper',
                    icon: 'fas fa-dove',
                    iconColor: '#1da1f2',
                    click: function() {
                        openTwitter(phone);
                    }
                };
            }
            else if(a === 'instagram') {
                appInfo = {
                    name: 'Pictogram',
                    icon: 'fas fa-camera-retro',
                    iconColor: '#df2c7b',
                    click: function() {
                        openInstagram(phone);
                    }
                };
            }
            else if(a === 'facebook') {
                appInfo = {
                    name: 'Friendbook',
                    icon: 'fas fa-book-open',
                    iconColor: '#4867aa',
                    click: function() {
                        // openInstagram(phone);
                    }
                };
            }
            else if(a === 'gallery') {
                appInfo = {
                    name: 'Gallery',
                    icon: 'fas fa-images',
                    iconColor: 'green',
                    click: function() {
                        openGallery(phone);
                    }
                };
            }
            else if (a) {
                appInfo = phone.appConfig[a];
            }
            if(a) {
                $(selector+' .app-container-row[data-id="'+i+'"]').append('<button class="app-container" data-id="'+j+'"></button>');
                $(selector+' .app-container-row[data-id="'+i+'"] .app-container[data-id="'+j+'"]').append('<div class="app-icon" style="color:'+appInfo.iconColor+';"><i class="'+appInfo.icon+' fa-2x"></i></div>');
                $(selector+' .app-container-row[data-id="'+i+'"] .app-container[data-id="'+j+'"]').append('<span class="app-name">'+appInfo.name+'</span>');
                $(selector+' .app-container-row[data-id="'+i+'"] .app-container[data-id="'+j+'"]').click(function() {
                    appInfo.click();
                });
            }
            else {
                $(selector+' .app-container-row[data-id="'+i+'"]').append('<div class="app-container-empty"></div>');
            }
        });
    });
    
    $(selector+' .phone-main-screen-body').fadeIn();
    phone.isLocked = false;
}

function utilAddStyles(selector, styles) {
    for(var key in styles) {
        $(selector).css(key, styles[key]);
    }
}