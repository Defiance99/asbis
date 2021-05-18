import '../styles/style.scss'
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        navigation: {
            nextEl: ".swiper-butt-next",
            prevEl: ".swiper-butt-prev",
        },
        breakpoints: {
            100: {
                slidesPerView: "auto",
                centeredSlides: true,
                slidesPerGroup: 1,
                spaceBetween: 10,

            },
            950: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            1400: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
        }
    });

    let filters = document.querySelectorAll('.filters__button');
    let slidesFemale = document.querySelectorAll('.swiper-container .swiper-slide[data-filter="female"]');
    let slidesMale = document.querySelectorAll('.swiper-container .swiper-slide[data-filter="male"]');

    let filterButtonByMale = document.querySelector('.filters__button[value="male"]');
    let filterButtonByFemale = document.querySelector('.filters__button[value="female"]');
    let filterButtonAll = document.querySelector('.filters__button[value="all"]');

    filterButtonByMale.addEventListener('click', () => initFilters(slidesMale, filterButtonByMale));
    filterButtonByFemale.addEventListener('click', () => initFilters(slidesFemale, filterButtonByFemale));
    filterButtonAll.addEventListener('click', () => initFilters(Array.from(slidesFemale).concat(Array.from(slidesMale)), filterButtonAll));

    let event = new Event('click');
    filterButtonByMale.dispatchEvent(event);

    // highlight filters when slides per group have a different filter target
    swiper.on('activeIndexChange', (swiper) => {
        if (filters[0].classList.contains('filters__button_active') && window.innerWidth >= 950 && window.innerWidth < 1400) {
            if (swiper.slides.length > 1 && 
                swiper.slides[swiper.activeIndex].getAttribute('data-filter') != 
                swiper.slides[swiper.activeIndex + 1].getAttribute('data-filter')) showCurrentFilter();
            else hiddenCurrentFilter();
        }else {
            hiddenCurrentFilter();
        }
    })

    function initFilters(slides, button) {
        deactivateButtons();
        activateButton(button);
        swiper.removeAllSlides();
        swiper.appendSlide(slides);
    }

    function deactivateButtons() {
        for (let i = 0; i < filters.length; i++) {
            filters[i].classList.remove('filters__button_active');
        }
    }

    function activateButton(button) {
        button.classList.add('filters__button_active');
    }

    function showCurrentFilter() {
        for (let i = 1; i < filters.length; i++) {
            filters[i].classList.add('filters__button_show');
        }
    }

    function hiddenCurrentFilter() {
        for (let i = 0; i < filters.length; i++) {
            filters[i].classList.remove('filters__button_show');
        }
    }
});