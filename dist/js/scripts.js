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

//========================================================================================================================================================

// Поиск
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
    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            header.classList.add('_header-scroll');
        } else {
            header.classList.remove('_header-scroll');
        }
    });
}