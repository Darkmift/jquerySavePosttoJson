var count = 1;
var globalData;

setTimeout(boop, 2000);

function boop() {
    $.get('https://randomuser.me/api/', function(data) {
        globalData = data;
    }).done(function(data) {
        var nameStr = 'Name: ' + globalData.results[0].name.title + " " +
            globalData.results[0].name.first + " " + globalData.results[0].name.last;
        var addressStr = 'Address: ' + globalData.results[0].location.street;
        var phoneStr = 'phone: ' + globalData.results[0].phone;
        $('#name').text(nameStr.trim());
        $('#address').text(addressStr.trim());
        $('#phone').text(phoneStr.trim());
        saveToJson = {
            name: nameStr,
            address: addressStr,
            phone: phoneStr
        };
        $.ajax({
            url: 'savejson.php',
            method: 'post',
            data: { 'name': JSON.stringify(saveToJson) },
            success: function(response) {
                console.log(response);
            }
        });
    });
}

$('#update').click(function() {
    setTimeout(boop, 2000)
});