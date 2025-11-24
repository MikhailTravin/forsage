const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
    if (bodyLockStatus) {
        const lockPaddingElements = document.querySelectorAll("[data-lp]");
        setTimeout((() => {
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = "";
            }));
            document.body.style.paddingRight = "";
            document.documentElement.classList.remove("lock");
        }), delay);
        bodyLockStatus = false;
        setTimeout((function () {
            bodyLockStatus = true;
        }), delay);
    }
};
let bodyLock = (delay = 500) => {
    if (bodyLockStatus) {
        const lockPaddingElements = document.querySelectorAll("[data-lp]");
        const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
        lockPaddingElements.forEach((lockPaddingElement => {
            lockPaddingElement.style.paddingRight = lockPaddingValue;
        }));
        document.body.style.paddingRight = lockPaddingValue;
        document.documentElement.classList.add("lock");
        bodyLockStatus = false;
        setTimeout((function () {
            bodyLockStatus = true;
        }), delay);
    }
};
function functions_FLS(message) {
    setTimeout((() => {
        if (window.FLS) console.log(message);
    }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
        target.classList.add("_slide");
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = `${target.offsetHeight}px`;
        target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout((() => {
            target.hidden = !showmore ? true : false;
            !showmore ? target.style.removeProperty("height") : null;
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            !showmore ? target.style.removeProperty("overflow") : null;
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
            document.dispatchEvent(new CustomEvent("slideUpDone", {
                detail: {
                    target
                }
            }));
        }), duration);
    }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
        target.classList.add("_slide");
        target.hidden = target.hidden ? false : null;
        showmore ? target.style.removeProperty("height") : null;
        let height = target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = height + "px";
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        window.setTimeout((() => {
            target.style.removeProperty("height");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
            document.dispatchEvent(new CustomEvent("slideDownDone", {
                detail: {
                    target
                }
            }));
        }), duration);
    }
};
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
    if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
    const media = Array.from(array).filter(function (item) {
        return item.dataset[dataSetValue];
    });

    if (media.length) {
        const breakpointsArray = media.map(item => {
            const params = item.dataset[dataSetValue];
            const paramsArray = params.split(",");
            return {
                value: paramsArray[0],
                type: paramsArray[1] ? paramsArray[1].trim() : "max",
                item: item
            };
        });

        const mdQueries = uniqArray(
            breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
        );

        const mdQueriesArray = mdQueries.map(breakpoint => {
            const [query, value, type] = breakpoint.split(",");
            const matchMedia = window.matchMedia(query);
            const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
            return { itemsArray, matchMedia };
        });

        return mdQueriesArray;
    }
}

function uniqArray(array) {
    return array.filter(function (item, index, self) {
        return self.indexOf(item) === index;
    });
}

//========================================================================================================================================================

//Меню

const menuLinks = document.querySelectorAll('.menu__link');
if (menuLinks) {
    const menuItems = document.querySelectorAll('.menu__item');
    function isMobileView() {
        return window.innerWidth <= 992;
    }

    function removeActiveClasses() {
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (!isMobileView()) {
                return;
            }

            e.preventDefault();

            const parentItem = this.closest('.menu__item');

            if (parentItem.classList.contains('active')) {
                parentItem.classList.remove('active');
            } else {
                removeActiveClasses();
                parentItem.classList.add('active');
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (!isMobileView()) return;

        if (!e.target.closest('.menu__list')) {
            removeActiveClasses();
        }
    });

    window.addEventListener('resize', function () {
        if (!isMobileView()) {
            removeActiveClasses();
        }
    });
}

const catalogButton = document.querySelector('.catalog-menu__button');
if (catalogButton) {
    function isMobileScreen() {
        return window.innerWidth <= 992;
    }

    function toggleMenu() {
        if (isMobileScreen()) {
            if (document.documentElement.classList.contains('search-open')) {
                document.documentElement.classList.remove('search-open');
                document.documentElement.classList.add('menu-open');
            } else {
                document.documentElement.classList.toggle('menu-open');
            }
        }
    }

    catalogButton.addEventListener('click', toggleMenu);

    window.addEventListener('resize', function () {
        if (!isMobileScreen()) {
            document.documentElement.classList.remove('menu-open');
        }
    });
}

//========================================================================================================================================================

//Слайдеры
if (document.querySelector('.top-block-intro__slider')) {
    const swiperIntro = new Swiper('.top-block-intro__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 600,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        pagination: {
            el: '.top-block-intro__pagination',
            clickable: true,
        },
    });
}

if (document.querySelector('.center-block-intro__slider')) {
    const swiperCenter = new Swiper('.center-block-intro__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 13,
        speed: 600,
        loop: true,
        navigation: {
            prevEl: '.center-block-intro__arrow-prev',
            nextEl: '.center-block-intro__arrow-next',
        },
        breakpoints: {
            768: {
                slidesPerView: 'auto',
                spaceBetween: 15,
            },
            992: {
                slidesPerView: 'auto',
                spaceBetween: 18,
            },
        },
    });
}

if (document.querySelector('.block-reviews__slider')) {
    const swiperReviews = new Swiper('.block-reviews__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 7,
        speed: 600,
        navigation: {
            prevEl: '.block-reviews__arrow-prev',
            nextEl: '.block-reviews__arrow-next',
        },
        breakpoints: {
            992: {
                slidesPerView: 'auto',
                spaceBetween: 10,
            },
        },
    });
}

const swiperBlockGallery = document.querySelector('.block-gallery__slider');
if (swiperBlockGallery) {
    const gallerySwiper = new Swiper('.block-gallery__slider', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        loop: true,
        navigation: {
            nextEl: '.block-gallery__arrow-next',
            prevEl: '.block-gallery__arrow-prev',
        },
        pagination: {
            el: '.block-gallery__pagination',
            clickable: true,
        },
        on: {
            init: function () {
                updateActiveSlide(this);
            },
            slideChange: function () {
                updateActiveSlide(this);
            },
        },
    });

    function updateActiveSlide(swiper) {
        const activeSlideContainer = document.querySelector('.block-gallery__active-slide');

        if (!activeSlideContainer) return;

        const activeSlide = swiper.slides[swiper.activeIndex];

        if (activeSlide) {
            const activeImage = activeSlide.querySelector('img');

            if (activeImage) {
                const activeContent = activeImage.cloneNode(true);
                activeSlideContainer.innerHTML = '';
                activeSlideContainer.appendChild(activeContent);

                activeSlideContainer.style.pointerEvents = 'auto';

                activeSlideContainer.replaceWith(activeSlideContainer.cloneNode(true));
                const newContainer = document.querySelector('.block-gallery__active-slide');

                newContainer.addEventListener('click', function () {
                    const link = activeSlide.querySelector('a')?.getAttribute('href') || activeSlide.getAttribute('href');
                    if (link && typeof Fancybox !== 'undefined') {
                        Fancybox.show([{ src: link }]);
                    }
                });
            }
        }
    }
}

function updateActiveSlide(swiper) {
    const activeSlideContainer = document.querySelector('.block-gallery__active-slide');
    const activeSlide = swiper.slides[swiper.activeIndex];

    if (activeSlide) {
        const activeContent = activeSlide.querySelector('img').cloneNode(true);
        activeSlideContainer.innerHTML = '';
        activeSlideContainer.appendChild(activeContent);

        activeSlideContainer.style.pointerEvents = 'auto';
        activeSlideContainer.addEventListener('click', function () {
            const link = activeSlide.getAttribute('href');
            Fancybox.show([{ src: link }]);
        });
    }
}

if (document.querySelector('.block-previously2__slider')) {
    let swiperPreviously = null;

    function initSwiper() {
        if (window.innerWidth > 768 && !swiperPreviously) {
            swiperPreviously = new Swiper('.block-previously2__slider', {
                observer: true,
                observeParents: true,
                slidesPerView: 'auto',
                spaceBetween: 7,
                speed: 600,
                navigation: {
                    prevEl: '.block-previously2__arrow-prev',
                    nextEl: '.block-previously2__arrow-next',
                },
                breakpoints: {
                    992: {
                        slidesPerView: 'auto',
                        spaceBetween: 15,
                    },
                },
            });
        } else if (window.innerWidth <= 768 && swiperPreviously) {
            swiperPreviously.destroy(true, true);
            swiperPreviously = null;
        }
    }

    initSwiper();

    window.addEventListener('resize', initSwiper);
}

if (document.querySelector('.block-related-products__slider')) {
    let swiperRelatedProducts = null;

    function initSwiper() {
        if (window.innerWidth > 768 && !swiperRelatedProducts) {
            swiperRelatedProducts = new Swiper('.block-related-products__slider', {
                observer: true,
                observeParents: true,
                slidesPerView: 2,
                spaceBetween: 10,
                speed: 600,
                navigation: {
                    prevEl: '.block-related-products__arrow-prev',
                    nextEl: '.block-related-products__arrow-next',
                },
                breakpoints: {
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    1240: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                    },
                },
            });
        } else if (window.innerWidth <= 768 && swiperRelatedProducts) {
            swiperRelatedProducts.destroy(true, true);
            swiperRelatedProducts = null;
        }
    }

    initSwiper();

    window.addEventListener('resize', initSwiper);
}

document.querySelectorAll('.set-product-card2__sliders').forEach((sliderContainer) => {
    const slider = sliderContainer.querySelector('.set-product-card2__slider');
    const prevArrow = sliderContainer.querySelector('.set-product-card2__arrow-prev');
    const nextArrow = sliderContainer.querySelector('.set-product-card2__arrow-next');

    if (slider && prevArrow && nextArrow) {
        new Swiper(slider, {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 5,
            speed: 600,
            navigation: {
                prevEl: prevArrow,
                nextEl: nextArrow,
            },
        });
    }
});

if (document.querySelector('.images-product')) {
    const thumbsSwiper = new Swiper('.images-product__thumb', {
        observer: true,
        observeParents: true,
        slidesPerView: 4,
        spaceBetween: 9,
        speed: 400,
        preloadImages: true,
        navigation: {
            prevEl: '.images-product__arrow-prev',
            nextEl: '.images-product__arrow-next',
        },
    });

    const mainThumbsSwiper = new Swiper('.images-product__slider', {
        thumbs: {
            swiper: thumbsSwiper
        },
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 5,
        speed: 400,
        preloadImages: true,
        navigation: {
            prevEl: '.images-product__arrow-prev',
            nextEl: '.images-product__arrow-next',
        },
    });
}

//========================================================================================================================================================

//Поиск
const searchElements = document.querySelectorAll('.search-header');
const mobileSearchBtn = document.querySelector('.bottom-header__column.search');
if (searchElements.length) {
    function closeAllSearchForms() {
        searchElements.forEach(function (searchElement) {
            searchElement.classList.remove('active');
        });
        document.documentElement.classList.remove('search-open');
    }

    searchElements.forEach(function (currentSearch) {
        const searchContent = currentSearch.querySelector('.search-header__input');

        if (searchContent) {
            searchContent.addEventListener('click', function (e) {
                e.stopPropagation();

                searchElements.forEach(function (otherSearch) {
                    if (otherSearch !== currentSearch) {
                        otherSearch.classList.remove('active');
                    }
                });

                currentSearch.classList.toggle('active');
            });
        }
    });

    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function (e) {
            e.stopPropagation();

            if (window.innerWidth <= 992) {
                document.documentElement.classList.toggle('search-open');

                searchElements.forEach(function (searchElement) {
                    searchElement.classList.remove('active');
                });
            }
        });
    }

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.search-header') && !e.target.closest('.bottom-header__column.search')) {
            closeAllSearchForms();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            document.documentElement.classList.remove('search-open');
        } else {
            searchElements.forEach(function (searchElement) {
                searchElement.classList.remove('active');
            });
        }
    });
}

//========================================================================================================================================================

//Табы
function tabs() {
    const tabs = document.querySelectorAll('[data-tabs]');
    let tabsActiveHash = [];

    if (tabs.length > 0) {
        const hash = getHash();
        if (hash && hash.startsWith('tab-')) {
            tabsActiveHash = hash.replace('tab-', '').split('-');
        }
        tabs.forEach((tabsBlock, index) => {
            tabsBlock.classList.add('_tab-init');
            tabsBlock.setAttribute('data-tabs-index', index);
            tabsBlock.addEventListener("click", setTabsAction);
            initTabs(tabsBlock);
        });

        let mdQueriesArray = dataMediaQueries(tabs, "tabs");
        if (mdQueriesArray && mdQueriesArray.length) {
            mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function () {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
        }
    }

    function setTitlePosition(tabsMediaArray, matchMedia) {
        tabsMediaArray.forEach(tabsMediaItem => {
            tabsMediaItem = tabsMediaItem.item;
            let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
            let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
            let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
            let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
            tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
            tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
            tabsContentItems.forEach((tabsContentItem, index) => {
                if (matchMedia.matches) {
                    tabsContent.append(tabsTitleItems[index]);
                    tabsContent.append(tabsContentItem);
                    tabsMediaItem.classList.add('_tab-spoller');
                } else {
                    tabsTitles.append(tabsTitleItems[index]);
                    tabsMediaItem.classList.remove('_tab-spoller');
                }
            });
        });
    }

    function initTabs(tabsBlock) {
        let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
        let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
        const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
        const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

        if (tabsActiveHashBlock) {
            const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
            tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
        }
        if (tabsContent.length) {
            tabsContent.forEach((tabsContentItem, index) => {
                tabsTitles[index].setAttribute('data-tabs-title', '');
                tabsContentItem.setAttribute('data-tabs-item', '');

                if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
                    tabsTitles[index].classList.add('_tab-active');
                }
                tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
            });
        }
        setTabsStatus(tabsBlock);
    }

    function setTabsStatus(tabsBlock) {
        let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
        let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
        const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

        function isTabsAnimate(tabsBlock) {
            if (tabsBlock.hasAttribute('data-tabs-animate')) {
                return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            return false;
        }
        const tabsBlockAnimate = isTabsAnimate(tabsBlock);

        if (tabsContent.length > 0) {
            const isHash = tabsBlock.hasAttribute('data-tabs-hash');
            tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
            tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
            tabsContent.forEach((tabsContentItem, index) => {
                if (tabsTitles[index].classList.contains('_tab-active')) {
                    if (tabsBlockAnimate) {
                        _slideDown(tabsContentItem, tabsBlockAnimate);
                    } else {
                        tabsContentItem.hidden = false;
                    }
                    if (isHash && !tabsContentItem.closest('.popup')) {
                        setHash(`tab-${tabsBlockIndex}-${index}`);
                    }
                } else {
                    if (tabsBlockAnimate) {
                        _slideUp(tabsContentItem, tabsBlockAnimate);
                    } else {
                        tabsContentItem.hidden = true;
                    }
                }
            });
        }
    }

    function setTabsAction(e) {
        const el = e.target;
        if (el.closest('[data-tabs-title]')) {
            const tabTitle = el.closest('[data-tabs-title]');
            const tabsBlock = tabTitle.closest('[data-tabs]');
            if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
                let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
                tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock);
                if (tabActiveTitle.length) tabActiveTitle[0].classList.remove('_tab-active');
                tabTitle.classList.add('_tab-active');
                setTabsStatus(tabsBlock);
            }
            e.preventDefault();
        }
    }
}
tabs();

//========================================================================================================================================================

//Маска телефона
const telephone = document.querySelectorAll('.tel');
if (telephone) {
    Inputmask({ "mask": "+7 (999) 999 - 99 - 99" }).mask(telephone);
}

//========================================================================================================================================================

//Форма
function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
    document.body.addEventListener("focusin", function (e) {
        const targetElement = e.target;
        if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
            if (!targetElement.hasAttribute('data-no-focus-classes')) {
                targetElement.classList.add('_form-focus');
                targetElement.parentElement.classList.add('_form-focus');
            }
            formValidate.removeError(targetElement);
            targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
        }
    });
    document.body.addEventListener("focusout", function (e) {
        const targetElement = e.target;
        if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
            if (!targetElement.hasAttribute('data-no-focus-classes')) {
                targetElement.classList.remove('_form-focus');
                targetElement.parentElement.classList.remove('_form-focus');
            }
            targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
        }
    });
    if (options.viewPass) {
        document.addEventListener("click", function (e) {
            const targetElement = e.target;
            if (targetElement.closest('.form__viewpass')) {
                const viewpassBlock = targetElement.closest('.form__viewpass');
                const input = viewpassBlock.closest('.form__input').querySelector('input');

                if (input) {
                    const isActive = viewpassBlock.classList.contains('_viewpass-active');
                    input.setAttribute("type", isActive ? "password" : "text");
                    viewpassBlock.classList.toggle('_viewpass-active');
                } else {
                    console.error('Input не найден!');
                }
            }
        });
    }
    if (options.autoHeight) {
        const textareas = document.querySelectorAll('textarea[data-autoheight]');
        if (textareas.length) {
            textareas.forEach(textarea => {
                const startHeight = textarea.hasAttribute('data-autoheight-min') ?
                    Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
                const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
                    Number(textarea.dataset.autoheightMax) : Infinity;
                setHeight(textarea, Math.min(startHeight, maxHeight))
                textarea.addEventListener('input', () => {
                    if (textarea.scrollHeight > startHeight) {
                        textarea.style.height = `auto`;
                        setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
                    }
                });
            });
            function setHeight(textarea, height) {
                textarea.style.height = `${height}px`;
            }
        }
    }
}
formFieldsInit({
    viewPass: true,
    autoHeight: false
});
let formValidate = {
    getErrors(form) {
        let error = 0;
        let formRequiredItems = form.querySelectorAll('*[data-required]');
        if (formRequiredItems.length) {
            formRequiredItems.forEach(formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
                    error += this.validateInput(formRequiredItem);
                }
            });
        }
        return error;
    },
    validateInput(formRequiredItem) {
        let error = 0;

        if (formRequiredItem.dataset.required === "email") {
            formRequiredItem.value = formRequiredItem.value.replace(" ", "");
            if (this.emailTest(formRequiredItem)) {
                this.addError(formRequiredItem);
                this.removeSuccess(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
                this.addSuccess(formRequiredItem);
            }
        } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
            this.addError(formRequiredItem);
            this.removeSuccess(formRequiredItem);
            error++;
        } else if (formRequiredItem.dataset.validate === "password-confirm") {
            // Проверяем, совпадает ли пароль с полем #password
            const passwordInput = document.getElementById('password');
            if (!passwordInput) return error;

            if (formRequiredItem.value !== passwordInput.value) {
                this.addError(formRequiredItem);
                this.removeSuccess(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
                this.addSuccess(formRequiredItem);
            }
        } else {
            if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                this.removeSuccess(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
                this.addSuccess(formRequiredItem);
            }
        }

        return error;
    },
    addError(formRequiredItem) {
        formRequiredItem.classList.add('_form-error');
        formRequiredItem.parentElement.classList.add('_form-error');
        let inputError = formRequiredItem.parentElement.querySelector('.form__error');
        if (inputError) formRequiredItem.parentElement.removeChild(inputError);
        if (formRequiredItem.dataset.error) {
            formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        }
    },
    removeError(formRequiredItem) {
        formRequiredItem.classList.remove('_form-error');
        formRequiredItem.parentElement.classList.remove('_form-error');
        if (formRequiredItem.parentElement.querySelector('.form__error')) {
            formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
        }
    },
    addSuccess(formRequiredItem) {
        formRequiredItem.classList.add('_form-success');
        formRequiredItem.parentElement.classList.add('_form-success');
    },
    removeSuccess(formRequiredItem) {
        formRequiredItem.classList.remove('_form-success');
        formRequiredItem.parentElement.classList.remove('_form-success');
    },
    formClean(form) {
        form.reset();
        setTimeout(() => {
            let inputs = form.querySelectorAll('input,textarea');
            for (let index = 0; index < inputs.length; index++) {
                const el = inputs[index];
                el.parentElement.classList.remove('_form-focus');
                el.classList.remove('_form-focus');
                formValidate.removeError(el);
            }
            let checkboxes = form.querySelectorAll('.checkbox__input');
            if (checkboxes.length > 0) {
                for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
            }
            if (flsModules.select) {
                let selects = form.querySelectorAll('div.select');
                if (selects.length) {
                    for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector('select');
                        flsModules.select.selectBuild(select);
                    }
                }
            }
        }, 0);
    },
    emailTest(formRequiredItem) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
    }
};
function formSubmit() {
    const forms = document.forms;
    if (forms.length) {
        for (const form of forms) {
            form.addEventListener('submit', function (e) {
                const form = e.target;
                formSubmitAction(form, e);
            });
            form.addEventListener('reset', function (e) {
                const form = e.target;
                formValidate.formClean(form);
            });
        }
    }
    async function formSubmitAction(form, e) {
        const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
        if (error === 0) {
            const ajax = form.hasAttribute('data-ajax');
            if (ajax) {
                e.preventDefault();
                const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
                const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
                const formData = new FormData(form);

                form.classList.add('_sending');
                const response = await fetch(formAction, {
                    method: formMethod,
                    body: formData
                });
                if (response.ok) {
                    let responseResult = await response.json();
                    form.classList.remove('_sending');
                    formSent(form, responseResult);
                } else {
                    alert("Помилка");
                    form.classList.remove('_sending');
                }
            } else if (form.hasAttribute('data-dev')) {
                e.preventDefault();
                formSent(form);
            }
        } else {
            e.preventDefault();
            if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
                const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
                gotoBlock(formGoToErrorClass, true, 1000);
            }
        }
    }
    function formSent(form, responseResult = ``) {
        document.dispatchEvent(new CustomEvent("formSent", {
            detail: {
                form: form
            }
        }));
        setTimeout(() => {
            if (flsModules.popup) {
                const popup = form.dataset.popupMessage;
                popup ? flsModules.popup.open(popup) : null;
            }
        }, 0);
        formValidate.formClean(form);
        formLogging(`Форма отправлена!`);
    }
    function formLogging(message) {
        FLS(`[Форма]: ${message}`);
    }
}
formSubmit()

//========================================================================================================================================================

// Добавление к шапке при скролле
const header = document.querySelector('.header');
if (header) {
    function updateHeader() {
        if (window.scrollY > 0) {
            header.classList.add('_header-scroll');
        } else {
            header.classList.remove('_header-scroll');
        }
    }

    updateHeader();

    window.addEventListener('scroll', updateHeader);
}

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
    // опции
});

//========================================================================================================================================================

//Звездный рейтинг
function formRating() {
    const ratings = document.querySelectorAll('[data-rating]');
    if (ratings) {
        ratings.forEach(rating => {
            const ratingValue = +rating.dataset.ratingValue;
            const ratingSize = +rating.dataset.ratingSize ? +rating.dataset.ratingSize : 5;
            formRatingInit(rating, ratingSize);
            ratingValue ? formRatingSet(rating, ratingValue) : null;
            document.addEventListener('click', formRatingAction);
        });
    }

    function formRatingAction(e) {
        const targetElement = e.target;
        if (targetElement.closest('.rating__input')) {
            const currentElement = targetElement.closest('.rating__input');
            const ratingValue = +currentElement.value;
            const rating = currentElement.closest('.rating');
            const ratingSet = rating.dataset.rating === 'set';
            ratingSet ? formRatingGet(rating, ratingValue) : null;
        }
    }

    function formRatingInit(rating, ratingSize) {
        let ratingItems = ``;
        for (let index = 0; index < ratingSize; index++) {
            index === 0 ? ratingItems += `<div class="rating__items">` : null;
            ratingItems += `
                <label class="rating__item">
                    <input class="rating__input" type="radio" name="rating" value="${index + 1}">
                </label>`;
            index === ratingSize ? ratingItems += `</div">` : null;
        }
        rating.insertAdjacentHTML("beforeend", ratingItems);
    }

    function formRatingGet(rating, ratingValue) {
        const resultRating = ratingValue;
        formRatingSet(rating, resultRating);
    }

    function formRatingSet(rating, value) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        const resultFullItems = parseInt(value);
        const resultPartItem = value - resultFullItems;

        rating.hasAttribute('data-rating-title') ? rating.title = value : null;

        ratingItems.forEach((ratingItem, index) => {
            ratingItem.classList.remove('rating__item--active');
            ratingItem.querySelector('span') ? ratingItems[index].querySelector('span').remove() : null;

            if (index <= (resultFullItems - 1)) {
                ratingItem.classList.add('rating__item--active');
            }
            if (index === resultFullItems && resultPartItem) {
                ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`);
            }
        });
    }

    function formRatingSend() {
    }
}
formRating();

//========================================================================================================================================================

//Карта
function initMapsByClass() {
    if (typeof ymaps === 'undefined') {
        console.warn('Yandex Maps API не загружено');
        return;
    }

    ymaps.ready(() => {
        const mapElements = document.querySelectorAll('.block-contacts__map');

        mapElements.forEach(element => {
            try {
                const center = JSON.parse(element.dataset.center);
                const zoom = parseInt(element.dataset.zoom);
                const hintContent = element.dataset.hint;

                const myMap = new ymaps.Map(element.id, {
                    center: center,
                    zoom: zoom,
                    controls: ['zoomControl'],
                    behaviors: ['drag']
                });

                const placemark = new ymaps.Placemark(center, {
                    iconCaption: hintContent
                }, {
                    preset: 'islands#icon',
                    iconColor: '#ff0000',
                });

                myMap.geoObjects.add(placemark);

            } catch (error) {
                console.error(`Ошибка при инициализации карты #${element.id}:`, error);
            }
        });
    });
}
initMapsByClass();

//========================================================================================================================================================

//Карточка товара
const productImageContainer = document.querySelector('.product-card-block-intro__images img');
if (productImageContainer) {
    const initialImage = productImageContainer ? productImageContainer.src : '';

    const colorButtons = document.querySelectorAll('.colors-product-card__btn');

    let activeButton = null;

    function changeProductImage(imagePath) {
        if (productImageContainer) {
            productImageContainer.src = imagePath;
        }
    }

    function resetToInitial() {
        if (productImageContainer && initialImage) {
            productImageContainer.src = initialImage;
        }

        colorButtons.forEach(button => {
            button.classList.remove('active');
        });

        activeButton = null;
    }

    function activateButton(clickedButton) {
        colorButtons.forEach(button => {
            button.classList.remove('active');
        });

        clickedButton.classList.add('active');
        activeButton = clickedButton;
    }

    colorButtons.forEach(button => {
        button.addEventListener('click', function () {
            const imagePath = this.getAttribute('data-image');

            if (this === activeButton) {
                resetToInitial();
                return;
            }

            changeProductImage(imagePath);

            activateButton(this);
        });
    });
}

//========================================================================================================================================================

//Показать еще
const headingComplexBlocks = document.querySelectorAll('.heading-complex__showmore');
if (headingComplexBlocks) {
    headingComplexBlocks.forEach(block => {
        const textElement = block.querySelector('p');
        const moreButton = block.querySelector('.heading-complex__more');

        let originalMaxHeight = null;

        function getOriginalMaxHeight() {
            if (!originalMaxHeight) {
                block.classList.remove('active');
                const computedStyle = window.getComputedStyle(block);
                originalMaxHeight = parseFloat(computedStyle.height);
            }
            return originalMaxHeight;
        }

        function checkTextHeight() {
            const wasActive = block.classList.contains('active');
            block.classList.remove('active');

            const textHeight = textElement.scrollHeight;
            const maxHeight = getOriginalMaxHeight();

            if (wasActive) {
                block.classList.add('active');
            }

            if (textHeight > maxHeight) {
                moreButton.hidden = false;
            } else {
                moreButton.hidden = true;
                block.classList.remove('active');
            }
        }

        moreButton.addEventListener('click', function () {
            const isExpanded = block.classList.contains('active');

            if (isExpanded) {
                block.classList.remove('active');
            } else {
                block.classList.add('active');
            }
        });

        let resizeTimeout;
        function handleResize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(checkTextHeight, 100);
        }

        checkTextHeight();
        window.addEventListener('resize', handleResize);
    });
}

//========================================================================================================================================================

//Фильтр
const filterButtons = document.querySelectorAll('.heading-complex__title');
if (filterButtons) {
    const configurationItems = document.querySelectorAll('.checkbox-block-configuration');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');

            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            this.classList.add('active');

            configurationItems.forEach(item => {
                const itemFilter = item.getAttribute('data-filter');

                if (filterValue === 'all' || itemFilter === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
}

//========================================================================================================================================================

//Спойлер
function spollers() {
    const spollersArray = document.querySelectorAll("[data-spollers]");
    if (spollersArray.length > 0) {
        const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
            return !item.dataset.spollers.split(",")[0];
        }));
        if (spollersRegular.length) initSpollers(spollersRegular);

        spollersArray.forEach(spollersBlock => {
            const mediaQuery = spollersBlock.dataset.spollers;
            if (mediaQuery) {
                const [maxWidth, type] = mediaQuery.split(",");
                const width = parseInt(maxWidth);

                if (type === "max" && window.innerWidth <= width) {
                    if (!spollersBlock.classList.contains("_spoller-init")) {
                        initSpollers([spollersBlock]);
                    }
                } else if (type === "max" && window.innerWidth > width) {
                    if (spollersBlock.classList.contains("_spoller-init")) {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                }
            }
        });

        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach((spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add("_spoller-init");
                    initSpollerBody(spollersBlock);
                    spollersBlock.addEventListener("click", setSpollerAction);
                } else {
                    spollersBlock.classList.remove("_spoller-init");
                    initSpollerBody(spollersBlock, false);
                    spollersBlock.removeEventListener("click", setSpollerAction);
                }
            }));
        }

        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
            if (spollerTitles.length) {
                spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                spollerTitles.forEach((spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute("tabindex");
                        if (!spollerTitle.classList.contains("_spoller-active")) {
                            spollerTitle.nextElementSibling.hidden = true;
                        }
                    } else {
                        spollerTitle.setAttribute("tabindex", "-1");
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                }));
            }
        }

        function setSpollerAction(e) {
            const el = e.target;
            if (el.closest("[data-spoller]")) {
                const spollerTitle = el.closest("[data-spoller]");

                const spollerItem = spollerTitle.closest(".spollers__item, .menu__item");
                const spollersBlock = spollerTitle.closest("[data-spollers]");

                const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

                if (!spollersBlock.querySelectorAll("._slide").length) {
                    if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
                        hideSpollersBody(spollersBlock);
                    }

                    spollerTitle.classList.toggle("_spoller-active");
                    if (spollerItem) spollerItem.classList.toggle("_spoller-active");

                    const contentBlock = spollerTitle.nextElementSibling;
                    _slideToggle(contentBlock, spollerSpeed);

                    e.preventDefault();
                }
            }
        }

        function hideSpollersBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                const spollerItem = spollerActiveTitle.closest(".spollers__item, .menu__item");

                spollerActiveTitle.classList.remove("_spoller-active");
                if (spollerItem) spollerItem.classList.remove("_spoller-active");
                _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
            }
        }

        const spollersClose = document.querySelectorAll("[data-spoller-close]");
        if (spollersClose.length) {
            document.addEventListener("click", (function (e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) {
                    spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        spollerClose.classList.remove("_spoller-active");

                        const spollerItem = spollerClose.closest(".spollers__item, .menu__item");
                        if (spollerItem) spollerItem.classList.remove("_spoller-active");

                        _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                    }));
                }
            }));
        }
    }
}
spollers();

//========================================================================================================================================================

//Категории
const catalogItems = document.querySelector('.categories-block-catalog');
if (catalogItems) {
    const catalogButton = document.querySelector('.block-catalog__categories-button');
    const catalogClose = document.querySelector('.categories-block-catalog__close');
    catalogButton.addEventListener('click', function (e) {
        e.stopPropagation();
        document.documentElement.classList.add('catalog-open');
    });

    if (catalogClose) {
        catalogClose.addEventListener('click', function () {
            document.documentElement.classList.remove('catalog-open');
        });
    }

    document.addEventListener('click', function (e) {
        if (!catalogItems.contains(e.target) && !catalogButton.contains(e.target)) {
            document.documentElement.classList.remove('catalog-open');
        }
    });

    catalogItems.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}

//========================================================================================================================================================

//Избранное
const favoritesIcons = document.querySelectorAll('.favorites-icons');
if (favoritesIcons) {
    favoritesIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    });
}

//========================================================================================================================================================

//Количество
function formQuantity() {
    document.addEventListener("click", function (e) {
        let targetElement = e.target;
        if (targetElement.closest('[data-quantity-plus]') || targetElement.closest('[data-quantity-minus]')) {
            const quantityElement = targetElement.closest('[data-quantity]');
            const valueElement = quantityElement.querySelector('input[type="text"]');
            let value = parseInt(valueElement.value) || 0;

            if (targetElement.closest('[data-quantity-plus]')) {
                value++;
                if (quantityElement.dataset.quantityMax && +quantityElement.dataset.quantityMax < value) {
                    value = quantityElement.dataset.quantityMax;
                }
            } else {
                value--;
                if (quantityElement.dataset.quantityMin) {
                    if (+quantityElement.dataset.quantityMin > value) {
                        value = quantityElement.dataset.quantityMin;
                    }
                } else if (value < 1) {
                    value = 1;
                }
            }
            valueElement.value = value;
        }
    });
}
formQuantity();