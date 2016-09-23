var myCb = function(inp) {
    $('#outptTest').val(inp);
}

//TEST FNS

document.querySelector('#doAlrt').onclick = function() {
    sandalchest.alert('Alerts Are Cool!', 'All the cool kids are using alerts!', myCb);
}
document.querySelector('#doSlowAlrt').onclick = function() {
    sandalchest.alert({speed:4000},'Slow Alerts Are Okay!', 'Phew, got here finally!', myCb);
}

document.querySelector('#doConf').onclick = function() {
    sandalchest.confirm('Whoa!', 'Are you sure you wanna use SandalChest? Of course you are.', myCb);
}

document.querySelector('#doProm').onclick = function() {
    sandalchest.prompt('Prompts too!', 'No more ugly vanilla window.prompts!', myCb);
}

document.querySelector('#doRotConf').onclick = function() {
    sandalchest.confirm('Fancy!',{rotation:50}, 'I\'m falling over! Help!', myCb);
}
