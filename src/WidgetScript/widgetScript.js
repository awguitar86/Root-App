

// Old Script
    window.routeWidgetJSON=function(e){
        var t=document.getElementById("rw-_container");
        t.insertAdjacentHTML("afterbegin",e.html);
    };
    var obj=document.getElementById("rw-_container"),
        css=obj.getAttribute("data-style"),
        surl=obj.getAttribute("data-publickey")+"/?quote_id="+obj.getAttribute("data-quoteid")+"&override_display_price="+obj.getAttribute("data-overridedisplayprice")+"&style="+css,
        h=document.getElementsByTagName("head")[0],
        s=document.createElement("script"),
        u="https://api.routeit.cloud/widget/v2/";

    if(s.type="text/javascript", s.src=u+surl, h.parentNode.insertBefore(s,h), "true"==css){
        var c=document.createElement("link");
        c.type="text/css",
        c.rel="stylesheet",
        c.href="https://d1pv9ulu41r3n5.cloudfront.net/routeWidget.min.css",
        h.appendChild(c)
    }




