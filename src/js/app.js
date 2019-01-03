function openApp(phone, options) {
    var selector = phone.selector;
    phone.isRunningApp = true;
    phone.runningApp = options.id;
    phone.options = options;
    phone[options.id] = {
        pages: [],
    };
    
    // hide apps from main screen
    $(selector+' .app-container-row').hide();
    if(options.splash) {
        $(selector+' .phone-main-screen-body').append('<div class="app-splash"></div>');
        if(options.splash.image) {
            $(selector+' .app-splash').append('<img src="'+options.splash.image+'" />');
        }
        if(options.splash.icon) {
            $(selector+' .app-splash').append('<i class="'+options.splash.icon.class +'"></i>');
            utilAddStyles(selector+' .app-splash i', options.splash.icon.styles);
        }
        for(var key in options.splash.styles) {
            utilAddStyles(selector+' .app-splash', options.splash.styles);
        }
        setTimeout(function() {
            $(selector+' .app-splash').remove();
            if(phone.runningApp === options.id)
                openAppMainPage(phone, options, selector);      
        }, options.splash.time);
    }
    else {
         openAppMainPage(phone, options, selector);   
    }
}

function openAppMainPage(phone, options, selector) {
    $(selector+' .phone-main-screen-body').css('background', options.baseColor);
    
    if(options.header) {
        $(selector+' .phone-main-screen-body').append('<div class="app-screen-header"></div>');
        utilAddStyles(selector+' .app-screen-header', options.header.styles);
        $(selector+' .app-screen-header').append('<div class="app-screen-header-title">'+options.header.text+'</div>');
        if(options.sidebar) {
            $(selector+' .phone-main-screen-body').append('<div class="app-sidebar" />');
            $(selector+' .app-sidebar').append('<div class="app-sidebar-left"></div>');
            utilAddStyles(selector+' .app-sidebar-left', options.sidebar.styles);
            options.sidebar.fill();
        }
        if(options.details) {
            phone.openDetail = function(id, opt) {
                var selector = this.selector;
                var detail = this.options.details[id];
                var newId = id + (new Date()).getTime();
                $(selector+' .phone-main-screen-body').append('<div class="app-detail" data-id="'+newId+'"></div>');
                $(selector+' .app-detail[data-id="'+newId+'"]').addClass(detail.transition);
                $(selector+' .app-detail[data-id="'+newId+'"]').append('<div class="app-detail-header"></div>');
                utilAddStyles(selector+' .app-detail[data-id="'+newId+'"] .app-detail-header', detail.header.styles);
                $(selector+' .app-detail[data-id="'+newId+'"] .app-detail-header').append('<div class="app-detail-header-left"></div>');
                $(selector+' .app-detail[data-id="'+newId+'"] .app-detail-header').append('<div class="app-detail-header-right"></div>');
                if(detail.header.back) {
                    $(selector+' .app-detail[data-id="'+newId+'"] .app-detail-header-left').append('<button class="app-detail-header-back-btn"><i class="'+(detail.header.back.icon?detail.header.back.icon:'fa fa-chevron-left')+'"></i></button>');
                    utilAddStyles(selector+' .app-detail[data-id="'+newId+'"] .app-detail-header-back-btn', detail.header.back.styles);
                    $(selector+' .app-detail[data-id="'+newId+'"] .app-detail-header-back-btn').click(function() {
                        phone.backButton();
                    });
                }
                $(selector+' .app-detail[data-id="'+newId+'"] .app-detail-header-left').append('<span class="app-detail-header-title"></span>');
                $(detail.header.menus).each(function(j, menu) {
                    $(selector+' .app-detail[data-id="'+newId+'"] .app-detail-header-right').append('<button data-id="'+j+'"></button>');
                    $(selector+' .app-detail[data-id="'+newId+'"] .app-detail-header-right button[data-id="'+j+'"]').append('<i class="'+menu.icon+'"></i>');
                    $(selector+' .app-detail[data-id="'+newId+'"] .app-detail-header-right button[data-id="'+j+'"]').click(function() {
                        menu.click(phone, opt);
                    });
                });
                
                $(selector+' .app-detail[data-id="'+newId+'"]').append('<div class="app-detail-body" style="background:'+detail.body.color+';overflow-y:'+(detail.body.scroll?'scroll':'hidden')+'"></div>');                

                var element = $(selector+' .app-detail[data-id="'+newId+'"]');
                setTimeout(function() {
                    $(element).addClass('active');
                }, 50);
                $(element).find(' .app-detail-header-title').text(opt.header);
                $(element).find(' .app-detail-body').empty();
                if('click' in detail) {
                    detail.click(element, opt);
                }
                phone[options.id].pages.push(newId);
            };
        }
        if(options.header.image) {
            $(selector+' .app-screen-header-title').prepend('<img src="'+options.header.image+'" />');
            
            $(selector+' .app-screen-header-title img').click(function() {
                $(selector+' .app-sidebar').addClass('active');
            });
            $(selector+' .app-sidebar-right').click(function() {
                $(selector+' .app-sidebar').removeClass('active');
            });
        }
        if(options.header.icon) {
            $(selector+' .app-screen-header-title').prepend('<i class="'+options.header.icon+'"></i>');
        }
        // if(options.header.border) {
        //     $(selector+' .app-screen-header-title').css('border-bottom', '1px solid '+options.header.borderColor);
        // }
        if(options.header.size === 'small') {
            $(selector+' .app-screen-header-title').addClass('header-small');
        }
        else if (options.header.size === 'big') {
            $(selector+' .app-screen-header-title').addClass('header-big');
        }
        if(options.navBar) {
            $(selector+' .app-screen-header').append('<div class="app-screen-header-navmenu"></div>');
            $(options.navMenus).each(function(id, n) {
                $(selector+' .app-screen-header-navmenu').append('<button class="app-header-navmenu-menu '+(n.active?'active':'')+'" data-id="'+id+'"><i class="fas '+n.icon+'"></i></button>');
            });
            $(selector+' .app-header-navmenu-menu:not(.active)').css('color', options.navBar.iconColor.default);
            $(selector+' .app-header-navmenu-menu.active').css('color', options.navBar.iconColor.active);

            $(selector+' .app-header-navmenu-menu').click(function() {
                $(selector+' .app-header-navmenu-menu.active').removeClass('active');
                $(this).addClass('active');
                $(selector+' .app-header-navmenu-menu:not(.active)').css('color', options.navBar.iconColor.default);
                $(this).css('color', options.navBar.iconColor.active);
                var i = $(this).attr('data-id');
                if('click' in options.navMenus[i])
                    options.navMenus[i].click();
            });
        }
    }
    $(selector+' .phone-main-screen-body').append('<div class="app-screen-body"></div>');
    if(options.footer) {
        $(selector+' .phone-main-screen-body').append('<div class="app-screen-footer"></div>');
        utilAddStyles(selector+' .app-screen-footer', options.footer.styles);
        $(selector+' .app-screen-footer').append('<div class="app-screen-footer-navmenu"></div>');
        $(options.footerMenus).each(function(id, n) {
            $(selector+' .app-screen-footer-navmenu').append('<button class="app-footer-navmenu-menu '+(n.active?'active':'')+'" data-id="'+id+'"><i class="'+n.icon+'"></i></button>');
        });
        $(selector+' .app-footer-navmenu-menu:not(.active)').css('color', options.footer.iconColor.default);
        $(selector+' .app-footer-navmenu-menu.active').css('color', options.footer.iconColor.active);

        $(selector+' .app-footer-navmenu-menu').click(function() {
            var i = $(this).attr('data-id');
            if(!options.footerMenus[i].openDetail) {
                $(selector+' .app-footer-navmenu-menu.active').removeClass('active');
                $(this).addClass('active');
                $(this).css('color', options.footer.iconColor.active);
                $(selector+' .app-footer-navmenu-menu:not(.active)').css('color', options.footer.iconColor.default);
            }
            
            if('click' in options.footerMenus[i])
                options.footerMenus[i].click();
        });
    }
    if(options.fragments) {
        phone.openFragment = function(id) {
            var selector = phone.selector;
            $(selector+' .app-list-body-item').remove();
            if(options.fragments[id]) {
                if(options.fragments[id].type === 'list') {
                    $(options.fragments[id].data).each(function(i, d) {
                        options.fragments[id].fill(selector+' .app-screen-body', i, d);
                    });
                }
                else {
                    options.fragments[id].fill(selector+' .app-screen-body', options.fragments[id].data);
                }
            }
        };
        phone.openFragment('home');
    }
}