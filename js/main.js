!
function(t) {
    t.fn.DB_tabMotionBanner = function(n) {
        var e = {
            key: "",
            autoRollingTime: "",
            motion: ""
        };
        return t.extend(e, n),
        this.each(function() {
            function n() {
                a(),
                o(),
                s(),
                d()
            }
            function a() {
                c.css({
                    position: "relative"
                }),
                f.css({
                    position: "absolute"
                });
                for (var t = 0; p > t; t++) t == y ? f.eq(t).show() : f.eq(t).hide();
                for (var t = 0; t < f.length; t++) for (var n = f.eq(t).find("p"), a = 0; a < n.length; a++) {
                    var o = n.eq(a),
                    i = e.motion[o.attr("class")];
                    if (null != i) {
                        var s = o.css("left"),
                        l = o.css("top");
                        o.data({
                            x2: s,
                            y2: l,
                            x1: i.left,
                            y1: i.top,
                            opacity: i.opacity,
                            speed: i.speed,
                            delay: null == i.delay ? 0 : i.delay
                        })
                    }
                }
            }
            function o() {
                u.bind("hover",
                function() {
                    t(this).index() != y && (y = t(this).index(), l())
                }),
                r.bind("mouseenter",
                function() {
                    clearInterval(v)
                }),
                r.bind("mouseleave",
                function() {
                    s()
                })
            }
            function i() {
                y = ++y % p,
                d()
            }
            function s() {
                v = setInterval(i, e.autoRollingTime)
            }
            function l() {
                for (var t = $(".banner li p").not($(".db1_7")).not($(".db3_5")), n = 0; n < t.length; n++) {
                    var a = t.eq(n),
                    o = e.motion[a.attr("class")];
                    null != o && a.stop().css({
                        left: o.left,
                        top: o.top,
                        opacity: "0"
                    })
                }
                d()
            }
            function d() {
                $(".banner li p").not($(".db1_7")).not($(".db3_5")).hide();
                for (var n = f.eq(y).find("p"), a = 0; a < n.length; a++) {
                    var o = n.eq(a),
                    i = e.motion[o.attr("class")];
                    null != i && (o.css(t.browser.msie && t.browser.version < 9 ? {
                        left: o.data("x1"),
                        top: o.data("y1"),
                        opacity: 1,
                        display: "none"
                    }: {
                        left: o.data("x1"),
                        top: o.data("y1"),
                        opacity: o.data("opacity")
                    }), o.stop().delay(o.data("delay")).queue(function() {
                        t(this).css("display", "block"),
                        t(this).dequeue()
                    }).animate({
                        left: o.data("x2"),
                        top: o.data("y2"),
                        opacity: 1
                    },
                    o.data("speed")))
                }
                f.hide().eq(y).show(),
                u.removeClass("active").eq(y).addClass("active")
            }
            var r = t(this),
            c = r.find(".DB_imgSet"),
            f = r.find(".DB_imgSet li"),
            u = (r.find(".num"), r.find(".num span")),
            p = f.length,
            y = 0,
            v = 0;
            n()
        })
    }
} (jQuery);