"use strict";

function Carousel(wrapper, gap, options) {
    this.options = options == undefined ? {} : options;
    this.wrapper = wrapper
    this.gap = gap

    this.carousel = document.querySelector(`#${wrapper} .carousel`);
    this.content = document.querySelector(`#${wrapper} .carousel__content`);
    this.next = document.querySelector(`#${wrapper} .next`);
    this.prev = document.querySelector(`#${wrapper} .prev`);
    this.items = document.querySelectorAll(`#${wrapper} .carousel__item`);
    this.width = this.carousel.offsetWidth;

    this.showNextSlide = function () {
        if (this.content.scrollWidth - this.width - this.gap < this.carousel.scrollLeft + this.width) {
            this.carousel.scrollBy(-this.content.scrollWidth, 0);
        }
        this.carousel.scrollBy(this.width + this.gap, 0);
    }

    this.showPreviousSlide = function () {
        if (this.carousel.scrollLeft - this.width - this.gap < 0) {
            this.carousel.scrollBy(this.content.scrollWidth - this.width, 0);
        }
        this.carousel.scrollBy(-(this.width + this.gap), 0);
    }

    if (this.options.buttonControls != undefined && this.options.buttonControls) {
        this.next.addEventListener("click", e => {
            this.showNextSlide();
        });

        this.prev.addEventListener("click", e => {
            this.showPreviousSlide();
        });
    }

    window.addEventListener("resize", e => {
        this.width = this.carousel.offsetWidth
    });

    if (this.options.timer != undefined) {
        let pauseAutoSlide = false;
        setInterval(() => {
            if (!pauseAutoSlide) {
                this.showNextSlide();
            }
        }, this.options.timer);
        this.items.forEach(item => {
            item.addEventListener("click", () => {
                pauseAutoSlide = true;
                setTimeout(() => pauseAutoSlide = false, 20000);
            });
        });
    }
}

const testimonialsSlider = new Carousel('testimonialsSlider', 0, { timer: 10000, buttonControls: false });
const carouselSlider = new Carousel('carousel-wrapper', 0, {buttonControls: true});




