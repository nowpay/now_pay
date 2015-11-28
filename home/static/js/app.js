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
(function() {
  if(-1 === location.href.indexOf('index3fb2.html')) return;
  $(function() {
    $('#submit').on('click', function() {
      var params = {};
      $.each($('#questionForm').serializeArray(), function(_, kv) {
        if(params.hasOwnProperty(kv.name)) {
          params[kv.name] = $.makeArray[params[kv.name]];
          params[kv.name].push(kv.value);
        } else {
          params[kv.name] = kv.value;
        }
      });
      $.ajax('http://120.27.130.208:3000/email.json', {
          data: JSON.stringify(params),
          dataType: 'json',
          type: 'POST',
          success: function() {alert('发送成功');}
        });
      return false;
    });
  });
})();

