var myCb = function(inp) {
    $('#outptTest').val(inp);
}

//TEST FNS

document.querySelector('#doAlrt').onclick = function() {
    sandalchest.alert('Alerts Are Cool!', 'All the cool kids are using alerts!', myCb);
}
document.querySelector('#doSlowAlrt').onclick = function() {
    sandalchest.alert({ speed: 4000 }, 'Slow Alerts Are Okay!', 'Phew, got here finally!', myCb);
}

document.querySelector('#doConf').onclick = function() {
    sandalchest.confirm('Whoa!', 'Are you sure you wanna use SandalChest? Of course you are.', myCb);
}

document.querySelector('#doProm').onclick = function() {
    sandalchest.prompt('Prompts too!', 'No more ugly vanilla window.prompts!', myCb);
}

document.querySelector('#doRotConf').onclick = function() {
    sandalchest.confirm('Fancy!', { rotation: 50 }, 'I\'m falling over! Help!', myCb);
}

document.querySelector('#doCustom').onclick = function() {
    sandalchest.dialog('This one\'s Custom!', {
        buttons: [{
            text: 'Go away!',
            close: true,
            click: function() { alert('See ya later!') }
        },
        {
            text: 'Bad Number!',
            close: false,
            click: function() { alert('Okay, resetting that field to zero');document.querySelector('#myNum').value=0 }
        },
        {
            text: 'Say my #!',
            close: false,
            click: function() { alert('Your favorite number is: '+document.querySelector('#myNum').value); }
        }]
    }, 'You can write your own dialogs!<br/>My favorite number is: <input type="number" id="myNum" value=0>');
}
