// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
//define("dojo/_base/lang dojo/_base/url dojo/string ../core/Error ../core/MultiOriginJSONSupport ../core/urlUtils ../geometry/SpatialReference ../geometry/Extent ../geometry/Point ./TiledLayer ./mixins/OperationalLayer ./mixins/ScaleRangeLayer ./mixins/PortalLayer ./support/TileInfo ./support/LOD".split(" "),
define(["dojo/_base/lang",//e
    "dojo/_base/url",//g
    "dojo/string",//k
    "esri/core/Error",//l
    "esri/core/MultiOriginJSONSupport",//m
    "esri/core/urlUtils",//n
    "esri/geometry/SpatialReference",//d
    "esri/geometry/Extent",//p
    "esri/geometry/Point",//q,
    "esri/layers/TiledLayer",//r
    "esri/layers/mixins/OperationalLayer",//t
    "esri/layers/mixins/ScaleRangeLayer",//u
    "esri/layers/mixins/PortalLayer",//v
    "esri/layers/support/TileInfo",//h
    "esri/layers/support/LOD"],//c
    function (e, g, k, l, m, n, d, p, q, r, t, u, v, h, c) {
        return r.createSubclass([t, m, u, v], {
            declaredClass: "esri.layers.WebTileLayer",
            normalizeCtorArgs: function (a, b) {
                return "string" === typeof a ? e.mixin({ urlTemplate: a }, b || {}) : a
            },
            getDefaults: function (a) {
                var b = new p(-20037508.342787, -20037508.342787, 20037508.342787, 20037508.342787, new d({ wkid: 102113 }));
                return e.mixin(this.inherited(arguments), {
                    fullExtent: b,
                    tileInfo: new h({
                        size: 256, dpi: 96, format: "PNG8", compressionQuality: 0,
                        origin: new q({
                            x: -20037508.342787,
                            y: 20037508.342787,
                            spatialReference: new d({ wkid: 102113 })
                        }),
                        spatialReference: new d({ wkid: 102113 }),
                        lods: [
                            new c({ "level": 3, "scale": 73957190.948944, "resolution": 19567.8792409999 }),
                            new c({ "level": 4, "scale": 36978595.474472, "resolution": 9783.93962049996 }),
                            new c({ "level": 5, "scale": 18489297.737236, "resolution": 4891.96981024998 }),
                            new c({ "level": 6, "scale": 9244648.868618, "resolution": 2445.98490512499 }),
                            new c({ "level": 7, "scale": 4622324.434309, "resolution": 1222.99245256249 }),
                            new c({ "level": 8, "scale": 2311162.217155, "resolution": 611.49622628138 }),
                            new c({ "level": 9, "scale": 1155581.108577, "resolution": 305.748113140558 }),
                            new c({ "level": 10, "scale": 577790.554289, "resolution": 152.874056570411 }),
                            new c({ "level": 11, "scale": 288895.277144, "resolution": 76.4370282850732 }),
                            new c({ "level": 12, "scale": 144447.638572, "resolution": 38.2185141425366 }),
                            new c({ "level": 13, "scale": 72223.819286, "resolution": 19.1092570712683 }),
                            new c({ "level": 14, "scale": 36111.909643, "resolution": 9.55462853563415 }),
                            new c({ "level": 15, "scale": 18055.954822, "resolution": 4.77731426794937 }),
                            new c({ "level": 16, "scale": 9027.977411, "resolution": 2.38865713397468 }),
                            new c({ "level": 17, "scale": 4513.988705, "resolution": 1.19432856685505 }),
                            new c({ "level": 18, "scale": 2256.994353, "resolution": 0.597164283559817 }),
                            new c({ "level": 19, "scale": 1128.497176, "resolution": 0.298582141647617 })]
                    })
                })
            },
            properties: {
                copyright: { value: "", json: { write: !0 } },
                fullExtent: { json: { write: !0 } },
                legendEnabled: {
                    json: {
                        read: {
                            source: ["showLegend"], reader: function (a, b) {
                                return null != b.showLegend ? b.showLegend : !0
                            }
                        }
                    }
                },
                levelValues: {
                    dependsOn: ["tileInfo"],
                    get: function () {
                        var a = [];
                        if (!this.tileInfo) return null;
                        this.tileInfo.lods.forEach(function (b) {
                            a[b.level] = b.levelValue || b.level
                        }, this);
                        return a
                    }
                },
                operationalLayerType: "WebTiledLayer", popupEnabled: {
                    json: {
                        read: {
                            source: ["disablePopup"],
                            reader: function (a, b) {
                                return null != b.disablePopup ? !b.disablePopup : !0
                            }
                        }
                    }
                },
                refreshInterval: { json: { write: !0 } },
                spatialReference: {
                    type: d,
                    value: d.WebMercator, json: {
                        read: {
                            source: ["spatialReference", "fullExtent.spatialReference"],
                            reader: function (a, b) {
                                return a || b.fullExtent && b.fullExtent.spatialReference && d.fromJSON(b.fullExtent.spatialReference)
                            }
                        }
                    }
                }, subDomains: { value: null, json: { write: !0 } },
                tileInfo: {
                    type: h, json: { write: !0 }
                },
                tileServers: {
                    value: null, dependsOn: ["urlTemplate", "subDomains"], get: function () {
                        if (!this.urlTemplate) return null;
                        var a = new g(this.urlTemplate), b = a.scheme ? a.scheme + "://" : "//", c = b + a.authority + "/", d = this.subDomains, e, f = []; -1 === a.authority.indexOf("{subDomain}") && f.push(c); d && 0 < d.length && 1 < a.authority.split(".").length && d.forEach(function (c) { -1 < a.authority.indexOf("{subDomain}") && (e = b + a.authority.replace(/\{subDomain\}/gi, c) + "/"); f.push(e) }, this); return f = f.map(function (a) {
                            "/" !== a.charAt(a.length - 1) && (a += "/");
                            return a
                        })
                    }
                },
                type: { value: "web-tile", json: { read: !1 } }, urlPath: {
                    dependsOn: ["urlTemplate"],
                    get: function () {
                        if (!this.urlTemplate)
                            return null;
                        var a = this.urlTemplate, b = new g(a);
                        return a.substring(((b.scheme ? b.scheme + "://" : "//") + b.authority + "/").length)
                    }
                },
                urlTemplate: {
                    json: {
                        origins: { portalItem: { read: { source: "url" } } }, read: { source: ["urlTemplate", "templateUrl"], reader: function (a, b) { return a || b.templateUrl } }, write: function (a, b) {
                            a && n.isProtocolRelative(a) && (a = "https:" + a);
                            b.templateUrl = a
                        }
                    }
                },
                url: { json: { write: !1 } }
            },
            getTileUrl: function (a, b, c) {
                a = this.levelValues[a];
                debugger;
                if (this.layerUrl == "http-map")
                    return "http://mt" + (c % 4) + ".google.cn/vt/lyrs=m@226000000&hl=zh-CN&gl=cn&src=app&x=" + c + "&y=" + b + "&z=" + a + "&s=Gali";
                else if (this.layerUrl == "http-img")
                    return "http://google.cn/maps/vt/lyrs=s@708&gl=cn&x=" + c + "&y=" + b + "&z=" + a + "&s=";
                else
                    return this.layerUrl + level + "/" + c + "/" + b + ".png";
                return;
                var d = this.tileServers[b % this.tileServers.length] + k.substitute(this.urlPath, {
                    level: a, col: c, row: b
                });
                return d = d.replace(/\{level\}/gi, a).replace(/\{row\}/gi, b).replace(/\{col\}/gi, c)
            },
            load: function () {
                var a = this.loadFromPortal({
                    supportedTypes: ["WMTS"]
                }).then(function () {
                    if (!this.urlTemplate)
                        throw new l("layer:load", "WebTileLayer (title: '" + this.title + "', id: '" + this.id + "') is missing the required 'urlTemplate' property value");
                }.bind(this));
                this.addResolvingPromise(a);
                return this
            }
        })
    });