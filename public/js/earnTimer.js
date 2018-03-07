//Earn timer functions
var timerInstance = new Timer();
$('#chronoExample #startButton').click(function () {
    timerInstance.start();
});
$('#chronoExample #pauseButton').click(function () {
    timerInstance.pause();
});
$('#chronoExample #stopButton').click(function () {
    timerInstance.stop();
});
$('#chronoExample #bankButton').click(function () {
    timerInstance.pause();
});
timerInstance.addEventListener('secondsUpdated', function (e) {
    $('#chronoExample #values').html(timerInstance.getTimeValues().toString());
});
timerInstance.addEventListener('started', function (e) {
    $('#chronoExample #values').html(timerInstance.getTimeValues().toString());
});
timerInstance.addEventListener('reset', function (e) {
    $('#chronoExample #values').html(timerInstance.getTimeValues().toString());
}); 