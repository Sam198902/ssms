google.maps.__gjsload__('map', function (_) {
    var rx = function (a, b, c, d, e, f, g) {
            var h = new _.cu;
            _.du(h, a, b);
            null != c && _.gu(h, c, 0, d);
            g && g.forEach(function (a) {
                return _.iu(h, a)
            });
            e && _.v(e, function (a) {
                _.Hj(_.es(_.Zs(h.b)), a)
            });
            f && _.ju(h, f);
            return h.b
        }, sx = function (a, b, c, d, e, f, g, h, l, n, q, r, u, A) {
            _.Xg.call(this);
            this.B = a;
            this.l = b;
            this.projection = c;
            this.maxZoom = d;
            this.tileSize = new _.I(256, 256);
            this.name = e;
            this.alt = f;
            this.G = g;
            this.heading = A;
            this.F = _.jb(A);
            this.Ec = h;
            this.fb = l;
            this.na = n;
            this.f = null;
            this.D = q;
            this.m = r;
            this.C = u;
            this.nd = !0;
            this.j = _.Kd({})
        }, tx = function (a,
                          b, c, d, e, f, g, h, l) {
            var n = [];
            if (e) {
                var q = new _.gm;
                _.hm(q, e);
                n.push(q)
            }
            e = new _.gm;
            _.hm(e, 37);
            _.Yk(_.im(e), "smartmaps");
            n.push(e);
            return {ta: rx(a, b, c, d, n, f, l), tb: g, scale: h}
        }, ux = function (a) {
            this.data = a || []
        }, vx = function (a, b, c, d, e) {
            sx.call(this, a.B, a.l, a.projection, a.maxZoom, a.name, a.alt, a.G, a.Ec, a.fb, a.na, a.D, a.m, a.C, a.heading);
            this.l && this.j.set(tx(this.m, this.C, this.na, this.D, this.fb, b, c, d, e))
        }, wx = function (a) {
            var b = Math.round(1E7 * a);
            return 0 > a ? b + 4294967296 : b
        }, xx = function (a, b) {
            a = _.ce(new _.Gj(a.f.data[7]),
                0).slice();
            return _.Fl(a, function (a) {
                return a + "deg=" + b + "&"
            })
        }, yx = function (a, b) {
            return _.am(a.get("projection"), b, a.get("zoom"), a.get("offset"), a.get("center"))
        }, zx = function (a, b) {
            for (var c = a.length, d = _.Ga(a) ? a.split("") : a, e = 0; e < c; e++)if (e in d && !b.call(void 0, d[e], e, a))return !1;
            return !0
        }, Ax = function (a, b, c, d, e) {
            e = void 0 === e ? {} : e;
            this.Y = a;
            this.zoom = b;
            this.f = c;
            this.b = d.slice(0);
            this.j = e.ab || _.Ba
        }, Bx = function (a) {
            var b = this;
            this.tileSize = a[0].tileSize;
            this.Ka = a[0].Ka;
            this.Jb = a[0].Jb;
            this.b = a;
            this.bc = a[0].bc;
            zx(a, function (a) {
                return a.tileSize.b(b.tileSize) && a.Ka == b.Ka
            })
        }, Cx = function (a) {
            switch (a.na) {
                case "roadmap":
                    return "Otm";
                case "satellite":
                    return "Otk";
                case "hybrid":
                    return "Oth";
                case "terrain":
                    return "Otr"
            }
            return a instanceof _.Yg ? "Ots" : "Oto"
        }, Dx = function (a, b) {
            if (!a)return null;
            var c = !0, d = a.tileSize, e = a.Ka;
            _.v(b, function (a) {
                if (!a)return null;
                c = c && d.b(a.tileSize) && e == a.nd
            });
            if (!c)return null;
            if (0 == b.length)return a;
            var f = [];
            _.v(b, function (a) {
                if (!a)return null;
                f.push(a instanceof _.Xg ? a.b() : new _.Au(a))
            });
            return new Bx([a].concat(f))
        }, Gx = function (a, b) {
            var c = null, d = null, e = null;
            return function (f, g) {
                if (d == f && e == g)return c;
                d = f;
                e = g;
                _.v(f, function (b) {
                    b && a(Cx(b))
                });
                c = null;
                g instanceof _.Xg ? c = g.b() : g && (c = new _.Au(g));
                (f = Dx(c, f)) ? (c = f, b && Ex(b)) : b && Fx(b);
                return c
            }
        }, Jx = function (a, b) {
            this.j = a;
            this.f = b;
            this.P = [_.x.bind(b, "insert_at", this, this.l), _.x.bind(b, "remove_at", this, this.m), _.x.bind(b, "set_at", this, this.B)];
            this.b = [];
            var c = this;
            this.f.forEach(function (a) {
                a = Hx(c, a);
                c.b.push(a)
            });
            Ix(this)
        }, Ix = function (a) {
            _.v(a.b,
                function (a, c) {
                    a.set("zIndex", c)
                })
        }, Hx = function (a, b) {
            var c = new _.Cu(a.j, null);
            c.bindTo("size", a);
            c.bindTo("zoom", a);
            c.bindTo("offset", a);
            c.bindTo("projectionBounds", a);
            _.Fu(c, b);
            c.listener = b && _.x.forward(c, "tilesloaded", b);
            return c
        }, Kx = function (a) {
            a.release();
            a.listener && (_.x.removeListener(a.listener), delete a.listener)
        }, Lx = function (a, b) {
            this.j = a;
            this.f = b;
            _.x.bind(this, "tilesloaded", this, this.l);
            this.b = null
        }, Ex = function (a) {
            a.b && (a.b.ja(), a.b.unbindAll(), a.b = null)
        }, Fx = function (a) {
            a.b || (a.b = new Jx(a.j,
                a.f), a.b.bindTo("size", a), a.b.bindTo("zoom", a), a.b.bindTo("offset", a), a.b.bindTo("projectionBounds", a))
        }, Mx = function (a, b) {
            for (var c = 0, d = a.f, e = a.b, f = 0, g; g = b[f++];)if (a.intersects(g)) {
                var h = g.f, l = g.b;
                if (_.Rj(g, a))return 1;
                g = e.contains(l.b) && l.contains(e.b) && !_.hd(e, l) ? _.id(l.b, e.f) + _.id(e.b, l.f) : _.id(e.contains(l.b) ? l.b : e.b, e.contains(l.f) ? l.f : e.f);
                c += g * (Math.min(d.b, h.b) - Math.max(d.f, h.f))
            }
            return c /= _.kd(d) * _.gd(e)
        }, Ox = function (a, b, c, d, e, f) {
            this.Y = a.Y;
            this.zoom = a.zoom;
            this.b = a;
            this.j = _.Fl(b || [], function (a) {
                return a.replace(/&$/,
                    "")
            });
            this.B = c;
            this.l = d;
            this.f = e;
            this.m = f || null;
            Nx(this)
        }, Nx = function (a) {
            for (var b = 2 == a.f || 4 == a.f ? a.f : 1, b = Math.min(1 << a.zoom, b), c = a.B && 4 != b, d = a.zoom, e = b; 1 < e; e /= 2)d--;
            if (e = a.l(new _.G(a.Y.x, a.Y.y), a.zoom)) d = _.Ok(_.Ok(_.Ok(new _.Ik(_.lu(a.j, e)), "x", e.x), "y", e.y), "z", d), 1 != b && _.Ok(d, "w", 256 / b), c && (b *= 2), 1 != b && _.Ok(d, "scale", b), a.b.setUrl(d.toString(), a.m)
        }, Px = function (a, b) {
            var c = a.x, d = a.y;
            switch (b) {
                case 90:
                    a.x = d;
                    a.y = 256 - c;
                    break;
                case 180:
                    a.x = 256 - c;
                    a.y = 256 - d;
                    break;
                case 270:
                    a.x = 256 - d, a.y = c
            }
        }, Qx = function (a) {
            this.j =
                a;
            this.b = null;
            this.set("idle", !0)
        }, Vx = function (a) {
            if (!a)return "";
            var b = [];
            a = _.sm(a);
            for (var c = a.next(); !c.done; c = a.next()) {
                var d = c.value, e = d.elementType, f = d.stylers, c = [], d = (d = d.featureType) && Rx[d.toLowerCase()];
                (d = null != d ? d : null) && c.push("s.t:" + d);
                (e = e && Sx[e.toLowerCase()] || null) && c.push("s.e:" + e);
                if (f)for (f = _.sm(f), d = f.next(); !d.done; d = f.next()) {
                    a:{
                        e = void 0;
                        d = d.value;
                        for (e in d) {
                            var g = d[e], h = e && Tx[e.toLowerCase()] || null;
                            if (h && (_.jb(g) || _.lb(g) || _.mb(g)) && g) {
                                "color" == e && Ux.test(g) && (g = "#ff" + g.substr(1));
                                e = "p." + h + ":" + g;
                                break a
                            }
                        }
                        e = void 0
                    }
                    e && c.push(e)
                }
                (c = c.join("|")) && b.push(c)
            }
            b = b.join(",");
            return 1E3 >= b.length ? b : ""
        }, Wx = function (a, b, c, d, e) {
            this.f = a;
            a = _.Yt(this, "apistyle");
            var f = _.Yt(this, "authUser"), g = _.Yt(this, "baseMapType"), h = _.Yt(this, "scale"), l = _.Yt(this, "tilt");
            this.b = null;
            var n = (0, _.p)(this.gk, this);
            b = new _.kt([a, f, b, g, h, l], n);
            _.Wt(this, "tileMapType", b);
            this.l = _.Kd([]);
            a = (0, _.p)(this.jn, this, c);
            _.x.bind(c, "insert_at", this, a);
            _.x.bind(c, "remove_at", this, a);
            _.x.bind(c, "set_at", this, a);
            a();
            this.B =
                new _.kt([this.l, b], Gx(e, d))
        }, Zx = function (a, b, c, d, e, f, g, h, l, n) {
            this.H = a;
            this.l = g;
            this.W = e;
            this.f = f;
            this.D = h;
            this.F = c;
            this.b = b;
            this.B = d;
            this.m = this.j = 0;
            _.x.T(this.b, "contextmenu", this, this.Tf);
            a = new _.Pv(this.b);
            _.x.bind(a, "mousewheel", this, this.fe);
            a.bindTo("enabled", this, "scrollwheel");
            n = {Al: _.pm(_.en, this.H), ra: this.f.get("eventCapturer"), fd: this.f.get("panBlock"), mode: n};
            l = new _.xu(this.b, !0, n, l);
            Xx(this, l);
            Yx(this, l);
            l.bindTo("draggable", this);
            l.bindTo("draggingCursor", this);
            l.bindTo("draggableCursor",
                this);
            _.x.forward(this.l, "forceredraw", this.H);
            _.x.forward(this.l, "tilesloaded", this.H)
        }, $x = function (a) {
            var b = a.get("zoom"), c;
            c = b;
            var d = a.get("zoomRange");
            d && (c = _.dv(d, c));
            b != c && a.set("zoom", c)
        }, Xx = function (a, b) {
            _.x.bind(b, "click", a, a.Fi);
            _.x.bind(b, "dblclick", a, a.Yl);
            _.x.bind(b, "mousedown", a, a.Gi);
            _.v(["mouseover", "mousemove", "mouseout", "mousedown", "mouseup"], function (c) {
                _.x.addListener(b, c, (0, _.p)(a.Zd, a, c))
            });
            var c = new _.Kv(b);
            c.bindTo("disabled", a, "disablePanMomentum");
            var d = a.f.get("mouseEventTarget");
            _.v(["movestart", "move", "moveend"], function (b) {
                _.x.addListener(d, b, function (c) {
                    ay(a, b, c)
                });
                _.x.addListener(c, b, function (c) {
                    ay(a, b, c)
                })
            });
            _.x.forward(b, "mousedown", a.l);
            _.x.addListener(d, "mousewheel", (0, _.p)(a.fe, a))
        }, ay = function (a, b, c) {
            c && (c.latLng = a.W.fromContainerPixelToLatLng(c.ca));
            _.x.trigger(a.f, b, c);
            c && _.Dt(c) || _.x.trigger(a.l, b, c)
        }, Yx = function (a, b) {
            _.x.addListener(b, "movestart", (0, _.p)(function () {
                _.x.trigger(this.H, "dragstart")
            }, a));
            _.x.addListener(b, "move", (0, _.p)(function () {
                _.x.trigger(this.H,
                    "drag")
            }, a));
            _.x.addListener(b, "moveend", (0, _.p)(function () {
                _.x.trigger(this.H, "dragend")
            }, a))
        }, by = function (a, b) {
            this.j = a;
            this.l = b
        }, cy = function () {
            var a = !1;
            return function (b, c) {
                if (b && c) {
                    if (.999999 > Mx(b, c))return a = !1;
                    b = _.$l(b, (_.Mw - 1) / 2);
                    return .999999 < Mx(b, c) ? a = !0 : a
                }
            }
        }, dy = function () {
            return function (a, b) {
                if (a && b)return .9 <= Mx(a, b)
            }
        }, ey = _.na("b"), fy = function (a) {
            var b = window.document.createElement("div");
            _.hk(b);
            _.Qk(b, 0);
            a.appendChild(b);
            this.set("div", b)
        }, gy = function (a, b, c, d) {
            function e() {
                if (!g.b && !g.f) {
                    var n =
                        c.get(), q = b.get("center"), r = b.get("zoom");
                    null != r && q && n && n.width && n.height && (c.removeListener(e), h.remove(), l.remove(), d.size = n.width + "x" + n.height, d.hadviewport = f, g.f = q, g.m = r, g.b = _.Rf("map2", {
                        startTime: f ? a : void 0,
                        Cm: d
                    }))
                }
            }

            this.H = b;
            this.j = {};
            this.m = this.f = this.b = null;
            this.l = !1;
            var f = !0, g = this, h = b.addListener("center_changed", e), l = b.addListener("zoom_changed", e);
            c.addListener(e);
            e();
            f = !1
        }, hy = function (a, b, c) {
            !a.b || a.j[b] || a.l || (a.f.b(a.H.get("center")) && a.m == a.H.get("zoom") ? (a.j[b] = !0, c.call(a)) : a.l = !0)
        }, iy = function (a, b) {
            hy(a, "staticmap", function () {
                var a = {staticmap: b};
                hy(this, "firstpixel", function () {
                    a.firstpixel = b
                });
                hy(this, "allpixels", function () {
                    a.allpixels = b
                });
                _.Pf(this.b, a)
            })
        }, ky = function (a) {
            var b = {};
            b.firstmap = jy;
            b.hdpi = 1 < _.Zl();
            b.mob = !_.R.C;
            b.staticmap = a;
            return b
        }, ly = function (a, b) {
            this.tileSize = a.tileSize;
            this.Ka = !0;
            this.f = a;
            this.b = b;
            this.Jb = _.lj;
            this.bc = !1
        }, my = function (a, b, c, d, e, f, g, h) {
            this.tileSize = b;
            this.l = c;
            this.b = a || [];
            this.B = b;
            this.j = d;
            this.C = e;
            this.f = f;
            this.m = g;
            this.Ka = !0;
            this.bc = !1;
            this.Jb = h
        }, ny = function (a, b) {
            this.j = b || new _.Yf;
            this.b = new _.pd(a % 360, 45);
            this.l = new _.G(0, 0);
            this.f = !0
        }, oy = function () {
            var a = new ey(dy()), b = {};
            b.obliques = new ey(cy());
            b.report_map_issue = a;
            return b
        }, py = function (a) {
            var b = new Qx(300);
            b.bindTo("input", a, "bounds");
            _.x.addListener(b, "idle_changed", function () {
                b.get("idle") && _.x.trigger(a, "idle")
            })
        }, qy = function (a) {
            if (a && _.Ck(a.getDiv()) && (_.Dk() || _.Rk())) {
                _.en(a, "Tdev");
                var b = window.document.querySelector('meta[name="viewport"]');
                (b = b && b.content) && b.match(/width=device-width/) &&
                _.en(a, "Mfp")
            }
        }, ry = function (a, b) {
            function c() {
                var c = b.get("baseMapType");
                if (c)switch (c.na) {
                    case "roadmap":
                        _.en(a, "Tm");
                        break;
                    case "satellite":
                        c.F && _.en(a, "Ta");
                        _.en(a, "Tk");
                        break;
                    case "hybrid":
                        c.F && _.en(a, "Ta");
                        _.en(a, "Th");
                        break;
                    case "terrain":
                        _.en(a, "Tr");
                        break;
                    default:
                        _.en(a, "To")
                }
            }

            c();
            _.x.addListener(b, "basemaptype_changed", c)
        }, ty = function (a, b, c) {
            _.ab(_.ph, function (d, e) {
                b.set(e, sy(a, e, {Ck: c}))
            })
        }, uy = function (a, b) {
            this.b = a;
            this.f = b
        }, vy = function (a) {
            var b = this;
            this.b = a;
            a.addListener(function () {
                return b.notify("style")
            })
        },
        wy = function (a, b) {
            function c(c) {
                var d = b.getAt(c);
                if (d instanceof _.Yg) {
                    c = d.get("styles");
                    var f = Vx(c);
                    d.b = function () {
                        var b = sy(a, d.f);
                        return (new vx(b, f, null, null, null)).b()
                    }
                }
            }

            _.x.addListener(b, "insert_at", c);
            _.x.addListener(b, "set_at", c);
            b.forEach(function (a, b) {
                return c(b)
            })
        }, xy = function (a, b, c) {
            if ((_.Dk() || _.Rk()) && !_.Pk()) {
                _.en(b, "Mmni");
                var d = window.setInterval(function () {
                    var e;
                    e = a.b.getBoundingClientRect();
                    if (e = !(0 >= e.top - 5 && 0 >= e.left - 5 && e.height + 5 >= window.document.body.scrollHeight && e.width + 5 >= window.document.body.scrollWidth)) e =
                        a.b.getBoundingClientRect(), e = 0 >= e.top - 5 && 0 >= e.left - 5 && e.bottom + 5 >= window.innerHeight && e.right + 5 >= window.innerWidth && "greedy" == c.get();
                    e && (_.en(b, "Mmus"), window.clearInterval(d))
                }, 1E3)
            }
        }, yy = _.na("b"), Ay = function (a) {
            var b;
            b = (b = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection || null) && b.type;
            _.en(a, "Nt", b && zy[b] || "-na")
        }, Cy = function () {
            By(this)
        }, By = function (a) {
            var b = new _.cv(a.get("minZoom") || 0, a.get("maxZoom") || 30), c = a.get("mapTypeMinZoom"), d = a.get("mapTypeMaxZoom"),
                e = a.get("trackerMaxZoom");
            _.jb(c) && (b.min = Math.max(b.min, c));
            _.jb(e) ? b.max = Math.min(b.max, e) : _.jb(d) && (b.max = Math.min(b.max, d));
            a.set("zoomRange", b)
        }, Dy = function () {
            this.B = new _.fg;
            this.l = {};
            this.j = {}
        }, Ey = _.ma(), Fy = _.ma(), Gy = function (a, b) {
            var c = a.__gm, d = a.mapTypes, e = a.__gm;
            b = new Lx(b, a.overlayMapTypes);
            b.bindTo("size", e);
            b.bindTo("zoom", e);
            b.bindTo("offset", e);
            b.bindTo("projectionBounds", e);
            _.x.forward(a, "tilesloaded", b);
            d = new Wx(d, c.b, a.overlayMapTypes, b, _.pm(_.en, a));
            d.bindTo("heading", a);
            d.bindTo("mapTypeId",
                a);
            _.xg[23] && d.bindTo("scale", a);
            d.bindTo("apistyle", c);
            d.bindTo("authUser", c);
            d.bindTo("tilt", c);
            return d
        }, Hy = function (a, b) {
            _.x.Ga(window, "resize", a);
            _.x.forward(a, "resize", b);
            _.x.bind(b, "resize", this, this.b);
            this.f = b;
            this.b()
        }, Iy = function (a, b, c, d, e, f, g, h) {
            var l = c.__gm, n = new Zx(c, a, b, !!c.U, e, l, d, g, (0, _.p)(f.b, f), h);
            n.bindTo("draggingCursor", c);
            n.bindTo("draggableMap", c, "draggable");
            _.x.addListener(c, "zoom_changed", function () {
                n.get("zoom") != c.get("zoom") && n.set("zoom", c.get("zoom"))
            });
            n.set("zoom",
                c.get("zoom"));
            n.bindTo("disablePanMomentum", c);
            n.bindTo("projectionTopLeft", e);
            n.bindTo("draggableCursor", l, "cursor");
            d.bindTo("zoom", n);
            e.bindTo("zoom", n);
            return n
        }, Jy = function (a, b, c, d) {
            return d ? new by(a, function () {
                    return b
                }) : _.xg[23] ? new by(a, function (a) {
                        var d = c.get("scale");
                        return 2 == d || 4 == d ? b : a
                    }) : a
        }, Ky = function (a, b) {
            var c = a.__gm;
            b = new fy(b);
            b.bindTo("center", a);
            b.bindTo("projectionBounds", c);
            b.bindTo("offset", c);
            return b
        }, Ly = function () {
            var a, b = new _.y;
            b.bounds_changed = function () {
                var c = b.get("bounds");
                c ? a && _.Bj(a, c) || (a = _.Xf(c.I - 512, c.J - 512, c.L + 512, c.M + 512), b.set("boundsQ", a)) : b.set("boundsQ", c)
            };
            return b
        }, My = function (a, b, c, d) {
            var e = new gy(a, b, c, ky(!!d));
            jy = !1;
            d && _.Pj(d, function g(a) {
                a && (d.removeListener(g), iy(e, a))
            });
            _.x.addListenerOnce(b, "tilesloaded", (0, _.p)(e.C, e));
            return e
        }, Ny = _.na("b"), Oy = function (a, b, c) {
            var d = _.Ej(), e = _.Ff(_.Q);
            this.H = b;
            this.b = c;
            this.j = new _.Yf;
            this.f = _.Df(e);
            this.l = _.Ef(e);
            this.B = _.M(d, 14);
            this.m = _.M(d, 15);
            this.C = new _.$t(a, d, e)
        }, Py = function (a, b, c, d) {
            d = void 0 === d ? {ua: null} :
                d;
            var e = _.jb(d.heading), f = ("hybrid" == b && !e || "terrain" == b || "roadmap" == b) && 0 != d.Zj, g = d.ua;
            return "satellite" == b ? (a = e ? xx(a.C, d.heading || 0) : _.ce(new _.Gj(a.C.f.data[1]), 0).slice(), e = new _.Tg(e ? 45 : 0, d.heading || 0), new my(a, new _.I(256, 256), "\u62b1\u6b49\uff0c\u6b64\u5904\u65e0\u56fe\u50cf\u3002", window.document, f && 1 < _.Zl(), _.uu(d.heading), g && g.scale || null, e)) : new _.tu(_.au(a.C), new _.I(256, 256), "\u62b1\u6b49\uff0c\u6b64\u5904\u65e0\u56fe\u50cf\u3002", window.document, f && 1 < _.Zl(), _.uu(d.heading), c, g, d.heading)
        },
        Qy = function (a) {
            function b(a, b) {
                if (!b || !b.ta)return b;
                var c = [];
                _.uj(c, b.ta.data);
                c = new _.rs(c);
                _.hm(_.es(_.Zs(c)), a);
                return {scale: b.scale, tb: b.tb, ta: c}
            }

            return function (c) {
                var d = Py(a, "roadmap", a.b, {
                    Zj: !1,
                    ua: b(3, c.ua().get())
                }), e = Py(a, "roadmap", a.b, {ua: b(18, c.ua().get())}), d = new Bx([d, e]);
                c = Py(a, "roadmap", a.b, {ua: c.ua().get()});
                return new ly(d, c)
            }
        }, Ry = function (a) {
            return function (b) {
                var c = b.ua().get(), d = Py(a, "satellite", null, {heading: b.heading, ua: c});
                b = Py(a, "hybrid", a.b, {heading: b.heading, ua: c});
                return new Bx([d,
                    b])
            }
        }, Sy = function (a, b) {
            return new sx(Ry(a), a.b, _.Ha(b) ? new ny(b) : a.j, _.Ha(b) ? 21 : 22, "\u6df7\u5408", "\u663e\u793a\u5e26\u6709\u8857\u9053\u540d\u79f0\u7684\u56fe\u50cf", _.sw.hybrid, "m@" + a.B, 50, "hybrid", a.m, a.f, a.l, b)
        }, Ty = function (a) {
            return function (b) {
                return Py(a, "satellite", null, {heading: b.heading, ua: b.ua().get()})
            }
        }, Uy = function (a, b) {
            var c = _.Ha(b);
            return new sx(Ty(a), null, _.Ha(b) ? new ny(b) : a.j, c ? 21 : 22, "\u536b\u661f\u56fe\u50cf", "\u663e\u793a\u536b\u661f\u56fe\u50cf", c ? "a" : _.sw.satellite, null, null,
                "satellite", a.m, a.f, a.l, b)
        }, Vy = function (a, b) {
            return function (c) {
                return Py(a, b, a.b, {ua: c.ua().get()})
            }
        }, sy = function (a, b, c) {
            c = void 0 === c ? {} : c;
            var d = [0, 90, 180, 270];
            if ("hybrid" == b)for (b = Sy(a), b.f = {}, d = _.sm(d), c = d.next(); !c.done; c = d.next())c = c.value, b.f[c] = Sy(a, c); else if ("satellite" == b)for (b = Uy(a), b.f = {}, d = _.sm(d), c = d.next(); !c.done; c = d.next())c = c.value, b.f[c] = Uy(a, c); else b = "roadmap" == b && 1 < _.Zl() && c.Ck ? new sx(Qy(a), a.b, a.j, 22, "\u5730\u56fe", "\u663e\u793a\u8857\u9053\u5730\u56fe", _.sw.roadmap, "m@" + a.B,
                    47, "roadmap", a.m, a.f, a.l, void 0) : "terrain" == b ? new sx(Vy(a, "terrain"), a.b, a.j, 21, "\u5730\u5f62", "\u663e\u793a\u5e26\u5730\u5f62\u7684\u8857\u9053\u5730\u56fe", _.sw.terrain, "r@" + a.B, 63, "terrain", a.m, a.f, a.l, void 0) : new sx(Vy(a, "roadmap"), a.b, a.j, 22, "\u5730\u56fe", "\u663e\u793a\u8857\u9053\u5730\u56fe", _.sw.roadmap, "m@" + a.B, 47, "roadmap", a.m, a.f, a.l, void 0);
            return b
        }, Wy = _.ma();
    _.rm(sx, _.Xg);
    sx.prototype.b = function () {
        return this.B(this)
    };
    sx.prototype.ua = _.ra(17);
    sx.prototype.ua = _.yj(17, _.oa("j"));
    _.fg.prototype.b = _.yj(12, function (a) {
        _.Fd(this.P, function (b) {
            b(a)
        })
    });
    _.dg.prototype.wg = _.yj(7, function (a, b) {
        var c = _.Wl(), d = this.l, e, f, g = b.za && _.wj(b.za);
        if (this.b) e = this.b, f = this.j; else if ("mouseout" == a || g) f = e = null; else {
            for (var h = 0; (e = d[h++]) && !(f = e.b(b, !1)););
            if (!f && c)for (h = 0; (e = d[h++]) && !(f = e.b(b, !0)););
        }
        if (e != this.f || f != this.m) this.f && this.f.handleEvent("mouseout", b, this.m), this.f = e, this.m = f, e && e.handleEvent("mouseover", b, f);
        if (!e)return !!g;
        if ("mouseover" == a || "mouseout" == a)return !1;
        e.handleEvent(a, b, f);
        return !0
    });
    _.t(ux, _.L);
    ux.prototype.getTile = function () {
        return new _.fs(this.data[1])
    };
    _.rm(vx, sx);
    Ax.prototype.sa = _.oa("f");
    Ax.prototype.yb = function () {
        return zx(this.b, function (a) {
            return a.yb()
        })
    };
    Ax.prototype.release = function () {
        for (var a = _.sm(this.b), b = a.next(); !b.done; b = a.next())b.value.release();
        this.j()
    };
    Ax.prototype.freeze = function () {
        for (var a = _.sm(this.b), b = a.next(); !b.done; b = a.next())b.value.freeze()
    };
    Bx.prototype.Ca = function (a, b, c) {
        function d() {
            c.Za && g.yb() && c.Za()
        }

        c = void 0 === c ? {} : c;
        var e = _.Hk(window.document, "DIV"), f = _.Fl(this.b, function (c, f) {
            c = c.Ca(a, b, {Za: d});
            var g = c.sa();
            g.style.position = "absolute";
            g.style.zIndex = f;
            e.appendChild(g);
            return c
        }), g = new Ax(a, b, e, f, {ab: c.ab});
        return g
    };
    var Tx = {
        hue: "h",
        saturation: "s",
        lightness: "l",
        gamma: "g",
        invert_lightness: "il",
        visibility: "v",
        color: "c",
        weight: "w"
    }, Ux = /^#[0-9a-fA-F]{6}$/, Rx = {
        all: 0,
        administrative: 1,
        "administrative.country": 17,
        "administrative.province": 18,
        "administrative.locality": 19,
        "administrative.neighborhood": 20,
        "administrative.land_parcel": 21,
        poi: 2,
        "poi.business": 33,
        "poi.government": 34,
        "poi.school": 35,
        "poi.medical": 36,
        "poi.attraction": 37,
        "poi.place_of_worship": 38,
        "poi.sports_complex": 39,
        "poi.park": 40,
        road: 3,
        "road.highway": 49,
        "road.highway.controlled_access": 785,
        "road.arterial": 50,
        "road.local": 51,
        transit: 4,
        "transit.line": 65,
        "transit.station": 66,
        "transit.station.rail": 1057,
        "transit.station.bus": 1058,
        "transit.station.airport": 1059,
        "transit.station.ferry": 1060,
        landscape: 5,
        "landscape.man_made": 81,
        "landscape.natural": 82,
        "landscape.natural.landcover": 1313,
        "landscape.natural.terrain": 1314,
        water: 6
    }, Sx = {
        all: "",
        geometry: "g",
        "geometry.fill": "g.f",
        "geometry.stroke": "g.s",
        labels: "l",
        "labels.icon": "l.i",
        "labels.text": "l.t",
        "labels.text.fill": "l.t.f",
        "labels.text.stroke": "l.t.s"
    };
    _.t(Jx, _.y);
    Jx.prototype.ja = function () {
        _.v(this.b, function (a) {
            Kx(a)
        }, this);
        this.b.length = 0;
        _.v(this.P, function (a) {
            a.remove()
        })
    };
    Jx.prototype.l = function (a) {
        var b = this.b, c = Hx(this, this.f.getAt(a));
        b.splice(a, 0, c);
        Ix(this)
    };
    Jx.prototype.m = function (a) {
        var b = this.b;
        Kx(b[a]);
        b.splice(a, 1);
        Ix(this)
    };
    Jx.prototype.B = function (a) {
        Kx(this.b[a]);
        var b = Hx(this, this.f.getAt(a));
        b.set("zIndex", a);
        this.b[a] = b
    };
    var Xy = [{ce: 108.25, be: 109.625, ee: 49, de: 51.5}, {ce: 109.625, be: 109.75, ee: 49, de: 50.875}, {
        ce: 109.75,
        be: 110.5,
        ee: 49,
        de: 50.625
    }, {ce: 110.5, be: 110.625, ee: 49, de: 49.75}];
    _.t(Lx, _.y);
    Lx.prototype.l = function () {
        this.b || this.f.forEach(function (a) {
            a && _.x.trigger(a, "tilesloaded")
        })
    };
    var jy = !0;
    Ox.prototype.sa = function () {
        return this.b.sa()
    };
    Ox.prototype.yb = function () {
        return this.b.yb()
    };
    Ox.prototype.release = function () {
        this.b.release()
    };
    Ox.prototype.freeze = function () {
        this.b.freeze()
    };
    var zy = {bluetooth: "-b", cellular: "-c", ethernet: "-e", none: "-n", wifi: "-wf", wimax: "-wm", other: "-o"};
    _.t(Qx, _.y);
    Qx.prototype.input_changed = function () {
        this.get("idle") && this.set("idle", !1);
        this.b && window.clearTimeout(this.b);
        this.b = window.setTimeout((0, _.p)(this.f, this), this.j)
    };
    Qx.prototype.f = function () {
        this.b = null;
        this.set("idle", !0)
    };
    _.t(Wx, _.y);
    _.k = Wx.prototype;
    _.k.mapTypeId_changed = function () {
        var a = this.get("mapTypeId");
        this.od(a)
    };
    _.k.heading_changed = function () {
        var a = this.get("heading");
        if (_.Ha(a)) {
            var b = _.eb(90 * Math.round(a / 90), 0, 360);
            a != b ? this.set("heading", b) : (a = this.get("mapTypeId"), this.od(a))
        }
    };
    _.k.tilt_changed = function () {
        var a = this.get("mapTypeId");
        this.od(a)
    };
    _.k.jn = function (a) {
        var b = [];
        a.forEach(function (a) {
            b.push(a)
        });
        this.l.set(b)
    };
    _.k.setMapTypeId = function (a) {
        this.od(a);
        this.set("mapTypeId", a)
    };
    _.k.od = function (a) {
        var b = this.get("heading") || 0, c = this.f.get(a), d = this.get("tilt");
        if (d && c && c instanceof sx && c.f && c.f[b]) c = c.f[b]; else if (0 == d && 0 != b) {
            this.set("heading", 0);
            return
        }
        c && c == this.m || (this.j && (_.x.removeListener(this.j), this.j = null), b = (0, _.p)(this.od, this, a), a && (this.j = _.x.addListener(this.f, a.toLowerCase() + "_changed", b)), c && c instanceof _.Yg ? (a = c.f, this.set("styles", c.get("styles")), this.set("baseMapType", this.f.get(a))) : (this.set("styles", null), this.set("baseMapType", c)), this.set("maxZoom",
            c && c.maxZoom), this.set("minZoom", c && c.minZoom), this.m = c)
    };
    _.k.gk = function (a, b, c, d, e, f) {
        if (void 0 == f)return null;
        if (d instanceof sx) {
            a = new vx(d, a, b, e, c);
            if (b = this.b instanceof vx)if (b = this.b, b == a) b = !0; else if (b && a) {
                if (c = b.heading == a.heading && b.projection == a.projection && b.Ec == a.Ec) {
                    b = b.j.get();
                    c = a.j.get();
                    if (b == c) b = !0; else if (b && c) {
                        if (d = b.scale == c.scale && b.tb == c.tb) b.ta == c.ta ? b = !0 : b.ta && c.ta ? (c = c.ta, b = _.Td(b.ta.data, c ? c.data : null)) : b = !1, d = b;
                        b = d
                    } else b = !1;
                    c = b
                }
                b = c
            } else b = !1;
            b || (this.b = a)
        } else this.b = d;
        return this.b
    };
    _.t(Zx, _.y);
    _.k = Zx.prototype;
    _.k.zoom_changed = function () {
        $x(this)
    };
    _.k.zoomRange_changed = function () {
        $x(this)
    };
    _.k.Tf = function (a) {
        var b = _.Cl();
        300 >= b - this.m ? (this.m = 0, this.get("disableDoubleClickZoom") || this.fe(_.dn(a, this.b), -1)) : (this.m = b, this.Zd("rightclick", a));
        _.tb(a);
        _.ub(a);
        this.C = !0
    };
    _.k.Yl = function (a) {
        1 < a.button || _.wj(a) || (this.Zd("dblclick", a), _.wj(a) || (this.j = 0, this.get("disableDoubleClickZoom") || (a = _.dn(a, this.b), this.fe(a, 1))))
    };
    _.k.Fi = function (a) {
        if (!_.wj(a) && !this.C) {
            var b = _.Cl();
            300 >= b - this.j ? this.j = 0 : (this.j = b, this.Zd("click", a));
            _.gn("Mm", "-i", this, this.B)
        }
    };
    _.k.Zd = function (a, b) {
        var c = _.dn(b, this.F), d = _.dn(b, this.b), e = this.W.fromDivPixelToLatLng(c, !0);
        e && (c = new _.C(e.lat(), e.lng()), e = this.H.get("projection").fromLatLngToPoint(e), b = new _.lm(c, b, d, e), this.f.f.wg(a, b) || (this.set("draggableCursor", this.H.get("draggableCursor")), this.D.get("title") && this.D.set("title", null), delete b.za, _.x.trigger(this.H, a, b)))
    };
    _.k.Gi = function (a) {
        this.C = !1;
        5 != _.R.type || 2 != _.R.b || 2 != a.button || a.ctrlKey || this.Tf(a)
    };
    _.k.fe = function (a, b) {
        b = Math.pow(2, b);
        var c = new _.At(0, 0, b);
        _.Bt(c, new _.G(-a.x, -a.y));
        a = new _.zt(b, new _.G(c.x, c.y), a);
        ay(this, "movestart", null);
        ay(this, "move", a);
        ay(this, "moveend", a);
        _.gn("Mm", "-i", this, this.B)
    };
    by.prototype.m = function (a, b) {
        return this.l(this.j.m(a, b))
    };
    by.prototype.f = function (a) {
        return this.l(this.j.f(a))
    };
    by.prototype.b = function () {
        return this.j.b()
    };
    _.t(ey, _.y);
    ey.prototype.changed = function (a) {
        if ("available" != a) {
            a = this.get("viewport");
            var b = this.get("featureRects");
            a = this.b(a, b);
            null != a && a != this.get("available") && this.set("available", a)
        }
    };
    _.t(fy, _.y);
    fy.prototype.offset_changed = function () {
        this.set("newCenter", this.get("center"));
        var a = this.get("projectionBounds"), b = this.get("offset");
        if (a && b) {
            var c = this.get("div");
            _.Bk(c, new _.G(a.I - b.width, a.J - b.height));
            _.Sl(c)
        }
    };
    gy.prototype.D = function () {
        hy(this, "visreq", function () {
            _.Qf(this.b, "visreq")
        })
    };
    gy.prototype.F = function () {
        hy(this, "visres", function () {
            _.Qf(this.b, "visres")
        })
    };
    gy.prototype.B = function () {
        hy(this, "firsttile", function () {
            var a = {firsttile: void 0};
            hy(this, "firstpixel", function () {
                a.firstpixel = void 0
            });
            _.Pf(this.b, a)
        })
    };
    gy.prototype.C = function () {
        hy(this, "tilesloaded", function () {
            var a = {tilesloaded: void 0};
            hy(this, "allpixels", function () {
                a.allpixels = void 0
            });
            _.Pf(this.b, a)
        })
    };
    ly.prototype.Ca = function (a, b, c) {
        var d;
        a:{
            if (!(7 > b)) {
                var e = 1 << b - 7;
                d = a.x / e;
                for (var e = a.y / e, f = _.sm(Xy), g = f.next(); !g.done; g = f.next())if (g = g.value, d >= g.ce && d <= g.be && e >= g.ee && e <= g.de) {
                    d = !0;
                    break a
                }
            }
            d = !1
        }
        return d ? this.b.Ca(a, b, c) : this.f.Ca(a, b, c)
    };
    my.prototype.Ca = function (a, b, c) {
        a = new _.mu(a, b, this.B, this.j.createElement("div"), {Gg: this.l || void 0, ab: c && c.ab});
        return new Ox(a, this.b, this.C, this.f, this.m, c && c.Za)
    };
    ny.prototype.fromLatLngToPoint = function (a, b) {
        b = this.j.fromLatLngToPoint(a, b);
        Px(b, this.b.heading());
        b.y = (b.y - 128) / _.Lw + 128;
        return b
    };
    ny.prototype.fromPointToLatLng = function (a, b) {
        var c = this.l;
        c.x = a.x;
        c.y = (a.y - 128) * _.Lw + 128;
        Px(c, 360 - this.b.heading());
        return this.j.fromPointToLatLng(c, b)
    };
    ny.prototype.getPov = _.oa("b");
    _.rm(uy, _.y);
    uy.prototype.getPrintableImageUri = function (a, b, c, d, e) {
        d = void 0 === d ? 0 : d;
        e = void 0 === e ? 1 : e;
        var f = this.get("tileMapType");
        if (2048 < a * e || 2048 < b * e || !(f instanceof sx))return null;
        d = d || this.get("zoom");
        if (null == d)return null;
        c = c || this.get("center");
        if (!c)return null;
        var g = f.ua().get();
        if (!g.ta)return null;
        var h = new _.cu(g.ta);
        _.eu(h, 0);
        var l = this.f.f(d);
        l && _.hu(h, l);
        if ("hybrid" == f.na) {
            _.$s(h.b);
            for (f = _.ee(h.b, 1) - 1; 0 < f; --f)_.Hj(new _.Er(_.Ij(h.b, 1, f)), new _.Er(_.Ij(h.b, 1, f - 1)));
            f = new _.Er(_.Ij(h.b, 1, 0));
            f.data[0] =
                1;
            _.Lj(f, 1);
            _.Lj(f, 2)
        }
        if (2 == e || 4 == e) (new _.Gr(_.O(h.b, 4))).data[4] = e;
        e = d;
        d = new _.ns(_.O(new _.ks(_.Jj(h.b, 0)), 3));
        d.setZoom(e);
        e = new _.ho(_.O(d, 2));
        f = wx(c.lat());
        e.data[0] = f;
        c = wx(c.lng());
        e.data[1] = c;
        d = new _.os(_.O(d, 0));
        d.data[0] = a;
        d.data[1] = b;
        a = this.b;
        a += "pb=" + (0, window.encodeURIComponent)(_.Ys(h.b)).replace(/%20/g, "+");
        null != g.tb && (a += "&authuser=" + g.tb);
        return a
    };
    _.rm(vy, _.y);
    vy.prototype.changed = function (a) {
        "tileMapType" != a && "style" != a && this.notify("style")
    };
    vy.prototype.getStyle = function () {
        var a = [], b = this.get("tileMapType");
        if (b instanceof sx && b.fb) {
            var c = new _.gm;
            _.hm(c, b.fb);
            a.push(c)
        }
        b = new _.gm;
        _.hm(b, 37);
        _.Yk(_.im(b), "smartmaps");
        a.push(b);
        this.b.get().forEach(function (b) {
            b.fb && a.push(b.fb)
        });
        return a
    };
    _.t(Cy, _.y);
    Cy.prototype.changed = function (a) {
        "zoomRange" != a && By(this)
    };
    Dy.prototype.C = function (a) {
        if (_.ee(a, 0)) {
            this.l = {};
            this.j = {};
            for (var b = 0; b < _.ee(a, 0); ++b) {
                var c = new ux(_.Ij(a, 0, b)), d = c.getTile(), e = d.getZoom(), f = _.M(d, 1), d = _.M(d, 2), c = _.M(c, 2), g = this.l;
                g[e] = g[e] || {};
                g[e][f] = g[e][f] || {};
                g[e][f][d] = c;
                this.j[e] = Math.max(this.j[e] || 0, c)
            }
            this.B.b(null)
        }
    };
    Dy.prototype.m = function (a, b) {
        var c = this.l, d = a.x;
        a = a.y;
        return c[b] && c[b][d] && c[b][d][a] || 0
    };
    Dy.prototype.f = function (a) {
        return this.j[a] || 0
    };
    Dy.prototype.b = _.oa("B");
    _.t(Ey, _.y);
    Ey.prototype.changed = function (a) {
        if ("apistyle" != a && "hasCustomStyles" != a) {
            var b = this.get("mapTypeStyles") || this.get("styles");
            this.set("hasCustomStyles", _.w(b));
            a = [];
            _.xg[13] && a.push({featureType: "poi.business", elementType: "labels", stylers: [{visibility: "off"}]});
            _.ib(a, b);
            b = Vx(a);
            b != this.b && (this.b = b, this.notify("apistyle"));
            a.length && !b && _.cc(_.pm(_.x.trigger, this, "styleerror"))
        }
    };
    Ey.prototype.getApistyle = _.oa("b");
    _.t(Fy, _.y);
    Fy.prototype.changed = function (a) {
        if ("maxZoomRects" == a || "latLng" == a) {
            a = this.get("latLng");
            var b = this.get("maxZoomRects");
            if (a && b) {
                for (var c = void 0, d = 0, e; e = b[d++];)e.b.contains(a) && (c = Math.max(c || 0, e.maxZoom));
                a = c;
                a != this.get("maxZoom") && this.set("maxZoom", a)
            } else this.set("maxZoom", void 0)
        }
    };
    _.t(Hy, _.y);
    Hy.prototype.b = function () {
        var a = new _.I(this.f.clientWidth, this.f.clientHeight);
        a.b(this.get("size")) || this.set("size", a)
    };
    _.t(Ny, _.y);
    Ny.prototype.immutable_changed = function () {
        var a = this, b = a.get("immutable"), c = a.f;
        b != c && (_.ab(a.b, function (d) {
            (c && c[d]) !== (b && b[d]) && a.set(d, b && b[d])
        }), a.f = b)
    };
    Wy.prototype.f = function (a, b, c, d, e, f, g) {
        var h = _.Df(_.Ff(_.Q)), l = a.__gm, n = a.getDiv();
        if (n) {
            _.x.forward(n, "resize", c);
            _.x.addDomListenerOnce(c, "mousedown", function () {
                _.en(a, "Mi")
            }, !0);
            var q = new _.hv({
                tg: c,
                xg: n,
                ug: !0,
                Yg: _.Nj(_.Ff(_.Q), 15),
                backgroundColor: b.backgroundColor
            }), r = q.l, n = new Hy(c, q.b);
            _.Qk(q.b, 0);
            _.x.forward(a, "resize", c);
            l.set("panes", q.m);
            l.set("innerContainer", q.j);
            var u = My(f, a, _.Yt(n, "size"), d && d.j), A = new Fy, B = oy(), E, z;
            (function () {
                var b = _.M(_.Ej(), 14), c = a.get("noPerTile") && _.xg[15], d = new Dy;
                E = Jy(d, b, a, c);
                z = new _.bw(h, A, B, c ? null : d, !!a.U, u)
            })();
            z.bindTo("tilt", a);
            z.bindTo("heading", a);
            z.bindTo("bounds", a);
            z.bindTo("zoom", a);
            z.bindTo("size", l);
            f = new Oy(new _.Fj(_.O(_.Q, 1)), a, E);
            ty(f, a.mapTypes, b.enableSplitTiles);
            l.set("eventCapturer", q.ra);
            l.set("panBlock", q.fd);
            var H = Gy(a, q.m.mapPane);
            z.bindTo("baseMapType", H);
            var D, J = null;
            D = new _.sv(r, q.B, H.B, u);
            f = new _.Vt(["blockingLayerCount", "staticMapLoading"], "waitWithTiles", function (a, b) {
                return !!a || !!b
            });
            f.bindTo("blockingLayerCount", l);
            D.bindTo("waitWithTiles",
                f);
            D.set("panes", q.m);
            D.bindTo("styles", a);
            _.xg[20] && D.bindTo("animatedZoom", a);
            _.F("onion", function (b) {
                b.f(a, E)
            });
            _.xg[35] && (_.mw(a), _.nw(a));
            var P = new _.aw;
            P.bindTo("tilt", a);
            P.bindTo("zoom", a);
            P.bindTo("mapTypeId", a);
            P.bindTo("aerial", B.obliques, "available");
            l.bindTo("tilt", P, "actualTilt");
            _.x.addListener(z, "attributiontext_changed", function () {
                a.set("mapDataProviders", z.get("attributionText"))
            });
            f = new Ey;
            f.bindTo("styles", a);
            f.bindTo("mapTypeStyles", H, "styles");
            l.bindTo("apistyle", f);
            l.bindTo("hasCustomStyles",
                f);
            _.x.forward(f, "styleerror", a);
            f = new vy(l.b);
            f.bindTo("tileMapType", H);
            l.bindTo("style", f);
            var Z;
            D && (Z = new _.Vv, l.set("projectionController", Z), D.bindTo("size", n), D.bindTo("projection", Z), D.bindTo("projectionBounds", Z), Z.bindTo("projectionTopLeft", D), Z.bindTo("offset", D), Z.bindTo("latLngCenter", a, "center"), Z.bindTo("size", n), Z.bindTo("projection", a), D.bindTo("fixedPoint", Z), a.bindTo("bounds", Z, "latLngBounds", !0));
            l.set("mouseEventTarget", {});
            var Da = new _.Uv(_.R.j, q.j);
            Da.bindTo("title", l);
            var Hb =
                _.Kd(!1);
            f = _.nt({draggable: _.Yt(a, "draggable"), yg: _.Yt(a, "gestureHandling"), Vc: Hb});
            var xa;
            D && (xa = Iy(q.j, r, a, D, Z, g, Da, f));
            d && (g = Ky(a, r), d.bindTo("div", g), d.bindTo("center", g, "newCenter"), xa && d.bindTo("zoom", xa), d.bindTo("tilt", l), d.bindTo("size", l));
            xa ? l.bindTo("zoom", xa) : l.bindTo("zoom", a);
            l.bindTo("center", a);
            l.bindTo("size", n);
            l.bindTo("baseMapType", H);
            D && (l.bindTo("offset", D), l.bindTo("layoutPixelBounds", D), l.bindTo("pixelBounds", D), l.bindTo("projectionTopLeft", D), l.bindTo("projectionBounds",
                D, "viewProjectionBounds"), l.bindTo("projectionCenterQ", Z));
            a.set("tosUrl", _.Dw);
            D && (d = Ly(), d.bindTo("bounds", D, "pixelBounds"), l.bindTo("pixelBoundsQ", d, "boundsQ"));
            d = new Ny({projection: 1});
            d.bindTo("immutable", l, "baseMapType");
            g = new _.kw({projection: new _.Yf});
            g.bindTo("projection", d);
            a.bindTo("projection", g);
            D && (_.x.forward(l, "panby", D), _.x.forward(l, "panbynow", D), _.x.forward(l, "panbyfraction", D));
            _.x.addListener(l, "panto", function (b) {
                if (b instanceof _.C)if (!a.get("center")) a.set("center", b); else {
                    if (D) {
                        b =
                            Z.fromLatLngToDivPixel(b);
                        var c = Z.get("offset") || _.$h;
                        b.x += Math.round(c.width) - c.width;
                        b.y += Math.round(c.height) - c.height;
                        _.x.trigger(D, "panto", b.x, b.y)
                    }
                } else throw Error("panTo: latLng must be of type LatLng");
            });
            D && (_.x.forward(l, "pantobounds", D), _.x.addListener(l, "pantolatlngbounds", function (a) {
                if (a instanceof _.ld) D && _.x.trigger(D, "pantobounds", yx(Z, a)); else throw Error("panToBounds: latLngBounds must be of type LatLngBounds");
            }));
            D && xa && _.x.addListener(xa, "zoom_changed", function () {
                xa.get("zoom") !=
                a.get("zoom") && (a.set("zoom", xa.get("zoom")), _.kn(a, "Mm"))
            });
            var Va = new Cy;
            Va.bindTo("mapTypeMaxZoom", H, "maxZoom");
            Va.bindTo("mapTypeMinZoom", H, "minZoom");
            Va.bindTo("maxZoom", a);
            Va.bindTo("minZoom", a);
            Va.bindTo("trackerMaxZoom", A, "maxZoom");
            D && xa && (xa.bindTo("zoomRange", Va), D.bindTo("zoomRange", Va), xa.bindTo("draggable", a), xa.bindTo("scrollwheel", a), xa.bindTo("disableDoubleClickZoom", a));
            var kc = new _.lw(_.Ck(c));
            l.bindTo("fontLoaded", kc);
            d = l.j;
            d.bindTo("scrollwheel", a);
            d.bindTo("disableDoubleClickZoom",
                a);
            d = function () {
                var b = a.get("streetView");
                b ? (a.bindTo("svClient", b, "client"), b.__gm.bindTo("fontLoaded", kc)) : (a.unbind("svClient"), a.set("svClient", null))
            };
            d();
            _.x.addListener(a, "streetview_changed", d);
            if (_.xg[71]) {
                var Yb = null;
                _.nm(a, "floor_changed", function () {
                    var b = a.get("floor");
                    if ((Yb && Yb.da.pid_lv) != b) {
                        var c = Yb, d = l.b.get();
                        Yb && (c = null, d = d.Sa(Yb));
                        b && (c = new _.Zt, c.ea = "indoor", c.da.pid_lv = b, d = _.Qj(d, c));
                        Yb = c;
                        l.b.set(d)
                    }
                })
            }
            if (!a.U) {
                J = function () {
                    J = null;
                    _.F("controls", function (b) {
                        var d = new b.Sf(q.b);
                        l.set("layoutManager", d);
                        D && D.bindTo("layoutBounds", d, "bounds");
                        b.Cl(d, a, H, q.b, z, B.report_map_issue, Va, P, c, Hb, Z);
                        b.Dl(a, q.j);
                        b.Mh(c)
                    })
                };
                if (D) {
                    var Ve = _.x.addListener(D, "tilesloading_changed", function () {
                        D.get("tilesloading") && (Ve.remove(), J())
                    });
                    _.x.addListenerOnce(D, "tilesloaded", function () {
                        _.F("util", function (b) {
                            b.f.b();
                            window.setTimeout((0, _.p)(b.b.f, b.b), 5E3);
                            b.l(a)
                        })
                    })
                }
                _.en(a, "Mm");
                b.v2 && _.en(a, "Mz");
                _.gn("Mm", "-p", a, !(!a || !a.U));
                ry(a, H);
                _.kn(a, "Mm");
                _.Gl(function () {
                    _.kn(a, "Mm")
                });
                qy(a);
                c && xy(new yy(c),
                    a, f)
            }
            py(a);
            var Gf = _.M(_.Ej(), 14);
            b = new Oy(new _.Fj(_.O(_.Q, 1)), a, new by(E, function (a) {
                return a || Gf
            }));
            wy(b, a.overlayMapTypes);
            _.xg[35] && l.bindTo("card", a);
            a.U || Ay(a);
            e && window.setTimeout(function () {
                _.x.trigger(a, "projection_changed");
                _.m(a.get("bounds")) && _.x.trigger(a, "bounds_changed");
                _.x.trigger(a, "tilt_changed");
                _.m(a.get("heading")) && _.x.trigger(a, "heading_changed")
            }, 0);
            _.xg[15] && (e = _.au(_.bu()), e = new uy(e[0], E), e.bindTo("tileMapType", H), e.bindTo("center", a), e.bindTo("zoom", l), a.getPrintableImageUri =
                (0, _.p)(e.getPrintableImageUri, e), D && (a.setFpsMeasurementCallback = (0, _.p)(D.setFpsMeasurementCallback, D), a.bindTo("tilesloading", D)), l.bindTo("authUser", a))
        }
    };
    Wy.prototype.fitBounds = function (a, b) {
        function c() {
            var c = _.ig(a.getDiv());
            c.width -= 80;
            c.width = Math.max(1, c.width);
            c.height -= 80;
            c.height = Math.max(1, c.height);
            var e = a.getProjection(), f = b.getSouthWest(), g = b.getNorthEast(), h = f.lng(), l = g.lng();
            h > l && (f = new _.C(f.lat(), h - 360, !0));
            f = e.fromLatLngToPoint(f);
            h = e.fromLatLngToPoint(g);
            g = Math.max(f.x, h.x) - Math.min(f.x, h.x);
            f = Math.max(f.y, h.y) - Math.min(f.y, h.y);
            c = g > c.width || f > c.height ? 0 : Math.floor(Math.min(_.El(c.width + 1E-12) - _.El(g + 1E-12), _.El(c.height + 1E-12) - _.El(f +
                        1E-12)));
            g = _.Vk(e, b, 0);
            e = _.Wk(e, new _.G((g.I + g.L) / 2, (g.J + g.M) / 2), 0);
            _.jb(c) && (a.setCenter(e), a.setZoom(c))
        }

        a.getProjection() ? c() : _.x.addListenerOnce(a, "projection_changed", c)
    };
    Wy.prototype.b = function (a, b, c, d, e, f) {
        a = new _.mu(a, b, c, d, {});
        a.setUrl(e, f);
        return a
    };
    _.Xc("map", new Wy);
});
