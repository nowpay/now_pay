function getUrlParams() {
  var params = {};
  location.href.replace(/[?&]+([^&=]+)=([^&]*)/gi, function(m, key, val) {
    params[key] = val;
  });
  return params;
}
(function() {
  if(-1===location.search.indexOf('r=post/show&id')) return;
  var fb = new Firebase('https://now-pay.firebaseio.com/');
  var params = getUrlParams();
  if(!params.r || !params.id) return;
  var id = params.id;
  fb.child('artcle/'+id).once('value', function(snapshot) {
    var artcleExists = snapshot.exists();
    if(!artcleExists) {
      $('#_viewnum').text(1);
      fb.child('artcle/'+id).set({views: 1});
      return;
    }

    fb.child('artcle/'+id).once('value', function(snapshot) {
      var views = snapshot.val().views;
      $('#_viewnum').text(++views);
      fb.child('artcle/'+id).update({views: views});
    });
  });


})();
