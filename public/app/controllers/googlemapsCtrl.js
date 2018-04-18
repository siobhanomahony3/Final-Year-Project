var shops = [
    {
        shopName:'Tesco Ardkeen',
        shopAddress : 'Farronshoneen, Ardkeen, Waterford',
        openingHours : 'Mon-Sun: 7am - 11pm',
        contactInfo : '1890 928 545',
        latitude : 52.244370,
        longitude : -7.085679
    },
    {
        shopName:'Tesco Ballybeg',
        shopAddress : 'Ballybeg Link Rd, Ballybeg, Waterford',
        openingHours : 'Mon-Sat:8:00am - 10:00pm & Sundays: 8:00am - 8:00pm ',
        contactInfo : '1890 928 519',
        latitude : 52.237147,
        longitude : -7.139566
    },
    {
        shopName:'SuperValu Kilbarry',
        shopAddress : 'Kilbarry Centre, Tramore Rd, Kilbarry, Waterford',
        openingHours : 'Mon-Sat: 8am - 9pm & Sundays: 9am - 8pm',
        contactInfo : '(051) 370 040',
        latitude : 52.246524,
        longitude : -7.121286
    },
    {
        shopName:'Aldi The Glen',
        shopAddress : 'The Glen, Waterford City, Co. Waterford',
        openingHours : 'Mon-Sat:9:00am - 10:00pm & Sundays: 9:00am - 9:00pm ',
        contactInfo : '1800 991 828',
        latitude : 52.262043,
        longitude :-7.119315
    },
    {
        shopName:'Aldi Ashe Road',
        shopAddress : ' Ashe Road, Waterford',
        openingHours : 'Mon-Sat:9:00am - 10:00pm & Sundays: 9:00am - 9:00pm ',
        contactInfo : '1800 991 828',
        latitude : 52.247043,
        longitude : -7.127116
    },
    {
        shopName:'Dunnes Stores City Square',
        shopAddress : 'Arundel Square, Waterford, X91 KF7V',
        openingHours : 'Mon-Wed & Saturday: 9am - 7pm & Thursday: 9am-8pm & Friday:9am - 9pm ',
        contactInfo : '(051) 853 160',
        latitude : 52.260278,
        longitude : -7.109375
    }


];

var app = angular.module('googlemapsCtrl', []);
app.controller('googlemapsCtrl', function ($scope) {
    var app = this;

    //Initializing the map and adding the default coords of WIT college
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(52.241930,-7.131693),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (shops){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(shops.latitude, shops.longitude),
            title: shops.shopName
        });
        marker.content =
            '<div class="infoWindowContent">' +
            '<strong>Shop Address: </strong>'+ shops.shopAddress + '<br />' +
            '<strong>Opening Hours: </strong>'+shops.openingHours + '<br />' +
            '<strong>Contact Information: </strong>'+shops.contactInfo + '<br />' +
            shops.latitude + ' East ,' +
            shops.longitude +  ' North , ' +
            '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h4>' + marker.title + '</h4>' +
                marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    };

    for (i = 0; i < shops.length; i++){
        createMarker(shops[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});