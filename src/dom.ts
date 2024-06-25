const dom = (function () {
    const byId = (name: string) => document.getElementById(name)
    const byQuery = (query: string) => document.querySelector(query)
    const byQueryAll = (query: string) => document.querySelectorAll(query)
    const byQ = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, query: string) => elem.querySelector(query)
    const byQAll = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, query: string) => elem.querySelectorAll(query)

    type ModifiableCSSProperties = {
        [K in keyof CSSStyleDeclaration as CSSStyleDeclaration[K] extends ((...args: any[]) => any) ? never : K]: string;
    }

    const setStyle = (element: HTMLElement, style: keyof ModifiableCSSProperties, value: string) => element.style[style as any] = value

    type StyleT = [element: HTMLElement, attribute: keyof ModifiableCSSProperties, value: string]
    type StylesT = StyleT[]
    const setAllStyles = (styles: StylesT) => styles.forEach((s: StyleT) => setStyle(s[0], s[1], s[2]))

    type AttributeNamesT = 'x' | 'y' | 'width' | 'height' | 'fill' | 'stroke' | 'stroke-width' | 'viewBox'
    const setAttribute = (element: Element | HTMLElement | SVGRectElement, attribute: AttributeNamesT, value: string) => element.setAttribute(attribute as any, value)

    type AttributeT = [element: Element | HTMLElement | SVGRectElement, attribute: AttributeNamesT, value: string]
    type AttributesT = AttributeT[]
    const setAllAttributes = (attributes: AttributesT) => attributes.forEach((a: AttributeT) => a[0].setAttribute(a[1], a[2]))

    const disable = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement) => elem.setAttribute('disabled', '')
    const enable = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement) => elem.removeAttribute('disabled')

    const check = (elem: HTMLInputElement) => elem.checked = true
    const uncheck = (elem: HTMLInputElement) => elem.checked = false

    const display = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, attribute: string) =>
        elem.style.display = attribute
    const setColor = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, color: string) =>
        elem.style.color = color
    const removeClass = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, attribute: string) =>
        elem.classList.remove(attribute)
    const addClass = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, attribute: string) =>
        elem.classList.add(attribute)

    const colors = {
        line: 'var(--line_color)',
        prime: 'var(--prime_color)',
        off1: 'var(--off_prime_color)',
        off2: 'var(--off_second_color)',
    } as const

    type EventNamesT = 'click' | 'input' | 'did-finish-load' | 'console-message'
    const add = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, name: EventNamesT, fn: EventListenerOrEventListenerObject) => elem.addEventListener(name, fn)

    const xmlns = 'http://www.w3.org/2000/svg'
    type NsNamesT = 'rect'
    const newNS = (name: NsNamesT) => document.createElementNS(xmlns, 'rect')

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
    }
}())