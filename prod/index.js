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
                all: '!@#$%^&*()-=_+[]{}\<\>,.;:\'"\\|\`~/?',
                common: '!@#$%^&*()-=_+[]{}<>,.;:',
                chosen: [],
                commonTab: [],
                allTab: [],
            },
            azSmallTab: [],
            azBigTab: [],
            numbersTab: [],
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
            generatePassword: byId('generate'),
            password: byId('password'),
        },
        events: null,
    };
    for (let i = 0; i < res.data.azSmall.length; ++i) {
        res.data.azSmallTab[i] = res.data.azSmall[i];
    }
    for (let i = 0; i < res.data.azBig.length; ++i) {
        res.data.azBigTab[i] = res.data.azBig[i];
    }
    for (let i = 0; i < res.data.numbers.length; ++i) {
        res.data.numbersTab[i] = res.data.numbers[i];
    }
    for (let i = 0; i < res.data.specials.all.length; ++i) {
        res.data.specials.allTab[i] = res.data.specials.all[i];
    }
    for (let i = 0; i < res.data.specials.common.length; ++i) {
        res.data.specials.commonTab[i] = res.data.specials.common[i];
    }
    return res;
}());
const generate = () => (function () {
    const getNumber = (check) => check === checked.yes ? 1 : 0;
    const getSume = (result) => result.azSmall + result.azBig + result.numbers + result.specials;
    const getBiggestKey = (result) => {
        let maxKey = null;
        let maxValue = -Infinity;
        for (const key in result) {
            if (result[key] > maxValue) {
                maxValue = result[key];
                maxKey = key;
            }
        }
        return maxKey;
    };
    const getNumberActiveTabs = (azSmall, azBig, numbers, specials) => {
        let numberSpecials = 0;
        specials.forEach((s) => {
            if (s === checked.yes)
                numberSpecials++;
        });
        const length = core.store.get(core.store.names.length);
        const numberActive = getNumber(azSmall) + getNumber(azBig) + getNumber(numbers) + (numberSpecials > 0 ? 1 : 0);
        let normalLength = Math.ceil(length / numberActive);
        let specialLength = 0;
        if (numberSpecials > 0) {
            if (numberSpecials >= normalLength) {
                specialLength = normalLength;
            }
            else {
                specialLength = numberSpecials;
                const numberNormalActive = getNumber(azSmall) + getNumber(azBig) + getNumber(numbers);
                normalLength = Math.ceil((length - specialLength) / numberNormalActive);
            }
        }
        const result = {
            azSmall: azSmall === checked.yes ? normalLength : 0,
            azBig: azBig === checked.yes ? normalLength : 0,
            numbers: numbers === checked.yes ? normalLength : 0,
            specials: specialLength,
        };
        let sume = getSume(result);
        while (sume > length) {
            const key = getBiggestKey(result);
            result[key]--;
            sume = getSume(result);
        }
        return result;
    };
    const collectTabs = () => {
        const azSmallData = core.store.get(core.store.names.azSmall);
        const azBigData = core.store.get(core.store.names.azBig);
        const numbersData = core.store.get(core.store.names.numbers);
        const specialsData = core.store.get(core.store.names.specials);
        core.data.specials.chosen = [];
        specialsData.forEach((s, i) => {
            if (s === checked.yes) {
                core.data.specials.chosen.push(core.data.specials.allTab[i]);
            }
        });
        const numberActiveTabs = getNumberActiveTabs(azSmallData, azBigData, numbersData, specialsData);
        const result = {
            tabs: {
                azSmall: azSmallData ? core.data.azSmallTab : [],
                azBig: azBigData ? core.data.azBigTab : [],
                numbers: numbersData ? core.data.numbersTab : [],
                specials: core.data.specials.chosen,
            },
            num: numberActiveTabs,
        };
        return result;
    };
    const getRandomElements = (tab, length) => {
        let result = [];
        let availableElements = [...tab];
        while (result.length < length) {
            if (availableElements.length === 0) {
                availableElements = [...tab];
            }
            const randomIndex = Math.floor(Math.random() * availableElements.length);
            const element = availableElements[randomIndex];
            result.push(element);
            availableElements.splice(randomIndex, 1);
        }
        return result;
    };
    const getPassword = () => {
        const data = collectTabs();
        const azSmall = getRandomElements(data.tabs.azSmall, data.num.azSmall);
        const azBig = getRandomElements(data.tabs.azBig, data.num.azBig);
        const numbers = getRandomElements(data.tabs.numbers, data.num.numbers);
        const specials = getRandomElements(data.tabs.specials, data.num.specials);
        const specialsOk = specials.map(s => {
            if (s === '<')
                return '&lt;';
            if (s === '>')
                return '&gt;';
            return s;
        });
        const all = azSmall.concat(azBig).concat(numbers).concat(specialsOk);
        const length = core.store.get(core.store.names.length);
        const password = getRandomElements(getRandomElements(getRandomElements(all, length), length), length);
        const result = password.join('');
        return result;
    };
    const result = {
        getPassword
    };
    return result;
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
    const azSmallClick = change(core.store.names.azSmall);
    const azBigClick = change(core.store.names.azBig);
    const numberClick = change(core.store.names.numbers);
    const specialClick = (num) => (event) => {
        const target = event.target;
        const data = getAttribute(target, 'data-num');
        const newData = data === checked.yes ? checked.no : checked.yes;
        setAttribute(target, 'data-num', newData);
        target.style.backgroundColor = data === checked.no ? 'var(--on_second_color)' : 'var(--background_color)';
        const storeData = core.store.get(core.store.names.specials);
        storeData[num] = newData;
        core.store.set(core.store.names.specials, storeData);
    };
    const specialAllClick = () => {
        const storeData = [];
        core.dom.specials.forEach((elem) => {
            setAttribute(elem, 'data-num', checked.yes);
            storeData.push(checked.yes);
            elem.style.backgroundColor = 'var(--on_second_color)';
        });
        core.store.set(core.store.names.specials, storeData);
    };
    const specialCommonClick = () => {
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
    const specialNoneClick = () => {
        const storeData = [];
        core.dom.specials.forEach((elem) => {
            setAttribute(elem, 'data-num', checked.no);
            storeData.push(checked.no);
            elem.style.backgroundColor = 'var(--background_color)';
        });
        core.store.set(core.store.names.specials, storeData);
    };
    const lengthInput = (elem) => (event) => {
        const target = event.target;
        elem.innerHTML = target.value;
        core.store.set(core.store.names.length, Number(target.value));
    };
    const generatePasswordBtnClick = () => {
        const password = generate().getPassword();
        core.dom.password.innerHTML = password;
    };
    const result = {
        azSmallClick,
        azBigClick,
        numberClick,
        specialClick,
        specialAllClick,
        specialCommonClick,
        specialNoneClick,
        lengthInput,
        generatePasswordBtnClick,
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
    add(core.dom.azSmall, 'click', core.events.azSmallClick);
    const azBigData = core.store.get(core.store.names.azBig);
    setValue(azBigData, core.dom.azBig);
    setAttribute(core.dom.azBig, 'data-num', azBigData);
    add(core.dom.azBig, 'click', core.events.azBigClick);
    const numbersData = core.store.get(core.store.names.numbers);
    setValue(numbersData, core.dom.numbers);
    setAttribute(core.dom.numbers, 'data-num', numbersData);
    add(core.dom.numbers, 'click', core.events.numberClick);
    const specialsData = core.store.get(core.store.names.specials);
    core.dom.specials.forEach((btn, i) => {
        setValue(specialsData[i], btn);
        add(btn, 'click', core.events.specialClick(i));
    });
    add(core.dom.allSpecials, 'click', core.events.specialAllClick);
    add(core.dom.commonSpecials, 'click', core.events.specialCommonClick);
    add(core.dom.noneSpecials, 'click', core.events.specialNoneClick);
    const lengthData = core.store.get(core.store.names.length);
    core.dom.lengthInput.value = lengthData;
    add(core.dom.lengthInput, 'input', core.events.lengthInput(core.dom.lengthValue));
    core.dom.lengthValue.innerHTML = lengthData;
    add(core.dom.generatePassword, 'click', core.events.generatePasswordBtnClick);
}());
(function () {
    getStorage().then((store) => {
        core.store = store;
        setConsole();
        core.events = getEvents();
        init();
    });
}());
