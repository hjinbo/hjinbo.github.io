$(function() {
    $.getJSON("/photos/static/images/images.json", function(data) {
        var image_p = $(".content .justified-gallery p");
        for (let i = 0; i < data.length; i++) {
            var image_a = $("<a class='gallery-item' href='" + data[i].url + "'></a>");
            var image_img = $("<img src='" + data[i].url + "' atl='" + i + "'>");
            var image_div = $("<div class='has-text-centered is-size-6 has-text-grey caption'>" + i + "</div>");
            
            image_a.append(image_img);
            image_a.append(image_div);
            image_p.append(image_a);
            image_p.append("<br>");
        }
    });
})