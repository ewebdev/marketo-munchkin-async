var MunchkinAsync = (function ($) {

  var q = [],
    loaded;

  var log = function (name, obj) {
    // debug utility function
    console.log(name, obj);
  };

  var cmd = function () {
    q.push(arguments);
  };

  var processQueue = function () {
    var params;
    while (params = q.shift()) {
      cmd.apply(null, params);
    }
  };

  var onLoad = function (marketoId) {
    if (!loaded && window.Munchkin) {
      loaded = true;
      window.Munchkin.init(marketoId);
      cmd = window.Munchkin.munchkinFunction;
//      cmd = log; /* uncomment line for events debugging */
      processQueue();
    }
  };

  var requireLib = function (marketoId) {
    $.ajax({
      url: '//munchkin.marketo.net/munchkin.js',
      dataType: 'script',
      cache: true,
      success: function () {
        onLoad(marketoId);
      }
    });
  };

  var track = function () {
    cmd.apply(null, arguments);
  };

  track.init = function (marketoId) {
    requireLib(marketoId);
    return track;
  };

  return track;

})(jQuery);