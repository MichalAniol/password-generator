const init = () => (function () {
    const { add, setAttribute } = dom

    const setValue = (data: CheckedKeyT, elem: HTMLElement) => {
        elem.style.backgroundColor = data === checked.yes ? 'var(--on_second_color)' : 'var(--background_color)'
        setAttribute(elem, 'data-num', data)
    }

    // normal
    const azSmallData = core.store.get(core.store.names.azSmall) as CheckedKeyT
    setValue(azSmallData, core.dom.azSmall)
    setAttribute(core.dom.azSmall, 'data-num', azSmallData)
    add(core.dom.azSmall, 'click', core.events.azSmallEvent)

    const azBigData = core.store.get(core.store.names.azBig) as CheckedKeyT
    setValue(azBigData, core.dom.azBig)
    setAttribute(core.dom.azBig, 'data-num', azBigData)
    add(core.dom.azBig, 'click', core.events.azBigEvent)

    const numbersData = core.store.get(core.store.names.numbers) as CheckedKeyT
    setValue(numbersData, core.dom.numbers)
    setAttribute(core.dom.numbers, 'data-num', numbersData)
    add(core.dom.numbers, 'click', core.events.numberEvent)

    // specials
    const specialsData = core.store.get(core.store.names.specials) as CheckedKeyT[]
    core.dom.specials.forEach((btn, i) => {
        setValue(specialsData[i], btn)
        add(btn, 'click', core.events.specialEvent(i))
    })

    add(core.dom.allSpecials, 'click', core.events.specialAllEvent)
    add(core.dom.commonSpecials, 'click', core.events.specialCommonEvent)
    add(core.dom.noneSpecials, 'click', core.events.specialNoneEvent)

    // length
    const lengthData = core.store.get(core.store.names.length)
    core.dom.lengthInput.value = lengthData
    add(core.dom.lengthInput, 'input', core.events.lengthEvent(core.dom.lengthValue))
    core.dom.lengthValue.innerHTML = lengthData

    return {}
}())