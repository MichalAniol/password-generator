const setConsole = () => (function () {
    let styles = [
        'background: linear-gradient(169deg, #f60707 0%, #ffd600 38%, #edff00 51%, #c4ed18 62%, #00ff19 100%)',
        'border: 1px solid #3E0E02',
        'width: 220px',
        'color: black',
        'display: block',
        'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
        'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
        'line-height: 30px',
        'text-align: center',
        'font-weight: bold',
        'font-size: 24px',
        'margin: 10px 0',
        'padding: 10px 0 15px 0'
    ].join(';');
    console.log('%c👉👈', styles);
    let styles2 = [
        'background: linear-gradient(169deg, #f60707 0%, #ffd600 38%, #edff00 51%, #c4ed18 62%, #00ff19 100%)',
        'border: 1px solid #3E0E02',
        'width: 220px',
        'color: black',
        'display: block',
        'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
        'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
        'line-height: 18px',
        'text-align: center',
        'font-weight: bold',
        'font-size: 16px',
        'margin: 10px 0',
        'padding: 10px 0 15px 0'
    ].join(';');
    console.log('%c   𝒂𝒖𝒕𝒐𝒓: 𝐌𝐢𝐜𝐡𝐚𝐥 𝐀𝐧𝐢𝐨𝐥 😎   ', styles2);
}());
const checked = {
    yes: 'yes',
    no: 'no',
};
const getStorage = async () => {
    const names = {
        azSmall: 'azSmall',
        azBig: 'azBig',
        numbers: 'numbers',
        specials: 'specials',
        length: 'length',
    };
    const defaultData = {
        azSmall: checked.yes,
        azBig: checked.yes,
        numbers: checked.yes,
        specials: [
            checked.yes, checked.yes, checked.yes, checked.yes,
            checked.yes, checked.yes, checked.yes, checked.yes,
            checked.yes, checked.yes, checked.yes, checked.yes,
            checked.yes, checked.yes, checked.yes, checked.yes,
            checked.yes, checked.yes, checked.yes, checked.yes,
            checked.yes, checked.yes, checked.yes, checked.yes,
            checked.no, checked.no, checked.no, checked.no,
            checked.no, checked.no, checked.no, checked.no,
        ],
        length: 8,
    };
    const isValidJSONStringify = (str) => {
        try {
            JSON.stringify(str);
            return true;
        }
        catch {
            return false;
        }
    };
    const set = (key, value) => {
        if (isValidJSONStringify(value)) {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else {
            localStorage.setItem(key, value.toString());
        }
    };
    const isValidJSONParse = (str) => {
        try {
            JSON.stringify(str);
            return true;
        }
        catch {
            return false;
        }
    };
    const get = (key) => {
        const value = localStorage.getItem(key);
        if (!value)
            return null;
        if (typeof value === 'boolean')
            return `${value}`;
        if (isValidJSONParse(value)) {
            return JSON.parse(value);
        }
        else {
            return value.toString();
        }
    };
    const initData = () => {
        const list = Object.keys(names);
        list.forEach((k) => {
            const data = get(k);
            if (!data && defaultData[k])
                set(k, defaultData[k]);
        });
    };
    initData();
    return {
        names,
        set,
        get,
    };
};
const dom = (function () {
    const byId = (name) => document.getElementById(name);
    const byQuery = (query) => document.querySelector(query);
    const byQueryAll = (query) => document.querySelectorAll(query);
    const byQ = (elem, query) => elem.querySelector(query);
    const byQAll = (elem, query) => elem.querySelectorAll(query);
    const setStyle = (element, style, value) => element.style[style] = value;
    const setAllStyles = (styles) => styles.forEach((s) => setStyle(s[0], s[1], s[2]));
    const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);
    const setAllAttributes = (attributes) => attributes.forEach((a) => a[0].setAttribute(a[1], a[2]));
    const getAttribute = (element, attribute) => element.getAttribute(attribute);
    const disable = (elem) => elem.setAttribute('disabled', '');
    const enable = (elem) => elem.removeAttribute('disabled');
    const check = (elem) => elem.checked = true;
    const uncheck = (elem) => elem.checked = false;
    const display = (elem, attribute) => elem.style.display = attribute;
    const setColor = (elem, color) => elem.style.color = color;
    const removeClass = (elem, attribute) => elem.classList.remove(attribute);
    const addClass = (elem, attribute) => elem.classList.add(attribute);
    const colors = {
        line: 'var(--line_color)',
        prime: 'var(--prime_color)',
        off1: 'var(--off_prime_color)',
        off2: 'var(--off_second_color)',
    };
    const add = (elem, name, fn) => elem.addEventListener(name, fn);
    const xmlns = 'http://www.w3.org/2000/svg';
    const newNS = (name) => document.createElementNS(xmlns, 'rect');
    const newElem = (name) => document.createElement(name);
    const append = (parent, elem) => parent.append(elem);
    return {
        byId,
        byQuery,
        byQueryAll,
        byQ,
        byQAll,
        setStyle,
        setAllStyles,
        setAttribute,
        setAllAttributes,
        getAttribute,
        disable,
        enable,
        check,
        uncheck,
        display,
        setColor,
        removeClass,
        addClass,
        colors,
        add,
        newNS,
        newElem,
        append,
    };
}());
const core = (function () {
    const { byId } = dom;
    const res = {
        store: null,
        data: {
            azSmall: 'qwertyuiopasdfghjklzxcvbnm',
            azBig: 'QWERTYUIOPASDFGHJKLZXCVBNM',
            numbers: '1234567890',
            specials: {
                all: '!@#$%^&*()-=_+[]{}<>,.;:\'"\\|\`~/?',
                common: '!@#$%^&*()-=_+[]{}<>,.;:',
                chosen: [],
                commonTab: [],
                allTab: [],
            },
        },
        dom: {
            azSmall: byId('az-small'),
            azBig: byId('az-big'),
            numbers: byId('numbers'),
            specials: [],
            allSpecials: byId('all-specials'),
            commonSpecials: byId('common-specials'),
            noneSpecials: byId('none-specials'),
            lengthValue: byId('length-value'),
            lengthInput: byId('range-input'),
        },
        events: null,
    };
    for (let i = 0; i < res.data.specials.all.length; ++i) {
        res.data.specials.allTab[i] = res.data.specials.all[i];
    }
    for (let i = 0; i < res.data.specials.common.length; ++i) {
        res.data.specials.commonTab[i] = res.data.specials.common[i];
    }
    return res;
}());
const getEvents = () => (function () {
    const { getAttribute, setAttribute } = dom;
    const change = (storeName) => (event) => {
        const target = event.target;
        const data = getAttribute(target, 'data-num');
        const newData = data === checked.yes ? checked.no : checked.yes;
        setAttribute(target, 'data-num', newData);
        target.style.backgroundColor = data === checked.no ? 'var(--on_second_color)' : 'var(--background_color)';
        core.store.set(storeName, newData);
    };
    const azSmallEvent = change(core.store.names.azSmall);
    const azBigEvent = change(core.store.names.azBig);
    const numberEvent = change(core.store.names.numbers);
    const specialEvent = (num) => (event) => {
        const target = event.target;
        const data = getAttribute(target, 'data-num');
        const newData = data === checked.yes ? checked.no : checked.yes;
        setAttribute(target, 'data-num', newData);
        target.style.backgroundColor = data === checked.no ? 'var(--on_second_color)' : 'var(--background_color)';
        const storeData = core.store.get(core.store.names.specials);
        storeData[num] = newData;
        core.store.set(core.store.names.specials, storeData);
    };
    const specialAllEvent = () => {
        const storeData = [];
        core.dom.specials.forEach((elem) => {
            setAttribute(elem, 'data-num', checked.yes);
            storeData.push(checked.yes);
            elem.style.backgroundColor = 'var(--on_second_color)';
        });
        core.store.set(core.store.names.specials, storeData);
    };
    const specialCommonEvent = () => {
        const storeData = [];
        core.dom.specials.forEach((elem, i) => {
            const char = core.data.specials.allTab[i];
            const state = core.data.specials.commonTab.some(e => e === char);
            const newData = state ? checked.yes : checked.no;
            setAttribute(elem, 'data-num', newData);
            storeData.push(newData);
            elem.style.backgroundColor = state ? 'var(--on_second_color)' : 'var(--background_color)';
        });
        core.store.set(core.store.names.specials, storeData);
    };
    const specialNoneEvent = () => {
        const storeData = [];
        core.dom.specials.forEach((elem) => {
            setAttribute(elem, 'data-num', checked.no);
            storeData.push(checked.no);
            elem.style.backgroundColor = 'var(--background_color)';
        });
        core.store.set(core.store.names.specials, storeData);
    };
    const lengthEvent = (elem) => (event) => {
        const target = event.target;
        elem.innerHTML = target.value;
        core.store.set(core.store.names.length, Number(target.value));
    };
    const result = {
        azSmallEvent,
        azBigEvent,
        numberEvent,
        specialEvent,
        specialAllEvent,
        specialCommonEvent,
        specialNoneEvent,
        lengthEvent,
    };
    return result;
}());
(function () {
    const { byId, newElem, append, addClass } = dom;
    const getLine = () => {
        const line = newElem('div');
        addClass(line, 'line');
        addClass(line, 'flex');
        return line;
    };
    const specials = byId('specials');
    let line = getLine();
    let index = 0;
    core.data.specials.allTab.forEach((s) => {
        if (index % 8 === 0) {
            append(specials, line);
            line = getLine();
        }
        const button = newElem('button');
        button.innerHTML = s;
        addClass(button, 'simple-btn');
        append(line, button);
        core.dom.specials.push(button);
        index++;
    });
    if (index > 0) {
        append(specials, line);
    }
}());
const init = () => (function () {
    const { add, setAttribute } = dom;
    const setValue = (data, elem) => {
        elem.style.backgroundColor = data === checked.yes ? 'var(--on_second_color)' : 'var(--background_color)';
        setAttribute(elem, 'data-num', data);
    };
    const azSmallData = core.store.get(core.store.names.azSmall);
    setValue(azSmallData, core.dom.azSmall);
    setAttribute(core.dom.azSmall, 'data-num', azSmallData);
    add(core.dom.azSmall, 'click', core.events.azSmallEvent);
    const azBigData = core.store.get(core.store.names.azBig);
    setValue(azBigData, core.dom.azBig);
    setAttribute(core.dom.azBig, 'data-num', azBigData);
    add(core.dom.azBig, 'click', core.events.azBigEvent);
    const numbersData = core.store.get(core.store.names.numbers);
    setValue(numbersData, core.dom.numbers);
    setAttribute(core.dom.numbers, 'data-num', numbersData);
    add(core.dom.numbers, 'click', core.events.numberEvent);
    const specialsData = core.store.get(core.store.names.specials);
    core.dom.specials.forEach((btn, i) => {
        setValue(specialsData[i], btn);
        add(btn, 'click', core.events.specialEvent(i));
    });
    add(core.dom.allSpecials, 'click', core.events.specialAllEvent);
    add(core.dom.commonSpecials, 'click', core.events.specialCommonEvent);
    add(core.dom.noneSpecials, 'click', core.events.specialNoneEvent);
    const lengthData = core.store.get(core.store.names.length);
    core.dom.lengthInput.value = lengthData;
    add(core.dom.lengthInput, 'input', core.events.lengthEvent(core.dom.lengthValue));
    core.dom.lengthValue.innerHTML = lengthData;
    return {};
}());
(function () {
    getStorage().then((store) => {
        core.store = store;
        setConsole();
        core.events = getEvents();
        init();
    });
}());
