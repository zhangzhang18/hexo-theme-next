photo = {
  page: 1,
  offset: 20,
  init: function () {
    var that = this;
    $.getJSON("../photos/photoslist.json", function (data) {
      that.render(that.page, data);
      //that.scroll(data);
    });
  },
  render: function (page, data) {
    var begin = (page - 1) * this.offset;
    var end = page * this.offset;
    if (begin >= data.length) return;
    var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, li = "";
    for (var i = begin; i < end && i < data.length; i++) {
      imgNameWithPattern = data[i].split(' ')[1];
      imgName = imgNameWithPattern.split('.')[0]
      imageSize = data[i].split(' ')[0];
      imageX = imageSize.split('.')[0];
      imageY = imageSize.split('.')[1];
      li += '<div class="card" style=" width:100%;margin:auto">' +
        '<div class="ImageInCard" style="width:100%;">' +
        '<a data-fancybox="gallery" href="https://raw.githubusercontent.com/zhangzhang18/photos/master/images/' + imgNameWithPattern + '?raw=true" data-caption="' + imgName + '">' +
        '<img src="https://raw.githubusercontent.com/zhangzhang18/photos/master/images/' + imgNameWithPattern + '?raw=true" style="width: 100%"/>' +
        '</a>' +
        '</div>' +
        // '<div class="TextInCard">' + imgName + '</div>' +
        '</div>'
    }
    $(".ImageGrid").css("width","100%");
    $(".ImageGrid").append(li);
    $(".ImageGrid").lazyload();
    this.minigrid();
  },
  scroll: function (data) {
    var that = this;
    $(window).scroll(function () {
      var windowPageYOffset = window.pageYOffset;
      var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
      var sensitivity = 0;

      var offsetTop = $(".ImageInCard").offset().top + $(".ImageInCard").height();

      if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
        that.render(++that.page, data);
      }
    })
  },

  minigrid: function () {
    var grid = new Minigrid({
      container: '.ImageGrid',
      item: '.card',
      gutter: 12
    });
    grid.mount();
    $(window).resize(function () {
      grid.mount();
    });
  }
}
photo.init();
