var sandalchest = {};

sandalchest.drawDiv = function(opts, type, cb) {
    var theSpeed = opts.options && opts.options.speed || 1000;
    var theRot = opts.options && opts.options.rotation || 2;
    var modlBg = document.createElement('div');
    modlBg.id = 'sandalchest-modal-bg';
    modlBg.innerHTML = '&nbsp;';
    var modalBox = document.createElement('div');
    modalBox.className = 'col-sm-12 col-md-4 col-md-offset-4 sandalchest-modal-main';
    modalBox.innerHTML = '<h2>' + (opts.title || 'Untitled') + '</h2>' + '<div class="sandalchest-text-main">' + (opts.text || 'No content!') + '</div>';
    modalBox.style.transform = 'rotateZ('+theRot+'deg)';
    //modal finished! Append!
    $(modlBg).append(modalBox)
        //now add the special effects (scroll ends). top first
    var modalBoxScTop = document.createElement('div');
    var modalBoxScBot = document.createElement('div');
    modalBoxScTop.className = 'sandalchest-modal-scroll-top';
    modalBoxScBot.className = 'sandalchest-modal-scroll-bot';
    $(modalBox).append(modalBoxScTop);
    $(modalBox).append(modalBoxScBot);
    //right scroll caps
    var modalBoxScRT = document.createElement('div');
    modalBoxScRT.className = 'sandalchest-modal-scroll-right';
    $(modalBoxScTop).append(modalBoxScRT);
    var modalBoxScRB = document.createElement('div');
    modalBoxScRB.className = 'sandalchest-modal-scroll-right';
    $(modalBoxScBot).append(modalBoxScRB);

    //left scroll caps
    var modalBoxScLT = document.createElement('div');
    modalBoxScLT.className = 'sandalchest-modal-scroll-left';
    $(modalBoxScTop).append(modalBoxScLT);
    var modalBoxScLB = document.createElement('div');
    modalBoxScLB.className = 'sandalchest-modal-scroll-left';
    $(modalBoxScBot).append(modalBoxScLB);

    $('body').append(modlBg);
    $(modlBg).fadeIn(250);
    $(modalBox).animate({
        height: '80vh',
        top: '10vh'
    }, {
        duration: theSpeed,
        queue: false
    });
    $(modalBoxScTop).animate({
        height: '0%'
    }, {
        duration: theSpeed,
        queue: false
    });
    $(modalBoxScBot).animate({
        height: '0%'
    }, {
        duration: theSpeed,
        queue: false
    });
    $('.sandalchest-modal-scroll-right').animate({
        width: '.25%'
    }, {
        duration: theSpeed,
        queue: false
    });
    $('.sandalchest-modal-scroll-left').animate({
        width: '.25%'
    }, {
        duration: theSpeed,
        queue: false
    });
    //now add appropriate buttons
    var okBut = document.createElement('button');
    var noBut = document.createElement('button');
    var inpBox = document.createElement('input');
    okBut.className = 'btn btn-stone two-but';
    noBut.className = 'btn btn-stone two-but-two';
    okBut.id = 'sandalchest-okay';
    noBut.id = 'sandalchest-nope';
    okBut.tabIndex = 0;
    noBut.tabIndex = 1;
    okBut.innerHTML = 'Okay';
    noBut.innerHTML = 'Cancel';
    inpBox.id = 'sandalchest-input';
    var promptVal = null;

    if (type == 0) {
        //alert
        $(modalBox).append(okBut);
        okBut.className = 'btn btn-stone one-but';
    } else {
        $(modalBox).append(okBut);
        $(modalBox).append(noBut);
        if (type == 1) {
            //confirm
        } else {
            $('.sandalchest-text-main').append('<br/><br/>').append(inpBox);
            //prompt
            inpBox.tabIndex = 0;
            okBut.tabIndex = 1;
            noBut.tabIndex = 2;
        }
    }
    document.querySelector('#sandalchest-okay').onkeyup = function(e) {
        if (e.which == 27) {
            $('#sandalchest-nope').click();
        }
    }
    if (type < 2) {
        document.querySelector('#sandalchest-okay').focus();
    } else {
        document.querySelector('#sandalchest-input').focus();
        document.querySelector('#sandalchest-input').onkeyup = function(e) {
            console.log(e)
            if (e.which == 27) {
                $('#sandalchest-nope').click();
            } else if (e.which == 13) {
                $('#sandalchest-okay').click();
            }
        }
    }
    okBut.onclick = function() {
        $(modlBg).fadeOut(250, function() {
            if (type > 1) {
                promptVal = $('#sandalchest-input').val() || false;
            } else if (type == 1) {
                promptVal = true;
            }
            if (cb) {
                cb(promptVal);
            }
            $(this).remove();
        });
    }
    noBut.onclick = function() {
        $(modlBg).fadeOut(250, function() {
            if (cb) {
                cb(null);
            }
            console.log(null)
            $(this).remove();
        });
    }
}
sandalchest.alert = function(title, text, op, cb) {
    //dealing with multiple param combos:
    console.log(arguments);
    var realTitle =null;
    var realText = null;
    var realOp = null;
    var realCb = null;
    for (var i=0;i<arguments.length;i++){
      if(typeof arguments[i]=='string' && realTitle==null){
        realTitle = arguments[i];
      }else if (typeof arguments[i]=='string' && realText ==null){
        realText = arguments[i];
      }else if(typeof arguments[i]=='string'){
        throw new Error('Too many string params supplied!');
      }
      if (typeof arguments[i]=='object' && realOp == null){
        realOp = arguments[i];
      }else if (typeof arguments[i]=='object'){
        throw new Error('Too many configuration objects supplied!')
      }
      if (typeof arguments[i]=='function' && realCb==null){
        realCb = arguments[i];
      }else if (typeof arguments[i]=='function'){
        throw new Error('You can only have one callback function!')
      }
    }
    var opts = {
      title:realTitle,
      text:realText,
      cb:realCb,
      options:realOp
    }
    sandalchest.drawDiv(opts, 0, cb);
}
sandalchest.confirm = function(title, text, op, cb) {
    //dealing with multiple param combos:
    console.log(arguments);
    var realTitle =null;
    var realText = null;
    var realOp = null;
    var realCb = null;
    for (var i=0;i<arguments.length;i++){
      if(typeof arguments[i]=='string' && realTitle==null){
        realTitle = arguments[i];
      }else if (typeof arguments[i]=='string' && realText ==null){
        realText = arguments[i];
      }else if(typeof arguments[i]=='string'){
        throw new Error('Too many string params supplied!');
      }
      if (typeof arguments[i]=='object' && realOp == null){
        realOp = arguments[i];
      }else if (typeof arguments[i]=='object'){
        throw new Error('Too many configuration objects supplied!')
      }
      if (typeof arguments[i]=='function' && realCb==null){
        realCb = arguments[i];
      }else if (typeof arguments[i]=='function'){
        throw new Error('You can only have one callback function!')
      }
    }
    var opts = {
      title:realTitle,
      text:realText,
      cb:realCb,
      options:realOp
    }
    sandalchest.drawDiv(opts, 1, cb);
}
sandalchest.prompt = function(title, text, op, cb) {
    //dealing with multiple param combos:
    console.log(arguments);
    var realTitle =null;
    var realText = null;
    var realOp = null;
    var realCb = null;
    for (var i=0;i<arguments.length;i++){
      if(typeof arguments[i]=='string' && realTitle==null){
        realTitle = arguments[i];
      }else if (typeof arguments[i]=='string' && realText ==null){
        realText = arguments[i];
      }else if(typeof arguments[i]=='string'){
        throw new Error('Too many string params supplied!');
      }
      if (typeof arguments[i]=='object' && realOp == null){
        realOp = arguments[i];
      }else if (typeof arguments[i]=='object'){
        throw new Error('Too many configuration objects supplied!')
      }
      if (typeof arguments[i]=='function' && realCb==null){
        realCb = arguments[i];
      }else if (typeof arguments[i]=='function'){
        throw new Error('You can only have one callback function!')
      }
    }
    var opts = {
      title:realTitle,
      text:realText,
      cb:realCb,
      options:realOp
    }
    sandalchest.drawDiv(opts, 2, cb);
}

