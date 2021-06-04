"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // menu
    document.querySelectorAll('.navbar-toggle').forEach(element => {
        element.addEventListener("click", function (event) {
            let menu = document.querySelector(this.dataset.target);
            if (menu.clientHeight == 0) {
                menu.classList.add('expanded')
            } else {
                menu.classList.remove('expanded')
            }
        });
    });

    ///iframes swap and like remain
    const mainCameraIframe = document.querySelector('#main-camera');
    const btnLike = document.querySelector('.btn-like');

    document.querySelectorAll('.side-cameras .camera-plug').forEach(element => {
        element.addEventListener('click', function (event) {
            if (event.target.classList.contains('camera-plug')) {
                const cameraPlug = event.target;
                const sideIframe = cameraPlug.nextElementSibling;

                let temp = sideIframe.getAttribute('src');
                sideIframe.setAttribute('src', mainCameraIframe.getAttribute('src'));
                mainCameraIframe.setAttribute('src', temp);

                temp = sideIframe.dataset.like;
                sideIframe.dataset.like = mainCameraIframe.dataset.like;
                mainCameraIframe.dataset.like = temp;

                if (mainCameraIframe.dataset.like === "1") {
                    btnLike.classList.add('active');
                } else {
                    btnLike.classList.remove('active');
                }
            }
        });
    });

    if (btnLike != null) {
        btnLike.addEventListener('click', function (event) {
            event.target.classList.toggle('active');
            mainCameraIframe.dataset.like = mainCameraIframe.dataset.like === "0" ? "1" : "0"
        });
    }

    ///map scale

    const mapWrapper = document.querySelector('.map-wrapper');
    const zoomIn = document.querySelector('.sign-plus');
    const zoomOut = document.querySelector('.sign-minus');

    if (zoomIn != null) {
        zoomIn.addEventListener('click', function () {
            let newScale = mapWrapper.dataset.scale * 1.2;
            if (newScale == 8) return;
            mapWrapper.style.transform = `scale(${newScale})`;
            mapWrapper.dataset.scale = newScale;
        });
    }
    if (zoomOut != null) {
        zoomOut.addEventListener('click', function () {
            let newScale = mapWrapper.dataset.scale / 1.2;
            if (newScale < 0.2) return;
            mapWrapper.style.transform = `scale(${newScale})`;
            mapWrapper.dataset.scale = newScale;
        });
    }

    if (mapWrapper != null) {
        dragElement(mapWrapper);
    }

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, initOffset = elmnt.offsetTop;
        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - initOffset - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});