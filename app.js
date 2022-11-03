function _typeof(t) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, _typeof(t)
}

var siteUIVars = siteUIVars || {}, SiteUIStatus = SiteUIStatus || {}, SiteUITypes = SiteUITypes || {},
    SiteUIHelpers = SiteUIHelpers || {};

function initTypeahead() {
    $.isFunction($.fn.typeahead) && $(".typeahead").each((function (t, e) {
        var a = $(e), n = {name: a.attr("name") ? a.attr("name") : a.attr("id") ? a.attr("id") : "tt"};
        if (!a.hasClass("tagsinput")) {
            if (a.data("local")) {
                var o = a.data("local");
                o = o.replace(/\s*,\s*/g, ",").split(","), n.local = o
            }
            if (a.data("prefetch")) {
                var i = a.data("prefetch");
                n.prefetch = i
            }
            if (a.data("remote")) {
                var s = a.data("remote");
                n.remote = s
            }
            if (n.local || n.prefetch || n.remote || (n.local = []), a.data("template")) {
                var r = a.data("template");
                n.template = r, n.engine = Hogan
            }
            a.typeahead(n)
        }
    }))
}

function initInputMask() {
    $.isFunction($.fn.inputmask) && $("[data-mask]").each((function (t, e) {
        var a = $(e), n = a.data("mask").toString(), o = {
            numericInput: attrDefault(a, "numeric", !1),
            radixPoint: attrDefault(a, "radixPoint", ""),
            rightAlignNumerics: "right" == attrDefault(a, "numericAlign", "left")
        }, i = attrDefault(a, "placeholder", ""), s = attrDefault(a, "isRegex", "");
        switch (i.length && (o[i] = i), n.toLowerCase()) {
            case"phone":
                n = "(999) 999-9999";
                break;
            case"adnphone":
                n = "+9{20}", $.extend(o, {placeholder: ""});
                break;
            case"currency":
            case"rcurrency":
                var r = attrDefault(a, "sign", "$");
                n = "999,999,999.99", "rcurrency" == a.data("mask").toLowerCase() ? n += " " + r : n = r + " " + n, o.numericInput = !0, o.rightAlignNumerics = !1, o.radixPoint = ".";
                break;
            case"email":
                n = "Regex", o.regex = "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}";
                break;
            case"fdecimal":
                n = "decimal", $.extend(o, {
                    autoGroup: !0,
                    groupSize: 3,
                    radixPoint: attrDefault(a, "rad", "."),
                    groupSeparator: attrDefault(a, "dec", ",")
                });
                break;
            case"cpmdecimal":
                n = "decimal", $.extend(o, {
                    inputType: "number",
                    groupSize: 3,
                    digits: 3,
                    step: 1,
                    autoGroup: !0,
                    radixPoint: attrDefault(a, "rad", "."),
                    groupSeparator: attrDefault(a, "dec", ""),
                    radixFocus: !1,
                    rightAlign: !1,
                    allowMinus: !1,
                    allowPlus: !1
                });
                break;
            case"dailybudget":
                n = "numeric", $.extend(o, {
                    autoGroup: !0,
                    groupSize: 3,
                    radixPoint: attrDefault(a, "rad", "."),
                    groupSeparator: attrDefault(a, "dec", ""),
                    radixFocus: !1,
                    rightAlign: !1,
                    allowMinus: !1,
                    allowPlus: !1,
                    digits: 0,
                    min: attrDefault(a, "min", 10),
                    max: attrDefault(a, "max", 1e5)
                })
        }
        s && (o.regex = n, n = "Regex"), void 0 === a.inputmask("option", "mask") && a.inputmask(n, o)
    }))
}

function initFormValidate() {
    $.isFunction($.fn.validate) && $("form.validate").each((function (t, e) {
        var a = $(e), n = {
            rules: {},
            messages: {},
            errorElement: "span",
            errorClass: "validate-has-error",
            ignore: "input[type=hidden]",
            highlight: function (t, e, a) {
                var n = $(t);
                n.hasClass("select2-offscreen") ? $("#s2id_" + n.attr("id")).closest(".form-group").addClass("validate-has-error") : n.closest(".form-group").addClass("validate-has-error")
            },
            unhighlight: function (t, e, a) {
                var n = $(t);
                n.hasClass("select2-offscreen") ? $("#s2id_" + n.attr("id")).closest(".form-group").removeClass("validate-has-error") : n.closest(".form-group").removeClass("validate-has-error")
            },
            errorPlacement: function (t, e) {
                e.closest(".has-switch").length ? t.insertAfter(e.closest(".has-switch")) : e.parent(".checkbox, .radio").length || e.parent(".input-group").length ? t.insertAfter(e.parent()) : t.insertAfter(e)
            }
        };
        a.find("[data-validate]").each((function (t, e) {
            var a = $(e), o = a.attr("name"), i = attrDefault(a, "validate", "").toString().split(",");
            for (var s in i) {
                var r, l, c = i[s];
                void 0 === n.rules[o] && (n.rules[o] = {}, n.messages[o] = {}), -1 != $.inArray(c, ["required", "url", "email", "number", "date", "creditcard"]) ? (n.rules[o][c] = !0, (l = a.data("message-" + c)) && (n.messages[o][c] = l)) : (r = c.match(/(\w+)\[(.*?)\]/i)) && -1 != $.inArray(r[1], ["min", "max", "minlength", "maxlength", "equalTo"]) && (n.rules[o][r[1]] = r[2], (l = a.data("message-" + r[1])) && (n.messages[o][r[1]] = l))
            }
        })), a.validate(n)
    }))
}

function initCheckboxes() {
    $(".checkbox-replace:not(.neon-cb-replacement), .radio-replace:not(.neon-cb-replacement)").each((function (t, e) {
        var a = $(e), n = a.find("input:first"), o = $('<label class="cb-wrapper" />'),
            i = $('<div class="checked" />'), s = $('<div class="checked"><i class="fa fa-check"></i></div>'),
            r = "checked", l = n.is('[type="radio"]'), c = n.attr("name");
        a.hasClass("checkbox-fa") && (i = s), a.addClass("neon-cb-replacement"), n.wrap(o), (o = n.parent()).append(i).next("label").on("click", (function (t) {
            o.click()
        })), n.on("change", (function (t) {
            l && $(".neon-cb-replacement input[type=radio][name='" + c + "']:not(:checked)").closest(".neon-cb-replacement").removeClass(r), n.is(":disabled") && o.addClass("disabled"), a[n.is(":checked") ? "addClass" : "removeClass"](r)
        })).trigger("change")
    }))
}

function initICheck() {
    $.isFunction($.fn.iCheck) && $("input.icheck").iCheck({
        checkboxClass: "icheckbox_minimal-adnium",
        radioClass: "iradio_minimal-adnium"
    })
}

function initDaterangePicker() {
    $.isFunction($.fn.daterangepicker) && $(".daterange").each((function (t, e) {
        var a = {
                Today: [moment().startOf("day"), moment().endOf("day")],
                Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                "Last 7 Days": [moment().subtract(6, "days"), moment()],
                "Last 14 Days": [moment().subtract(13, "days"), moment()],
                "Last 30 Days": [moment().subtract(29, "days"), moment()],
                "This Week": [moment().startOf("isoWeek"), moment().endOf("isoWeek")],
                "Last Week": [moment().subtract(1, "week").startOf("isoWeek"), moment().subtract(1, "week").endOf("isoWeek")],
                "This Month": [moment().startOf("month"), moment().endOf("month")],
                "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
            }, n = $(e), o = {
                format: attrDefault(n, "format", "MM/DD/YYYY"),
                timePicker: attrDefault(n, "timePicker", !1),
                timePickerIncrement: attrDefault(n, "timePickerIncrement", !1),
                timePickerSeconds: attrDefault(n, "timePickerSeconds", !1),
                separator: attrDefault(n, "separator", " - "),
                showWeekNumbers: !0,
                locale: {firstDay: 1},
                timeZone: "+0"
            }, i = attrDefault(n, "minDate", ""), s = attrDefault(n, "maxDate", ""), r = attrDefault(n, "startDate", ""),
            l = attrDefault(n, "endDate", "");
        n.hasClass("add-ranges") && (o.ranges = a), i.length && (o.minDate = i), s.length && (o.maxDate = s), r.length && (o.startDate = r), l.length && (o.endDate = l), n.daterangepicker(o, (function (t, e) {
            var a = n.data("daterangepicker");
            n.is("[data-callback]") && (n.data("startTimestamp", t.format("YYYY-MM-DD")), n.data("endTimestamp", e.format("YYYY-MM-DD")), n.trigger("input")), n.hasClass("daterange-inline") && n.find("span").html(t.format(a.format) + a.separator + e.format(a.format))
        }))
    }))
}

function initSelectBoxIt() {
    $.isFunction($.fn.selectBoxIt) && $("select.selectboxit").each((function (t, e) {
        var a = $(e), n = {
            showFirstOption: attrDefault(a, "first-option", !0),
            native: attrDefault(a, "native", !1),
            defaultText: attrDefault(a, "text", "")
        };
        a.addClass("visible"), a.selectBoxIt(n)
    }))
}

function initSelect2(t, e) {
    $.isFunction($.fn.select2) && (void 0 === t && (t = ".select2"), void 0 === e && (e = {}), $(t).each((function (t, a) {
        var n = $(a), o = {
            placeholder: attrDefault(n, "placeholder", "Select an option"),
            allowClear: attrDefault(n, "allowClear", !1),
            minimumResultsForSearch: 15,
            containerCssClass: "adnium-select2"
        };
        n.select2($.extend(o, e)), n.addClass("visible")
    })))
}

function initBootstrapWizard() {
    if ($.isFunction($.fn.bootstrapWizard)) {
        $(".form-wizard").each((function (t, e) {
            var a = $(e), n = a.find(".steps-progress div"), o = a.find("> ul > li.active").index(),
                i = function (t, e, n) {
                    if (a.hasClass("validate") && !a.valid()) return a.data("validator").focusInvalid(), !1;
                    return !0
                };
            a.bootstrapWizard({
                tabClass: "", onTabShow: function (t, e, a) {
                    !function (t, e, a, n, o) {
                        a.prevAll().addClass("completed"), a.nextAll().removeClass("completed");
                        var i = e.children().length, s = (parseInt((o + 1) / i * 100, 10), 1 / (2 * i) * 100 + "%");
                        e.find("li:first-child").hasClass("active") ? n.width(0) : n.width((o - 1) / (i - 1) * 100 + "%"), n.parent().css({
                            marginLeft: s,
                            marginRight: s
                        })
                    }(0, e, t, n, a)
                }, onNext: i, onTabClick: i
            }), a.data("bootstrapWizard").show(o)
        }))
    }
}

function initBootstrapColorpicker() {
    $.isFunction($.fn.colorpicker) && $(".colorpicker").each((function (t, e) {
        var a = $(e), n = {format: attrDefault(a, "format", !1), sliders: attrDefault(a, "sliders", {})}, o = a.next(),
            i = a.prev(), s = a.siblings(".input-group-addon").find(".color-preview");
        a.colorpicker(n), o.is(".input-group-addon") && o.has("a") && o.on("click", (function (t) {
            t.preventDefault(), a.colorpicker("show")
        })), i.is(".input-group-addon") && i.has("a") && i.on("click", (function (t) {
            t.preventDefault(), a.colorpicker("show")
        })), s.length && (a.on("changeColor", (function (t) {
            s.css("background-color", t.color.toHex())
        })), a.val().length && s.css("background-color", a.val()))
    }))
}

function initAutosize() {
    $.isFunction($.fn.autosize) && $("textarea.autogrow, textarea.autosize").autosize()
}

function blockUI(t, e) {
    t.block({
        message: e || "",
        css: {border: "none", padding: "0px", backgroundColor: "none"},
        overlayCSS: {backgroundColor: "#fff", opacity: .3, cursor: "wait"}
    })
}

function unblockUI(t) {
    t.unblock()
}

function initXEditable() {
    $.isFunction($.fn.editable) && ($.fn.editable.defaults.mode = "inline", $.fn.editable.defaults.ajaxOptions = {
        type: "POST",
        dataType: "json"
    }, $.fn.editableform.template = '<form class="form-inline editableform">   <div class="control-group">       <div>           <div class="editable-input"></div>           <div class="editable-buttons"></div>       </div>       <div class="editable-error-block"></div>   </div></form>', $.fn.editableform.buttons = '<button type="submit" class="btn btn-primary btn-sm editable-submit"><i class="fa fa-check"></i></button><button type="button" class="btn btn-danger btn-sm editable-cancel"><i class="fa fa-times"></i></button>', $.fn.editableform.loading = '<div class="editableform-loading"></div>')
}

function continueWrappingPanelTables() {
    var t = jQuery(".panel-body.with-table + table");
    t.length && (t.wrap('<div class="panel-body with-table"></div>'), continueWrappingPanelTables())
}

function fitMainContentHeight() {
    var t = jQuery;
    if (siteUIVars.$sidebarMenu.length && 0 == siteUIVars.$sidebarMenu.hasClass("fixed")) {
        if (siteUIVars.$sidebarMenu.css("min-height", ""), siteUIVars.$mainContent.css("min-height", ""), isxs()) {
            if ("undefined" != typeof reset_mail_container_height) return void reset_mail_container_height();
            if ("undefined" != typeof fit_calendar_container_height) return void reset_calendar_container_height()
        }
        siteUIVars.$sidebarMenu.outerHeight(), siteUIVars.$mainContent.outerHeight();
        var e = t(document).height(), a = t(window).height();
        if (a > e && (e = a), siteUIVars.$horizontalMenu.length > 0) {
            var n = siteUIVars.$horizontalMenu.outerHeight();
            e -= n, n
        }
        siteUIVars.$mainContent.css("min-height", e), siteUIVars.$sidebarMenu.css("min-height", e), siteUIVars.$chat.css("min-height", e), "undefined" != typeof fit_mail_container_height && fit_mail_container_height(), "undefined" != typeof fit_calendar_container_height && fit_calendar_container_height()
    }
}

function setupHorizontalMenu() {
    var t = jQuery, e = siteUIVars.$horizontalMenu.find(".navbar-nav"), a = e.find("li:has(ul)"),
        n = siteUIVars.$horizontalMenu.find("li#search"), o = (n.find(".search-input"), n.find("form"), "root-level"),
        i = e.hasClass("multiple-expanded"),
        s = {submenu_open_delay: .5, submenu_open_easing: Sine.easeInOut, submenu_opened_class: "opened"};
    e.find("> li").addClass(o), a.each((function (a, n) {
        var r = t(n), l = r.find("> a"), c = r.find("> ul");
        r.addClass("has-sub"), setupHorizontalMenuHover(r, c), l.click((function (a) {
            if (isxs()) {
                if (a.preventDefault(), !i && r.hasClass(o)) e.find(".root-level").not(r).find("> ul").each((function (e, a) {
                    var n = t(a);
                    menuDoCollapse(n, n.parent(), s)
                }));
                if (r.hasClass(s.submenu_opened_class)) menuDoCollapse(c, r, s); else c.is(":visible") || menuDoExpand(c, r, s);
                fitMainContentHeight()
            }
        }))
    }))
}

function setupHorizontalMenuHover(t, e) {
    var a = Quad.easeInOut;
    TweenMax.set(e, {css: {autoAlpha: 0, transform: "translateX(-10px)"}});
    try {
        t.hoverIntent({
            over: function () {
                if (isxs()) return !1;
                "none" == e.css("display") && e.css({
                    display: "block",
                    visibility: "hidden"
                }), e.css({zIndex: ++siteUIVars.hover_index}), TweenMax.to(e, .5, {
                    css: {
                        autoAlpha: 1,
                        transform: "translateX(0px)"
                    }, ease: a
                })
            }, out: function () {
                if (isxs()) return !1;
                TweenMax.to(e, .5, {
                    css: {autoAlpha: 0, transform: "translateX(-10px)"},
                    ease: a,
                    onComplete: function () {
                        TweenMax.set(e, {css: {transform: "translateX(-10px)"}}), e.css({display: "none"})
                    }
                })
            }, timeout: 300, interval: 50
        })
    } catch (t) {
    }
}

function menuDoExpand(t, e, a) {
    t.addClass("visible").height(""), current_height = t.outerHeight();
    var n = {opacity: .2, height: 0, top: -20}, o = {height: current_height, opacity: 1, top: 0};
    isxs() && (delete n.opacity, delete n.top, delete o.opacity, delete o.top), TweenMax.set(t, {css: n}), e.addClass(a.submenu_opened_class), TweenMax.to(t, a.submenu_open_delay, {
        css: o,
        ease: a.submenu_open_easing,
        onComplete: function () {
            e.addClass("active"), t.attr("style", ""), fitMainContentHeight()
        }
    })
}

function menuDoCollapse(t, e, a) {
    e.removeClass(a.submenu_opened_class), TweenMax.to(t, a.submenu_open_delay, {
        css: {height: 0, opacity: .2},
        ease: a.submenu_open_easing,
        onComplete: function () {
            $(".root-level").removeClass("active"), t.removeClass("visible"), fitMainContentHeight()
        }
    })
}

function menuSetActiveClassToParents(t) {
    if (t.length) {
        var e = t.parent().parent();
        e.addClass("active"), e.hasClass("root-level") || menuSetActiveClassToParents(e)
    }
}

function setupMobileMenu() {
    siteUIVars.$horizontalMenu.find(".horizontal-mobile-menu a").on("click", (function (t) {
        t.preventDefault();
        var e = siteUIVars.$horizontalMenu.find(".navbar-nav");
        $(this).hasClass("with-animation") ? e.stop().slideToggle("normal", (function () {
            e.attr("height", "auto"), "none" == e.css("display") && e.attr("style", "")
        })) : e.toggle()
    }))
}

function toggleButtonLoading(t, e, a) {
    if (void 0 === e || void 0 === a || void 0 === t) return !1;
    !0 === t ? e.prop("disabled", "disabled").html('<div class="loader"><div class="loader-inner ball-clip-rotate"><div class="small"></div></div></div>') : e.removeProp("disabled").html(a)
}

function ajaxReq(t, e, a, n, o) {
    return n = void 0 !== n ? n : "JSON", o = o || {}, $.ajax($.extend(!0, {}, {
        type: e,
        url: a,
        data: t,
        dataType: n,
        success: function (t) {
            null != t && void 0 !== t.redirect && (window.location = "/" + t.redirect)
        }
    }, o))
}

function initNotifications() {
    $("#notifications_scroller").niceScroll(), $("#notifications_scroller li div").on("click", (function (t) {
        t.preventDefault();
        var e = $(this);
        e.parent().hasClass("unread") && ajaxReq({noteid: e.attr("href")}, "POST", "/classes/notifications.class.php").done((function (t) {
            if (t > 0) {
                var a = parseInt($("li.unread").length) - 1;
                e.closest("li").removeClass("unread"), e.closest("li").find(" span strong").contents().unwrap(), 0 != a ? $("#notification-counter, #note-num").text(a) : ($("a.dropdown-toggle span.badge-info").fadeOut(), $("#note-num").text(a))
            }
        })), t.stopPropagation()
    })), $("#notifications_scroller li div a").on("click", (function (t) {
        window.open($(this).attr("href"))
    })), $("#mark-all").on("click", (function (t) {
        t.preventDefault(), $("#notifications_scroller li").hasClass("unread") && ajaxReq({noteid: "all"}, "POST", "/classes/notifications.class.php").done((function (t) {
            t > 0 && ($("#notifications_scroller li").removeClass("unread"), $("#notifications_scroller li div span strong").contents().unwrap(), $("#note-num").text("0"), $("span#notification-counter").text("0").fadeOut())
        })), t.stopPropagation()
    })), new ThemeHandler
}

$(document).ready((function () {
    var t, e;
    siteUIVars.$body = $("body"), siteUIVars.$pageContainer = siteUIVars.$body.find(".page-container"), siteUIVars.$horizontalMenu = siteUIVars.$pageContainer.find("header.navbar"), siteUIVars.$sidebarMenu = siteUIVars.$pageContainer.find(".sidebar-menu"), siteUIVars.$mainMenu = siteUIVars.$sidebarMenu.find("#main-menu"), siteUIVars.$mainContent = siteUIVars.$pageContainer.find(".main-content"), siteUIVars.$sidebarUserEnv = siteUIVars.$sidebarMenu.find(".sidebar-user-info"), siteUIVars.$sidebarUser = siteUIVars.$sidebarUserEnv.find(".user-link"), t = function (t) {
        if (t) return {
            "data-toggle": "tooltip",
            "data-placement": "top",
            "data-html": "true",
            "data-original-title": t,
            "data-title": t
        }
    }, e = function (t, e) {
        var a = " " + (void 0 === (e = e || {}).roundless || e.roundless ? "badge-roundless" : ""),
            n = " " + (void 0 === e.fullWidth || e.fullWidth ? "col-md-12" : "");
        return $("<div/>").append($("<div/>", {
            class: "badge badge-" + t.class + a + n,
            html: t.tooltip ? t.name + '&nbsp;&nbsp;<i class="fa fa-info-circle fa-12"></i>' : t.name
        }).attr(t.tooltip || {})).html()
    }, SiteUIStatus = {
        generate: function (t) {
            return e(t, {})
        }, getCampaignStatus: function (a, n, o) {
            a = parseInt(a) || 0, n = n || {}, o = o || !1;
            var i = {
                0: {name: "Deleted", class: "danger", tooltip: ""},
                1: {name: "Active", class: "success", tooltip: ""},
                2: {name: "Paused", class: "secondary", tooltip: ""},
                3: {name: "Stopped", class: "danger", tooltip: ""},
                4: {name: "Blocked", class: "danger", tooltip: ""},
                5: {name: "Locked", class: "info", tooltip: "Contact " + COMPANY.NAME_SHORT + " Staff"},
                6: {name: "Exceeded", class: "info", tooltip: "Campaigns daily budget reached"},
                7: {name: "No Funds", class: "danger", tooltip: "Reload your account to start these campaigns again!"},
                8: {name: "Paused", class: "secondary", tooltip: "You have no banners running in this campaign"},
                9: {
                    name: "Pending",
                    class: "notice",
                    tooltip: "You have " + n.unapproved_banners + " unapproved banner(s)"
                }
            };
            return parseInt(n.unapproved_banners) > 0 ? a = 9 : 0 == parseInt(n.approved_banners) && 0 !== a && (a = 8), void 0 !== n.status && "object" === _typeof(n.status) && $.extend(!0, i, n.status), !0 === o ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a], n), i[a] || i[0])
        }, getBannerStatus: function (a, n, o) {
            a = parseInt(a) || 0, o = o || !1;
            var i = {
                0: {name: "Deleted", class: "danger", tooltip: ""},
                1: {name: "Active", class: "success", tooltip: ""},
                2: {name: "Paused", class: "notice", tooltip: ""},
                3: {name: "Pending", class: "notice", tooltip: ""},
                4: {name: "Blocked", class: "info", tooltip: ""},
                6: {name: "Pending", class: "notice", tooltip: ""}
            };
            return void 0 !== (n = n || {}).status && "object" === _typeof(n.status) && $.extend(!0, i, n.status), !0 === o ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a]), i[a] || i[0])
        }, getSiteStatus: function (a, n, o) {
            a = parseInt(a) || 0, o = o || !1;
            var i = {
                0: {name: "Deleted", class: "danger", tooltip: ""},
                1: {name: "Active", class: "success", tooltip: ""},
                2: {name: "Disabled", class: "danger", tooltip: ""},
                3: {name: "Pending", class: "notice", tooltip: ""},
                4: {name: "Blocked", class: "danger", tooltip: ""},
                5: {name: "First Site", class: "info", tooltip: ""}
            };
            return void 0 !== (n = n || {}).status && "object" === _typeof(n.status) && $.extend(!0, i, n.status), !0 === o ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a]), i[a] || i[0])
        }, getZoneStatus: function (a, n, o, i) {
            a = parseInt(a) || 0, i = i || !1;
            var s = {};
            return s = void 0 !== o && o ? {
                0: {name: "Deleted", class: "danger", tooltip: ""},
                1: {name: "Active", class: "success", tooltip: ""},
                2: {name: "Paused", class: "notice", tooltip: ""},
                3: {name: "Active", class: "success", tooltip: ""},
                4: {name: "Blocked", class: "danger", tooltip: ""},
                5: {name: "Pending", class: "notice", tooltip: ""}
            } : {
                0: {name: "Deleted", class: "danger", tooltip: ""},
                1: {name: "Active", class: "success", tooltip: ""},
                2: {name: "Paused", class: "notice", tooltip: ""},
                3: {
                    name: "Reviewing",
                    class: "info",
                    tooltip: "Your zone is activated.<br>You may put the code on-site at your earliest convenience"
                },
                4: {name: "Blocked", class: "danger", tooltip: ""},
                5: {name: "Pending", class: "notice", tooltip: ""}
            }, void 0 !== (n = n || {}).status && "object" === _typeof(n.status) && $.extend(!0, s, n.status), !0 === i ? s[a] : (s[a].tooltip = t(s[a].tooltip), s[a].html = e(s[a]), s[a] || s[0])
        }, getCardStatus: function (a, n, o) {
            a = parseInt(a) || 0, o = o || !1;
            var i = {
                0: {name: "Deleted", class: "danger", tooltip: ""},
                1: {name: "Approved", class: "success", tooltip: ""},
                2: {name: "Pending Approval", class: "notice", tooltip: ""},
                3: {name: "Pending Approval", class: "notice", tooltip: ""}
            };
            return void 0 !== (n = n || {}).status && "object" === _typeof(n.status) && $.extend(!0, i, n.status), !0 === o ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a]), i[a] || i[0])
        }, getDealStatus: function (a, n, o) {
            a = parseInt(a) || 0, o = o || !1;
            var i = {
                0: {name: "Deleted", class: "danger", tooltip: ""},
                1: {name: "Fulfilling", class: "success", tooltip: ""},
                2: {name: "Paused", class: "notice", tooltip: ""},
                3: {name: "Pending", class: "notice", tooltip: ""},
                4: {name: "Refunded", class: "danger", tooltip: ""},
                5: {name: "Fulfilled", class: "info", tooltip: ""},
                6: {name: "Pending Refund", class: "notice", tooltip: ""},
                7: {name: "Pending Renew", class: "notice", tooltip: ""},
                8: {name: "Waiting", class: "info", tooltip: ""}
            };
            return void 0 !== (n = n || {}).status && "object" === _typeof(n.status) && $.extend(!0, i, n.status), !0 === o ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a], n), i[a] || i[0])
        }, getDealProposalStatus: function (a, n, o) {
            a = parseInt(a) || 0, o = o || !1;
            var i = {
                1: {name: "Accepted", class: "success", tooltip: ""},
                2: {name: "Rejected", class: "danger", tooltip: ""},
                3: {name: "Pending", class: "notice", tooltip: ""}
            };
            return void 0 !== (n = n || {}).status && "object" === _typeof(n.status) && $.extend(!0, i, n.status), !0 === o ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a], n), i[a] || i[0])
        }, getRenewalStatus: function (a, n, o) {
            a = parseInt(a) || 0, o = o || !1;
            var i = {
                1: {name: "Accepted", class: "success", tooltip: ""},
                2: {name: "Rejected", class: "danger", tooltip: ""},
                3: {name: "Pending (Sales)", class: "notice", tooltip: "A sales rep initiated renewal request"},
                4: {name: "Renewed", class: "info", tooltip: ""},
                5: {name: "Error'd", class: "danger", tooltip: ""},
                6: {name: "Pending (User)", class: "notice", tooltip: "An advertiser initiated renewal request"},
                105: {name: "Not Renewing", class: "danger", tooltip: "visual flag marked by sales."}
            };
            return void 0 !== (n = n || {}).status && "object" === _typeof(n.status) && $.extend(!0, i, n.status), !0 === o ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a], n), i[a] || i[0])
        }, getProductStatus: function (a, n, o) {
            a = parseInt(a) || 0, o = o || !1;
            var i = {
                0: {name: "Deleted", class: "danger", tooltip: ""},
                1: {name: "Available", class: "notice", tooltip: ""},
                2: {name: "Sold", class: "success", tooltip: ""},
                3: {name: "Expired", class: "info", tooltip: ""}
            };
            return void 0 !== (n = n || {}).status && "object" === _typeof(n.status) && $.extend(!0, i, n.status), !0 === o ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a], n), i[a] || i[0])
        }, getBlogPostStatus: function (a, n, o) {
            a = parseInt(a) || 0, o = o || !1;
            var i = {
                0: {name: "Deleted", class: "danger", tooltip: ""},
                1: {name: "Published", class: "success", tooltip: "Published posts are shown to the public"},
                2: {name: "Unpublished", class: "info", tooltip: "Unpublished posts can only be viewed by staff"}
            };
            return void 0 !== (n = n || {}).status && "object" === _typeof(n.status) && $.extend(!0, i, n.status), !0 === o ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a], n), i[a] || i[0])
        }, getGeneralStatus: function (a, n, o) {
            a = parseInt(a) || 0, o = o || !1;
            var i = {
                0: {name: "Disabled", class: "danger", tooltip: ""},
                1: {name: "Enabled", class: "success", tooltip: ""}
            };
            return "simple" in (n = n || {}) && !0 === n.simple && (i[0].name = "No", i[1].name = "Yes"), "links" in n && !0 === n.links && (i[0].name = "Unlinked", i[1].name = "Linked"), void 0 !== n.status && "object" === _typeof(n.status) && $.extend(!0, i, n.status), !0 === o ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a]), i[a] || i[0])
        }
    }, SiteUITypes = function () {
        var t = function (t) {
            if (t) return {"data-toggle": "tooltip", "data-placement": "top", "data-original-title": t, "data-title": t}
        }, e = function (t) {
            return $("<div/>").append($("<div/>", {
                class: "badge badge-" + t.class + " badge-roundless col-md-12",
                html: t.tooltip ? t.name + '&nbsp;&nbsp;<i class="fa fa-info-circle fa-12"></i>' : t.name
            }).attr(t.tooltip || {})).html()
        };
        return {
            getPayoutType: function (a, n, o) {
                a = parseInt(a) || 0, n = n || {};
                var i = {
                    1: {name: "Wire", class: "", tooltip: ""},
                    2: {name: "Paxum", class: "", tooltip: ""},
                    5: {name: "Payoneer", class: "", tooltip: ""}
                };
                return !0 === (o = o || !1) ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a]), i[a] || i[0])
            }, getStreamType: function (a, n, o) {
                a = parseInt(a) || 0, n = n || {};
                var i = {
                    0: {name: "Adult", class: "success", tooltip: ""},
                    1: {name: "Mainstream", class: "info", tooltip: ""}
                };
                return !0 === (o = o || !1) ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a]), i[a] || i[0])
            }, getTrafficType: function (a, n, o) {
                a = parseInt(a) || 0, n = n || {};
                var i = {
                    0: {name: "N/A", class: "default", tooltip: ""},
                    1: {name: "All", class: "info", tooltip: ""},
                    2: {name: "Desktop", class: "info", tooltip: ""},
                    3: {name: "Mobile", class: "info", tooltip: ""}
                };
                return !0 === (o = o || !1) ? i[a] : (i[a].tooltip = t(i[a].tooltip), i[a].html = e(i[a]), i[a] || i[0])
            }
        }
    }(), (SiteUIHelpers = new SiteUIHelpers).init(), $(".modal").detach().appendTo(".page-container"), setupHorizontalMenu(), setupMobileMenu(), fitMainContentHeight(), initNotifications(), initTypeahead(), initInputMask(), initFormValidate(), initCheckboxes(), initICheck(), initDaterangePicker(), initSelectBoxIt(), initSelect2(), initBootstrapWizard(), initBootstrapColorpicker(), initAutosize(), $(".panel-heading").each((function (t, e) {
        var a = $(e), n = a.next("table");
        isCollapsible = a.find('a[data-rel="collapse"]').length, n.wrap('<div class="panel-body with-table"></div>'), (n = a.next(".with-table").next("table")).wrap('<div class="panel-body with-table"></div>'), isCollapsible && (a.css({cursor: "pointer"}), a.on("click", (function (t) {
            t.preventDefault();
            var e = $(this), a = e.closest(".panel"), n = a.children(".panel-body, .table"),
                o = !a.hasClass("panel-collapse");
            a.is('[data-collapsed="1"]') && (a.attr("data-collapsed", 0), n.hide(), o = !1), o ? (n.slideUp("normal", fitMainContentHeight), a.addClass("panel-collapse"), e.find("i").removeClass().addClass("entypo-down-open")) : (n.slideDown("normal", fitMainContentHeight), a.removeClass("panel-collapse"), e.find("i").removeClass().addClass("entypo-up-open"))
        })))
    })), continueWrappingPanelTables(), $("body").on("click", '.panel > .panel-heading > .panel-options > a[data-rel="reload"]', (function (t) {
        t.preventDefault();
        var e = jQuery(this).closest(".panel");
        blockUI(e), e.addClass("reloading"), setTimeout((function () {
            unblockUI(e), e.removeClass("reloading")
        }), 900)
    })).on("click", '.panel > .panel-heading > .panel-options > a[data-rel="close"]', (function (t) {
        t.preventDefault();
        var e = $(this).closest(".panel"), a = new TimelineLite({
            onComplete: function () {
                e.slideUp((function () {
                    e.remove()
                }))
            }
        });
        a.append(TweenMax.to(e, .2, {css: {scale: .95}})), a.append(TweenMax.to(e, .5, {
            css: {
                autoAlpha: 0,
                transform: "translateX(100px) scale(.95)"
            }
        }))
    })), $(".tile-stats, .tile-progress").each((function (t, e) {
        var a = $(e).find(".num"), n = attrDefault(a, "start", 0), o = attrDefault(a, "end", 0),
            i = attrDefault(a, "prefix", ""), s = attrDefault(a, "postfix", ""), r = attrDefault(a, "duration", 1e3),
            l = attrDefault(a, "delay", 1e3), c = attrDefault(a, "precision", 2);
        if (n < o) if ("undefined" == typeof scrollMonitor) a.html(i + o + s); else {
            var u = scrollMonitor.create(e);
            u.fullyEnterViewport((function () {
                var t = {curr: n};
                TweenLite.to(t, r / 1e3, {
                    curr: o, ease: Power1.easeInOut, delay: l / 1e3, onUpdate: function () {
                        a.html(i + number_format(Math.round(100 * t.curr) / 100, c) + s)
                    }
                }), u.destroy()
            }))
        }
    })), $('[data-toggle="popover"]').each((function (t, e) {
        var a = $(e), n = attrDefault(a, "placement", "right"), o = attrDefault(a, "trigger", "click"),
            i = a.hasClass("popover-secondary") ? "popover-secondary" : a.hasClass("popover-primary") ? "popover-primary" : a.hasClass("popover-default") ? "popover-default" : "";
        a.popover({placement: n, trigger: o}), a.on("shown.bs.popover", (function (t) {
            a.next().addClass(i)
        }))
    })), $('[data-toggle="tooltip"]').each((function (t, e) {
        var a = $(e), n = attrDefault(a, "html", !1), o = attrDefault(a, "placement", "top"),
            i = attrDefault(a, "trigger", "hover"),
            s = a.hasClass("tooltip-secondary") ? "tooltip-secondary" : a.hasClass("tooltip-primary") ? "tooltip-primary" : a.hasClass("tooltip-default") ? "tooltip-default" : "";
        a.tooltip({html: "true" === n.toString(), placement: o, trigger: i}), a.on("shown.bs.tooltip", (function (t) {
            a.next().addClass(s)
        }))
    })), $(document).on("click", ".dropdown-menu.dropdown-menu-form", (function (t) {
        t.stopPropagation()
    }));
    var a = document.createElement("div");
    a.innerHTML = "&nbsp;", a.id = "ads", a.className = "adsbox", document.body.appendChild(a), window.setTimeout((function () {
        if (0 === a.offsetHeight) {
            if (window.self !== window.top) {
                var t = window.self.document.getElementById("ads");
                return void (null !== t && "object" === _typeof(t) && t.remove())
            }
            toastr.error("Please turn off Adblock or whitelist " + SITEURLS.DOMAIN, null, {closeButton: !0})
        }
        a.remove()
    }), 350)
})), initXEditable(), $.isFunction($.fn.hashchange) && window.location.pathname.indexOf("/admin/settings") >= 0 && $((function () {
    function t() {
        var t = $("a[href=" + window.location.hash.replace("/", "") + "]");
        t && t.tab("show")
    }

    t(), $(window).hashchange((function (e) {
        t()
    })), $('a[data-toggle="tab"], a[data-toggle="pill"]').on("shown.bs.tab", (function () {
        window.location.hash = "/" + $(this).attr("href").replace("#", "")
    }))
})), function (t) {
    var e = [];
    t(document).ajaxSend((function (t, a, n) {
        e.push(a)
    })), t(document).ajaxComplete((function (a, n, o) {
        e = t.grep(e, (function (t) {
            return t != n
        }))
    }));
    var a = window.onbeforeunload;
    window.onbeforeunload = function () {
        var n = a ? a() : void 0;
        return null == n && t.each(e, (function (t, e) {
            e.abort()
        })), n
    }
}(jQuery), SiteUIHelpers = function () {
    var t = !1, e = !1;
    return {
        CDN_URL: SITEURLS.CDN, init: function () {
            this.Cookies.init(), this.LocalStorage.init()
        }, shrink: function (t, e, a, n, o) {
            void 0 === e && (e = "10em"), -1 === e.toString().indexOf("%") && (e += "em");
            var i = "";
            return void 0 !== a && !0 === a && (o ? i = this.tooltip(n || t, null, o) : t = this.tooltip(n || t, null, o)), '<div class="dt_ellipses" style="vertical-align:middle;text-overflow:ellipsis;max-width:' + e + '" ' + i + ">" + t + "</div>"
        }, link: function (t, e, a) {
            var n = "";
            return void 0 !== a && (n = 'target="_blank"'), '<a href="' + t + '" ' + n + ">" + (e || t) + "</a>"
        }, linkTo: function (t, e, a) {
            return '<a href="'.concat(t, '" target="').concat(a, '">').concat(e || t, "</a>")
        }, tooltip: function (t, e, a) {
            return void 0 !== e && null != e || (e = "top"), void 0 === a || !1 === a ? '<span data-toggle="tooltip" data-placement="' + e + '" data-original-title="' + t + '" data-title="" style="cursor:pointer">' + t + "</span>" : 'data-toggle="tooltip" data-placement="' + e + '" data-original-title="' + t + '" data-title=""'
        }, pad: function (t, e, a) {
            return void 0 === e ? t : a ? (t + e).slice(-t.length) : (e + t).substring(0, t.length)
        }, currency: function (t, e) {
            var a = void 0 !== e ? e : 3;
            return "$" + (t && !isNaN(t) ? parseFloat(t).format(a) : (0).format(a))
        }, percentage: function (t, e) {
            var a = void 0 !== e ? e : 3;
            return (isNaN(t) ? (0).format(a) : parseFloat(t).format(a)) + "%"
        }, calcCtr: function (t, e, a) {
            return number_format(t / (e || 1) * 100, 2) + (void 0 === a || a ? "%" : "")
        }, calcCPM: function (t, e) {
            return e > 0 ? t / (e / 1e3) : 0
        }, calcBidIncrements: function (t) {
            t = "number" != typeof t ? parseFloat(t) : t;
            var e, a = parseFloat(t.toFixed(3)), n = a, o = .001, i = !0;
            switch (!0) {
                case a >= 10 && a < 25:
                    o = .1;
                    break;
                case a >= 25 && a < 75:
                    o = .25;
                    break;
                case a >= 75 && a < 100:
                    o = .5;
                    break;
                case a >= 100:
                    o = 1
            }
            if (e = 1 / o, n = Math.ceil(a * e) / e, !(i = Number.isInteger(a * e % e)) && 1e3 === e) {
                var s = a * e % e, r = Math.round(s);
                i = Math.abs(s - r) < o
            }
            return {bid: a.toFixed(3), bidIncr: n.toFixed(3), step: o.toFixed(2), valid: i}
        }, arrayRotate: function (t, e) {
            return e ? t.push(t.shift()) : t.unshift(t.pop()), t
        }, sortByDate: function (t) {
            return t.sort((function (t, e) {
                return new Date(t.created) - new Date(e.created)
            })), t
        }, makeActions: function (t) {
            var e;
            return e = $("<ul>", {class: "dropdown-menu", role: "menu"}), $.each(t, (function (t, a) {
                var n = {class: "clickable " + (a.class || ""), href: a.link, "data-id": a.data || ""};
                void 0 !== a.target && (n["data-toggle"] = "modal", n["data-target"] = a.target), $("<li>").append($("<a>", n).append($("<i>", {class: a.icon}), "&nbsp;", a.text)).appendTo(e)
            })), $("<div>", {class: "btn-group actions"}).append($("<button>", {
                class: "btn btn-default btn-xs dropdown-toggle",
                type: "button",
                "data-toggle": "dropdown"
            }).append($("<i>", {class: "fa fa-asterisk"}), "&nbsp;&nbsp;", $("<i>", {class: "fa fa-caret-down"})), e)[0].outerHTML
        }, formatFooter: function (t, e) {
            $.each(e, (function (e, a) {
                var n = t.column(a.idx, {filter: "applied"}).data(), o = 0;
                switch (a.total = 0, $.each(n, (function (t, e) {
                    var n = 0;
                    "string" == typeof e && (e = e.replace(/,/g, "").replace(/\$/g, "")), n = 0 == a.f ? parseInt(e) : parseFloat(e), n = isNaN(n) ? 0 : n, a.total += n, o++
                })), a.ln = o, a.f) {
                    case 0:
                    default:
                        a.fmt = function (t) {
                            return parseFloat(t.total).format()
                        };
                        break;
                    case 1:
                        a.fmt = function (t) {
                            return "$" + parseFloat(t.total).format(3)
                        };
                        break;
                    case 2:
                        a.fmt = function (t) {
                            return "$" + parseFloat(t.total / t.ln || 0).format(3)
                        };
                        break;
                    case 3:
                        a.fmt = function (t) {
                            return "modifier" in t && t.modifier.length >= 2 ? (parseInt(t.modifier[0]) / parseInt(t.modifier[1]) * 100).format(2) + "%" : parseFloat(t.total / t.ln || 0).format(2) + "%"
                        };
                        break;
                    case 4:
                        a.fmt = function (t) {
                            return "$" + parseFloat(t.modifier[0] / (t.modifier[1] / 1e3)).format(3)
                        };
                        break;
                    case 5:
                        a.fmt = function (t) {
                            return parseFloat(t.total).format(2) + "%"
                        }
                }
            })), $.each(e, (function (a, n) {
                void 0 !== n.e && 0 != n.e.length && (n.modifier = [], $.each(n.e, (function (t, a) {
                    $.each(e, (function (t, e) {
                        if (e.idx == a) return n.modifier.push(e.total), !1
                    }))
                }))), $(t.column(n.idx).footer()).html(n.fmt(n))
            }))
        }, formatBytes: function (t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
            if (0 === t) return "0 Bytes";
            var a = 1024, n = e < 0 ? 0 : e, o = ["Bytes", "KB", "MB", "GB", "TB"],
                i = Math.floor(Math.log(t) / Math.log(a));
            return parseFloat((t / Math.pow(a, i)).toFixed(n)) + " " + o[i]
        }, Validate: {
            email: function (t) {
                return !!/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t)
            }, url: function (t) {
                return !!/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(t)
            }
        }, Cookies: {
            init: function () {
                try {
                    $.cookie(), t = !0
                } catch (t) {
                    console.warn(t)
                }
            }, status: function () {
                return t
            }, get: function (t) {
                try {
                    return JSON.parse($.cookie(t) || "false")
                } catch (t) {
                    console.warn(t)
                }
            }, set: function (t, e, a) {
                try {
                    $.cookie(t, JSON.stringify(e), a)
                } catch (t) {
                    console.warn(t)
                }
            }, delete: function (t) {
                try {
                    $.removeCookie(t)
                } catch (t) {
                    console.warn(t)
                }
            }
        }, LocalStorage: {
            init: function () {
                void 0 !== ("undefined" == typeof Storage ? "undefined" : _typeof(Storage)) && void 0 !== window.localStorage && (e = !0)
            }, status: function () {
                return e
            }, get: function (t) {
                try {
                    return JSON.parse(localStorage.getItem(t))
                } catch (t) {
                    console.warn(t)
                }
            }, set: function (t, e) {
                try {
                    localStorage.setItem(t, JSON.stringify(e))
                } catch (t) {
                    console.warn(t)
                }
            }, delete: function (t) {
                try {
                    localStorage.removeItem(t)
                } catch (t) {
                    console.warn(t)
                }
            }
        }
    }
};
var ThemeHandler = function () {
    this.selector = $("#theme-selection"), this.last = this.selector.val(), this.nav = $("#header-navbar"), this.onChange = function () {
        var t = this;
        this.selector.on("change", (function () {
            ajaxReq({theme: $(this).val()}, "POST", "/classes/theme.php").done((function (e) {
                e && e.theme && (t.selector.val(e.theme), t.nav.hasClass(e.theme) || (t.nav.removeClass(t.last).addClass(e.theme), t.last = e.theme))
            }))
        }))
    }, this.constructor = function () {
        this.onChange()
    }, this.constructor()
};

function round(t, e) {
    return Number(Math.round(t + "e" + e) + "e-" + e)
}

function addCommas(t) {
    return t ? t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"
}

function number_format(t, e, a, n) {
    t = (t + "").replace(/[^0-9+\-Ee.]/g, "");
    var o = isFinite(+t) ? +t : 0, i = isFinite(+e) ? Math.abs(e) : 0, s = void 0 === n ? "," : n,
        r = void 0 === a ? "." : a, l = "";
    return l = (i ? function (t, e) {
        var a = Math.pow(10, e);
        return "" + (Math.round(t * a) / a).toFixed(e)
    }(o, i) : "" + Math.round(o)).split("."), l[0].length > 3 && (l[0] = l[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, s)), (l[1] || "").length < i && (l[1] = l[1] || "", l[1] += new Array(i - l[1].length + 1).join("0")), l.join(r)
}

function array_values(t) {
    var e = [], a = "";
    if (t && "object" === _typeof(t) && t.change_key_case) return t.values();
    for (a in t) e[e.length] = t[a];
    return e
}

function convertToCSV(t) {
    var e = "object" != _typeof(t) ? JSON.parse(t) : t, a = "", n = "", o = Object.keys(e[0]);
    for (var i in o) "" != n && (n += ","), n += o[i];
    a += n + "\r\n";
    for (var s = 0; s < e.length; s++) {
        var r = "";
        for (var i in e[s]) "" != r && (r += ","), r += e[s][i];
        a += r + "\r\n"
    }
    return a
}

function parse_url(t, e) {
    for (var a = this.php_js && this.php_js.ini || {}, n = a["phpjs.parse_url.mode"] && a["phpjs.parse_url.mode"].local_value || "php", o = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"], i = {
        php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }, s = i[n].exec(t), r = {}, l = 14; l--;) s[l] && (r[o[l]] = s[l]);
    if (e) return r[e.replace("PHP_URL_", "").toLowerCase()];
    if ("php" !== n) {
        var c = a["phpjs.parse_url.queryKey"] && a["phpjs.parse_url.queryKey"].local_value || "queryKey";
        i = /(?:^|&)([^&=]*)=?([^&]*)/g, r[c] = {}, (r[o[12]] || "").replace(i, (function (t, e, a) {
            e && (r[c][e] = a)
        }))
    }
    return delete r.source, r
}

function empty(t) {
    var e, a, n, o = [undefined, null, !1, 0, "", "0"];
    for (a = 0, n = o.length; a < n; a++) if (t === o[a]) return !0;
    if ("object" === _typeof(t)) {
        for (e in t) return !1;
        return !0
    }
    return !1
}

function attrDefault(t, e, a) {
    return void 0 !== t.data(e) ? t.data(e) : a
}

function replaceAll(t, e, a) {
    return a.replace(new RegExp(t, "g"), e)
}

String.prototype.hash = function () {
    var t, e, a = 0;
    if (0 === this.length) return a;
    for (t = 0, e = this.length; t < e; t++) a = (a << 5) - a + this.charCodeAt(t), a &= 268435455;
    return a
}, Number.prototype.format = function (t, e, a, n) {
    var o = "\\d(?=(\\d{" + (e || 3) + "})+" + (t > 0 ? "\\D" : "$") + ")", i = this.toFixed(Math.max(0, ~~t));
    return (n ? i.replace(".", n) : i).replace(new RegExp(o, "g"), "$&" + (a || ","))
}, String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}, String.prototype.decodeEntities = function () {
    var t = document.createElement("textarea");
    return t.innerHTML = this, t.value
}, jQuery.fn.outerHTML = function () {
    return this[0] ? this[0].outerHTML : ""
}, function () {
    var t, e;
    t = this.jQuery || window.jQuery, e = t(window), t.fn.stick_in_parent = function (a) {
        var n, o, i, s, r, l, c, u, d, p, f;
        for (null == a && (a = {}), f = a.sticky_class, r = a.inner_scrolling, p = a.recalc_every, d = a.parent, u = a.offset_top, c = a.spacer, o = a.bottoming, null == u && (u = 0), null == d && (d = void 0), null == r && (r = !0), null == f && (f = "is_stuck"), n = t(document), null == o && (o = !0), i = function (a, i, s, l, m, h, g, v) {
            var b, y, $, k, w, x, C, _, I, D, S, M;
            if (!a.data("sticky_kit")) {
                if (a.data("sticky_kit", !0), w = n.height(), C = a.parent(), null != d && (C = C.closest(d)), !C.length) throw"failed to find stick parent";
                if (b = $ = !1, (S = null != c ? c && a.closest(c) : t("<div />")) && S.css("position", a.css("position")), _ = function () {
                    var t, e, o;
                    if (!v && (w = n.height(), t = parseInt(C.css("border-top-width"), 10), e = parseInt(C.css("padding-top"), 10), i = parseInt(C.css("padding-bottom"), 10), s = C.offset().top + t + e, l = C.height(), $ && (b = $ = !1, null == c && (a.insertAfter(S), S.detach()), a.css({
                        position: "",
                        top: "",
                        width: "",
                        bottom: ""
                    }).removeClass(f), o = !0), m = a.offset().top - (parseInt(a.css("margin-top"), 10) || 0) - u, h = a.outerHeight(!0), g = a.css("float"), S && S.css({
                        width: a.outerWidth(!0),
                        height: h,
                        display: a.css("display"),
                        "vertical-align": a.css("vertical-align"),
                        float: g
                    }), o)) return M()
                }, _(), h !== l) return k = void 0, x = u, D = p, M = function () {
                    var t, d, y, I;
                    if (!v && (y = !1, null != D && (0 >= --D && (D = p, _(), y = !0)), y || n.height() === w || _(), y = e.scrollTop(), null != k && (d = y - k), k = y, $ ? (o && (I = y + h + x > l + s, b && !I && (b = !1, a.css({
                        position: "fixed",
                        bottom: "",
                        top: x
                    }).trigger("sticky_kit:unbottom"))), y < m && ($ = !1, x = u, null == c && ("left" !== g && "right" !== g || a.insertAfter(S), S.detach()), t = {
                        position: "",
                        width: "",
                        top: ""
                    }, a.css(t).removeClass(f).trigger("sticky_kit:unstick")), r && (t = e.height(), h + u > t && !b && (x -= d, x = Math.max(t - h, x), x = Math.min(u, x), $ && a.css({top: x + "px"})))) : y > m && ($ = !0, (t = {
                        position: "fixed",
                        top: x
                    }).width = "border-box" === a.css("box-sizing") ? a.outerWidth() + "px" : a.width() + "px", a.css(t).addClass(f), null == c && (a.after(S), "left" !== g && "right" !== g || S.append(a)), a.trigger("sticky_kit:stick")), $ && o && (null == I && (I = y + h + x > l + s), !b && I))) return b = !0, "static" === C.css("position") && C.css({position: "relative"}), a.css({
                        position: "absolute",
                        bottom: i,
                        top: "auto"
                    }).trigger("sticky_kit:bottom")
                }, I = function () {
                    return _(), M()
                }, y = function () {
                    if (v = !0, e.off("touchmove", M), e.off("scroll", M), e.off("resize", I), t(document.body).off("sticky_kit:recalc", I), a.off("sticky_kit:detach", y), a.removeData("sticky_kit"), a.css({
                        position: "",
                        bottom: "",
                        top: "",
                        width: ""
                    }), C.position("position", ""), $) return null == c && ("left" !== g && "right" !== g || a.insertAfter(S), S.remove()), a.removeClass(f)
                }, e.on("touchmove", M), e.on("scroll", M), e.on("resize", I), t(document.body).on("sticky_kit:recalc", I), a.on("sticky_kit:detach", y), setTimeout(M, 0)
            }
        }, s = 0, l = this.length; s < l; s++) a = this[s], i(t(a));
        return this
    }
}.call(this), window.logger = {
    log: function () {
        var t;
        window.debug && (t = console).log.apply(t, arguments)
    }, warn: function () {
        var t;
        window.debug && (t = console).warn.apply(t, arguments)
    }, time: function (t) {
        window.debug && console.time(t)
    }, timeEnd: function (t) {
        window.debug && console.timeEnd(t)
    }
};
