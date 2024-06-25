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
        test: 'test',
    };
    const defaultData = {
        test: 'test-test',
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
    };
}());
const core = {
    store: null,
};
(function () {
    getStorage().then((store) => {
        core.store = store;
        setConsole();
    });
}());
