type EventsT = {
    azSmallEvent: (event: Event) => void
    azBigEvent: (event: Event) => void
    numberEvent: (event: Event) => void
    specialEvent: (num: number) => (event: Event) => void
    specialAllEvent: (event: Event) => void
    specialCommonEvent: (event: Event) => void
    specialNoneEvent: (event: Event) => void
    lengthEvent: (elem: HTMLElement) => (event: Event) => void
}

const getEvents = () => (function () {
    const { getAttribute, setAttribute } = dom

    type DataNamesValuesT = typeof core.store.names[keyof typeof core.store.names]
    const change = (storeName: DataNamesValuesT) => (event: Event) => {
        const target = event.target as HTMLInputElement

        const data = getAttribute(target, 'data-num')
        const newData = data === checked.yes ? checked.no : checked.yes

        setAttribute(target, 'data-num', newData)
        target.style.backgroundColor = data === checked.no ? 'var(--on_second_color)' : 'var(--background_color)'

        core.store.set(storeName, newData)
    }

    const azSmallEvent = change(core.store.names.azSmall)
    const azBigEvent = change(core.store.names.azBig)
    const numberEvent = change(core.store.names.numbers)

    const specialEvent = (num: number) => (event: Event) => {
        const target = event.target as HTMLInputElement

        const data = getAttribute(target, 'data-num')
        const newData = data === checked.yes ? checked.no : checked.yes

        setAttribute(target, 'data-num', newData)
        target.style.backgroundColor = data === checked.no ? 'var(--on_second_color)' : 'var(--background_color)'

        const storeData = core.store.get(core.store.names.specials)
        storeData[num] = newData
        core.store.set(core.store.names.specials, storeData)
    }

    const specialAllEvent = () => {
        const storeData: CheckedKeyT[] = []
        core.dom.specials.forEach((elem) => {
            setAttribute(elem, 'data-num', checked.yes)
            storeData.push(checked.yes)
            elem.style.backgroundColor = 'var(--on_second_color)'
        })
        core.store.set(core.store.names.specials, storeData)
    }

    const specialCommonEvent = () => {
        const storeData: CheckedKeyT[] = []
        core.dom.specials.forEach((elem, i) => {
            const char = core.data.specials.allTab[i]
            const state = core.data.specials.commonTab.some(e => e === char)
            const newData = state ? checked.yes : checked.no

            setAttribute(elem, 'data-num', newData)
            storeData.push(newData)

            elem.style.backgroundColor = state ? 'var(--on_second_color)' : 'var(--background_color)'
        })
        core.store.set(core.store.names.specials, storeData)
    }

    const specialNoneEvent = () => {
        const storeData: CheckedKeyT[] = []
        core.dom.specials.forEach((elem) => {
            setAttribute(elem, 'data-num', checked.no)
            storeData.push(checked.no)
            elem.style.backgroundColor = 'var(--background_color)'
        })
        core.store.set(core.store.names.specials, storeData)
    }

    const lengthEvent = (elem: HTMLElement) => (event: Event) => {
        const target = event.target as HTMLInputElement
        elem.innerHTML = target.value

        core.store.set(core.store.names.length, Number(target.value))
    }
    const result: EventsT = {
        azSmallEvent,
        azBigEvent,
        numberEvent,
        specialEvent,
        specialAllEvent,
        specialCommonEvent,
        specialNoneEvent,
        lengthEvent,
    }

    return result
}())