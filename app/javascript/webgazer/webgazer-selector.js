// import  webgazer from 'webgazer'; // npm package 'webgazer' is sync with this repository

window.onload = async function () {

  // if (!window.saveDataAcrossSessions) {
  //   var localstorageDataLabel = 'webgazerGlobalData';
  //   localforage.setItem(localstorageDataLabel, null);
  //   var localstorageSettingsLabel = 'webgazerGlobalSettings';
  //   localforage.setItem(localstorageSettingsLabel, null);
  // }
  webgazer.params.showVideoPreview = true;
  const webgazerInstance = await webgazer.setRegression('ridge') /* currently must set regression and tracker */
    .setTracker('TFFacemesh')
    .begin();
  webgazerInstance.showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */
  // Add the SVG component on the top of everything.
  var yes_elem = document.getElementById('yes')
  var no_elem = document.getElementById('no')

  function addClass(el, className)
  {
    if (el.classList)
      el.classList.add(className)
    else if (!hasClass(el, className))
      el.className += " " + className;
  }

  function removeClass(el, className)
  {
    if (el.classList)
      el.classList.remove(className)
    else if (hasClass(el, className))
    {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    }
  }

  webgazer.setGazeListener(function (data, elapsedTime) {
    if (data == null) {
      return;
    }
    var xprediction = data.x; //these x coordinates are relative to the viewport
    var yprediction = data.y; //these y coordinates are relative to the viewport
    // if(clickInterval) {
    //   // clearInterval(clickInterval);
    //   // clickInterval = null;
    // }
    if(data.x >= yes_elem.offsetLeft && data.x <= (yes_elem.offsetLeft + yes_elem.offsetWidth) &&
      data.y >= yes_elem.offsetTop && data.y <= (yes_elem.offsetTop + yes_elem.offsetHeight)) {
      removeClass(no_elem, 'hover')
      addClass(yes_elem, 'hover')
    } else if(data.x >= no_elem.offsetLeft && data.x <= (no_elem.offsetLeft + no_elem.offsetWidth) &&
      data.y >= no_elem.offsetTop && data.y <= (no_elem.offsetTop + no_elem.offsetHeight)) {
      removeClass(yes_elem, 'hover')
      addClass(no_elem, 'hover')
    } else {
      removeClass(yes_elem, 'hover')
      removeClass(no_elem, 'hover')
    }
  })

  console.log('click setup')
  var clickInterval = setInterval(function() {
    console.log('click setup')
    if(webgazer.isReady()) {
      clearInterval(clickInterval)
      document.getElementById('notice').innerHTML = 'Running'
    }
  }, 1000)

  // setTimeout(function () {
  //
  //   var event = new MouseEvent('click', {
  //     "view": window,
  //     "bubbles": true,
  //     "cancelable": true
  //   });
  //   // and then "dispatch" that event to the targeted
  //   // element which should trigger the handlers
  //   yes_elem.dispatchEvent(event);
  //
  // }, 2000)
};

window.onbeforeunload = function () {
  // if (window.saveDataAcrossSessions) {
  webgazer.end();
  // } else {
  //   localforage.clear();
  // }
}
