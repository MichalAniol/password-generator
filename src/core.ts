type CoreT = {
    store: Awaited<ReturnType<typeof getStorage>> | null,
    data: {
        azSmall: string,
        azBig: string,
        numbers: string,
        specials: {
            all: string,
            common: string,
            chosen: string[],
            commonTab: string[],
            allTab: string[],
        },
    },
    dom: {
        azSmall: HTMLElement
        azBig: HTMLElement
        numbers: HTMLElement
        specials: HTMLElement[]
        allSpecials: HTMLElement
        commonSpecials: HTMLElement
        noneSpecials: HTMLElement
        lengthValue: HTMLElement
        lengthInput: HTMLInputElement
    },
    events: EventsT | null
}

const core = (function () {
    const { byId } = dom

    const res: CoreT = {
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
            lengthInput: byId('range-input') as HTMLInputElement,
        },
        events: null,
    }

    for (let i = 0; i < res.data.specials.all.length; ++i) {
        res.data.specials.allTab[i] = res.data.specials.all[i]
    }
    for (let i = 0; i < res.data.specials.common.length; ++i) {
        res.data.specials.commonTab[i] = res.data.specials.common[i]
    }

    return res
}())