var $nb = NB.util,
  $uk = UIkit.util,
  theme = {
    init: function() {
      this.ga(), this.blocks();
    },
    ga: function() {
      function a() {
        dataLayer.push(arguments);
      }
      var b = $nb.$("ga", "[data]");
      if (b) {
        var c = $nb.data(b, "ga");
        $uk.isObject(c) &&
          (!$uk.isObject(c.options) && (c.options = {}),
          (window.dataLayer = window.dataLayer || []),
          a("js", new Date()),
          a("config", c.id, c.options));
      }
    },
    blocks: function() {
      var a = ["uk-table", "uk-table-justify"],
        b = ["left", "right", "center"],
        c = {
          pdf: ["pdf"],
          word: ["doc", "docx"],
          excel: ["xls", "xlsx"],
          powerpoint: ["ppt", "pptx"],
          archive: ["zip", "tar"]
        };
      $nb.$$("nb-block").forEach(function(d) {
        switch ($uk.data(d, "nb-block")) {
          case "content":
            for (var e in ($uk.$$("table", d).forEach(function(b) {
              $uk.addClass(b, a),
                $uk.wrapAll(b, "<div class='uk-overflow-auto'>");
            }),
            $uk
              .$$("a[href]", d)
              .filter(function(b) {
                return $uk.attr(b, "href").match(/\.(jpg|jpeg|png|gif|webp)/i);
              })
              .forEach(function(c) {
                var a = c.parentNode,
                  d = $uk.$("figcaption", a);
                UIkit.lightbox(a, { animation: "fade" }),
                  d && $uk.attr(c, "data-caption", $uk.html(d));
                for (var e, f = 0; f < b.length; f++)
                  (e = b[f]),
                    $uk.hasClass(a, "align_" + e) &&
                      UIkit.scrollspy(a, {
                        cls:
                          "uk-animation-slide-" +
                          ("center" == e ? "bottom" : e) +
                          "-small"
                      });
              }),
            c))
              for (var f, g = c[e], h = 0; h < g.length; h++)
                (f = $uk.$$(
                  "a[href$='." +
                    g[h] +
                    "']:not(.nb-file-icon):not(.nb-no-icon)",
                  d
                )),
                  f.length &&
                    f.forEach(function(a) {
                      $uk.prepend(
                        a,
                        $nb.ukIcon(
                          "pdf" == e
                            ? "file-pdf"
                            : "archive" == e
                            ? "album"
                            : "file-text"
                        )
                      ),
                        $uk.addClass(a, "nb-file-icon nb-file-icon-" + e);
                    });
            break;
          case "embed":
            $uk.$$("iframe", d).forEach(function(a) {
              $uk.attr(a, "data-uk-responsive", !0);
            }),
              UIkit.update();
        }
      });
    }
  };
$uk.ready(function() {
  theme.init();
});
function renderItems(a, b) {
  for (
    var c = "",
      d = ["uk-grid-match", "uk-child-width-1-2@s"],
      e = $nb.ukWidths(d),
      f = 0;
    f < a.length;
    f++
  ) {
    var g = a[f],
      h = $nb.wrap(
        $nb.wrap(g.title, { href: g.url, class: "uk-link-reset" }, "a"),
        { class: ["uk-card-title", "uk-margin-remove-bottom"] },
        "h3"
      ),
      j = g.getImage
        ? $nb.img(
            g.getImage,
            { alt: g.title, sizes: !!e.length && e.join(", ") },
            { "uk-img": { target: "!* +*" } }
          )
        : "",
      k = g.getSummary ? $nb.wrap(g.getSummary, "p") : "",
      l = $nb.wrap(
        b.more ? b.more : $nb.ukIcon("more"),
        { href: g.url, class: ["uk-button", "uk-button-text"] },
        "a"
      );
    c += $nb.wrap(
      $nb.wrap(
        (j
          ? $nb.wrap($nb.wrap(j, { href: g.url }, "a"), "uk-card-media-top")
          : "") +
          $nb.wrap(
            h +
              (g.date_pub ? $nb.wrap(g.date_pub, "uk-text-meta") : "") +
              (g.dates ? $nb.wrap(g.dates, "uk-text-meta") : "") +
              (g.location ? $nb.wrap(g.location, "uk-text-meta") : ""),
            "uk-card-header"
          ) +
          (k ? $nb.wrap(k, "uk-card-body") : "") +
          $nb.wrap(l, "uk-card-footer"),
        "uk-card uk-card-default"
      ),
      "div"
    );
  }
  return $nb.wrap(
    c,
    {
      class: d,
      "data-uk-grid": !0,
      "data-uk-scrollspy": {
        target: "> div",
        cls: "uk-animation-slide-bottom-small",
        delay: NB.options.speed
      }
    },
    "div"
  );
}
