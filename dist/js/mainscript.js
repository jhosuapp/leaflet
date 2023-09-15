var b = (i, a) => () => (a || i((a = { exports: {} }).exports, a), a.exports);
var f = (i, a, t) => new Promise((d, e) => {
  var c = (n) => {
    try {
      r(t.next(n));
    } catch (s) {
      e(s);
    }
  }, l = (n) => {
    try {
      r(t.throw(n));
    } catch (s) {
      e(s);
    }
  }, r = (n) => n.done ? d(n.value) : Promise.resolve(n.value).then(c, l);
  r((t = t.apply(i, a)).next());
});
var E = b((g) => {
  const w = (i) => f(g, null, function* () {
    return yield (yield fetch(i)).json();
  }), v = (() => {
    const i = (t, d = 0, e = 0, c = 0) => f(g, null, function* () {
      function l(o) {
        const { population: u } = o.properties;
        return {
          fillColor: r(u),
          weight: 1,
          opacity: 1,
          color: "white",
          dashArray: "1",
          fillOpacity: 0.9
        };
      }
      function r(o) {
        return o > 6e7 ? "#800026" : o > 5e7 ? "#BD0026" : (o > 4e7, "#002345");
      }
      const n = L.map("map", {
        center: [d, e],
        zoom: c,
        minZoom: 2
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(n);
      const s = yield L.geoJson(t, { style: l }).addTo(n), p = yield L.control();
      p.onAdd = function(o) {
        return this._div = L.DomUtil.create("div", "info-control"), this.update(), this._div;
      }, p.update = function(o) {
        this._div.innerHTML = o ? `<strong>${o.name}</strong><br>Poblaci\xF3n:${o.population}` : "Pasa el cursor sobre un \xE1rea";
      }, yield p.addTo(n), s.eachLayer(function(o) {
        const { population: u, name: m } = o.feature.properties;
        o.on("mouseover", function(h) {
          const y = h.target.feature.properties;
          p.update(y);
        }), o.on("mouseout", function() {
          p.update();
        }), o.bindPopup(`<strong>${m}</strong><br>Poblaci\xF3n:${u}`);
      });
    }), a = () => f(g, null, function* () {
      yield w("./lib/colombia-country.geojson").then((t) => {
        console.log(t);
        const { features: d } = t;
        d.forEach((e) => {
          const { properties: c } = e;
          c["hc-key"] = c.region_code;
        }), w("./lib/colombia-test-endpoint.json").then((e) => {
          const c = [];
          e.forEach((l) => {
            const { region_code: r, name: n, population: s } = l, { features: p } = t;
            p.forEach((u) => {
              const { properties: { region_code: m }, properties: h } = u;
              r == m && (h.name = n, h.population = s);
            });
            const o = [];
            o.push(r, s), c.push(o);
          }), console.log(c), i(t, 4.710989, -74.072092, 5), getLoader.remove(), getLegend.classList.add("active");
        }).catch((e) => {
          console.log(e + "second fetch");
        });
      }).catch((t) => {
        console.log(t + "fitst fetch");
      });
    });
    return {
      setHandleEvent: function() {
        try {
          a();
        } catch (t) {
          console.log(t);
        }
      }
    };
  })(), _ = () => {
    v.setHandleEvent();
  };
  window.addEventListener("load", () => {
    _();
  });
});
export default E();
//# sourceMappingURL=mainscript.js.map
