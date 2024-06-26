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
        azSmallTab: string[],
        azBigTab: string[],
        numbersTab: string[],
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
        message: HTMLElement
        generatePassword: HTMLElement
        password: HTMLElement
        copy: HTMLElement
        afterCopy: HTMLElement
    },
    events: EventsT | null,
    validation: () => void | null
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
            lengthInput: byId('range-input') as HTMLInputElement,
            message: byId('message'),
            generatePassword: byId('generate'),
            password: byId('password'),
            copy: byId('copy'),
            afterCopy: byId('after-copy'),
        },
        events: null,
        validation: null,
    }

    for (let i = 0; i < res.data.azSmall.length; ++i) {
        res.data.azSmallTab[i] = res.data.azSmall[i]
    }
    for (let i = 0; i < res.data.azBig.length; ++i) {
        res.data.azBigTab[i] = res.data.azBig[i]
    }
    for (let i = 0; i < res.data.numbers.length; ++i) {
        res.data.numbersTab[i] = res.data.numbers[i]
    }

    for (let i = 0; i < res.data.specials.all.length; ++i) {
        res.data.specials.allTab[i] = res.data.specials.all[i]
    }
    for (let i = 0; i < res.data.specials.common.length; ++i) {
        res.data.specials.commonTab[i] = res.data.specials.common[i]
    }

    return res
}())