type EventsT = {
    azSmallClick: (event: Event) => void
    azBigClick: (event: Event) => void
    numberClick: (event: Event) => void
    specialClick: (num: number) => (event: Event) => void
    specialAllClick: (event: Event) => void
    specialCommonClick: (event: Event) => void
    specialNoneClick: (event: Event) => void
    lengthInput: (elem: HTMLElement) => (event: Event) => void
    generatePasswordBtnClick: () => void
    CopyToClipboard: () => void
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

        core.validation()
    }

    const azSmallClick = change(core.store.names.azSmall)
    const azBigClick = change(core.store.names.azBig)
    const numberClick = change(core.store.names.numbers)

    const specialClick = (num: number) => (event: Event) => {
        const target = event.target as HTMLInputElement

        const data = getAttribute(target, 'data-num')
        const newData = data === checked.yes ? checked.no : checked.yes

        setAttribute(target, 'data-num', newData)
        target.style.backgroundColor = data === checked.no ? 'var(--on_second_color)' : 'var(--background_color)'

        const storeData = core.store.get(core.store.names.specials)
        storeData[num] = newData
        core.store.set(core.store.names.specials, storeData)

        core.validation()
    }

    const specialAllClick = () => {
        const storeData: CheckedKeyT[] = []
        core.dom.specials.forEach((elem) => {
            setAttribute(elem, 'data-num', checked.yes)
            storeData.push(checked.yes)
            elem.style.backgroundColor = 'var(--on_second_color)'
        })
        core.store.set(core.store.names.specials, storeData)

        core.validation()
    }

    const specialCommonClick = () => {
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

        core.validation()
    }

    const specialNoneClick = () => {
        const storeData: CheckedKeyT[] = []
        core.dom.specials.forEach((elem) => {
            setAttribute(elem, 'data-num', checked.no)
            storeData.push(checked.no)
            elem.style.backgroundColor = 'var(--background_color)'
        })
        core.store.set(core.store.names.specials, storeData)

        core.validation()
    }

    const lengthInput = (elem: HTMLElement) => (event: Event) => {
        const target = event.target as HTMLInputElement
        elem.innerHTML = target.value

        core.store.set(core.store.names.length, Number(target.value))

        core.validation()
    }

    const generatePasswordBtnClick = () => {
        const password = generate().getPassword()

        core.dom.password.innerHTML = password
    }

    const CopyToClipboard = () => {
        if (window.getSelection) {
            if (core.dom.password.innerHTML.length === 0) return

            const range = document.createRange()
            range.selectNode(core.dom.password)
            window.getSelection().addRange(range)
            document.execCommand('copy')

            setTimeout(() => {
                range.selectNode(core.dom.afterCopy)
                window.getSelection().addRange(range)
            }, 30)

            core.dom.copy.innerHTML = 'c o p i e d &nbsp; ! ! !'
            setTimeout(() => {
                core.dom.copy.innerHTML = 'copy'
            }, 500)
        }
    }


    const result: EventsT = {
        azSmallClick,
        azBigClick,
        numberClick,
        specialClick,
        specialAllClick,
        specialCommonClick,
        specialNoneClick,
        lengthInput,
        generatePasswordBtnClick,
        CopyToClipboard,
    }

    return result
}())