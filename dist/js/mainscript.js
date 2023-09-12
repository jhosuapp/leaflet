var y = (a, e) => () => (e || a((e = { exports: {} }).exports, e), e.exports);
var f = (a, e, o) => new Promise((r, d) => {
  var u = (n) => {
    try {
      s(o.next(n));
    } catch (i) {
      d(i);
    }
  }, p = (n) => {
    try {
      s(o.throw(n));
    } catch (i) {
      d(i);
    }
  }, s = (n) => n.done ? r(n.value) : Promise.resolve(n.value).then(u, p);
  s((o = o.apply(a, e)).next());
});
var _ = y((g) => {
  const b = (a) => f(g, null, function* () {
    return yield (yield fetch(a)).json();
  }), v = (() => {
    const a = (o, r = 0, d = 0, u = 0) => f(g, null, function* () {
      function p(t) {
        const { population: l } = t.properties;
        return {
          fillColor: s(l),
          weight: 1,
          opacity: 1,
          color: "white",
          dashArray: "1",
          fillOpacity: 0.9
        };
      }
      function s(t) {
        return t > 6e7 ? "#800026" : t > 5e7 ? "#BD0026" : (t > 4e7, "#002345");
      }
      const n = L.map("map", {
        center: [r, d],
        zoom: u,
        minZoom: 2
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(n);
      const i = yield L.geoJson(o, { style: p }).addTo(n), c = yield L.control();
      c.onAdd = function(t) {
        return this._div = L.DomUtil.create("div", "info-control"), this.update(), this._div;
      }, c.update = function(t) {
        this._div.innerHTML = t ? `<strong>${t.ADMIN ? t.ADMIN : t.NOMBRE_DPT}</strong><br>Poblaci\xF3n:${t.population}` : "Pasa el cursor sobre un \xE1rea";
      }, yield c.addTo(n), i.eachLayer(function(t) {
        const { population: l, ADMIN: h, NOMBRE_DPT: m } = t.feature.properties;
        t.on("mouseover", function(w) {
          const M = w.target.feature.properties;
          c.update(M);
        }), t.on("mouseout", function() {
          c.update();
        }), t.bindPopup(`<strong>${h || m}</strong><br>Poblaci\xF3n:${l}`);
      });
    }), e = () => {
      const o = document.querySelector(".map__legend");
      b("./lib/countries.geojson").then((r) => {
        setTimeout(() => {
          o.classList.add("active"), a(r);
        }, 1e3);
      });
    };
    return {
      setHandleEvent: function() {
        try {
          e();
        } catch (o) {
          console.log(o);
        }
      }
    };
  })(), T = () => {
    v.setHandleEvent();
  };
  window.addEventListener("load", () => {
    T();
  });
});
export default _();
//# sourceMappingURL=mainscript.js.map
