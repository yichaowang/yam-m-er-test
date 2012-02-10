var YAMMER = YAMMER || {};

YAMMER.gallery = (function () {
   var images = [], thumbClick; 
        
   $.ajax({
       url:"js/gallery_json.js",
       dataType: 'json',
       success: function(data){
           var photos = data['photos'];
           
           $('#header-title').text(data['album']['name']);
           
           $.each(photos,function(key, value){
               var el, a, img, thumb, title, subtitle, stage;
               a = $('<a>',{
                      class: 'thumb-list '+key,
                      href: '#',
               });
               thumb = $('<img>',{
                   src: value.thumb_url,
                   class: 'frame' 
               });
               
               el = a.append(thumb).appendTo('#control div');
               
               img = $('<img>',{
                   src: value.url,
                   class: 'center'
               });
               title = $('<h1>').text(value.title);
               subtitle = $('<h2>').text('Taken on '+value.date+' in '+value.location); 
               stage = img.after(function(){return $('<hgroup>',{class: 'center'}).append(title,subtitle)}());
               
               // console.log((function(){return $(title)}()));
                              
               images.push(stage); 
           });
           
           // console.log(images); 
           
           $('#stage').append(images[1]);
       }
   });
   
   thumbClick = function(id){
       $('#stage').clear().append(images[id]);
   }
   
    

    return {
        // nextImg: nextImg,
        // preImg:  prevImg
    }
}());