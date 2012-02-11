var YAMMER = YAMMER || {};

YAMMER.gallery = (function () {
    var images = [], to, zoom, position=0; 

    $.ajax({
        url:"js/gallery_json.js",
        dataType: 'json',
        success: function(data){
            var photos = data['photos'];

            $('header .container_16').append( function(){return $('<h1>').text(data['album']['name'])}());

            $.each(photos,function(key, value){
                var el, a, img, thumb, title, subtitle, stage;

                thumb = $('<img>',{
                    src: value.thumb_url,
                    alt: "thumb",
                    class: 'frame cursor',
                    click: function(){zoom(key, this)}
                }).hover(function(){$(this).toggleClass('hover')
                });                   

                    el = thumb.appendTo('#control div');

                    img = $('<img>',{
                        src: value.url,
                        alt: "graphic",
                        class: 'center frame'
                    });     
                    
                    title = $('<h1>').text(value.title);
                    subtitle = $('<h2>').text('Taken on '+value.date+' in '+value.location); 
                    stage = img.after(function(){return $('<hgroup>',{class: 'center'}).append(title,subtitle)}());

                    images.push(stage); 
                });

                $('#control img').first().addClass('on');           
                $('#stage').append(images[0]);
            }
        });
    
    zoom = function(id, thumb){
        $('#stage').empty().append(images[id]);
        images[id].hide().fadeIn(100);
        $('img.on').removeClass('on');
        $(thumb).addClass('on');
        position=id;
        return false;
    } 

    to = function(e){
        var i = parseInt(position)+e;
        if(i<=-1){i=images.length-1}else if(i>=(images.length)){i=0};
        $('#stage').empty().append(images[i]);
        images[i].hide().fadeIn(100);
        $('img.on').removeClass('on');
        $('#control img').eq(i).addClass('on'); 
        position = i;
    }

    return {
        nextImg: function(){to(1)},
        prevImg: function(){to(-1)}
    }
}()); 

// Bind DOM Events
$('a.btn-next').bind({
    click:function(){YAMMER.gallery.nextImg(); return false;}
});         

$('a.btn-prev').bind({
    click:function(){YAMMER.gallery.prevImg(); return false;}
});
