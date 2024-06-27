type ActiveDataTabsT = {
    azSmall: string[],
    azBig: string[],
    numbers: string[],
    specials: string[],
}

type NumberActiveTabsT = {
    azSmall: number,
    azBig: number,
    numbers: number,
    specials: number,
}

type CollectTabsT = {
    tabs: ActiveDataTabsT,
    num: NumberActiveTabsT,
}

type GenerateT = {
    getPassword: () => string
}

const generate = () => (function () {
    const getNumber = (check: CheckedValuesT) => check === checked.yes ? 1 : 0
    const getSume = (result: NumberActiveTabsT) => result.azSmall + result.azBig + result.numbers + result.specials
    const getBiggestKey = (result: NumberActiveTabsT) => {
        let maxKey = null
        let maxValue = -Infinity

        for (const key in result) {
            if (result[key as keyof typeof result] > maxValue) {
                maxValue = result[key as keyof typeof result]
                maxKey = key
            }
        }

        return maxKey
    }

    const getNumberActiveTabs = (azSmall: CheckedKeyT, azBig: CheckedKeyT, numbers: CheckedKeyT, specials: CheckedKeyT[]) => {
        let numberSpecials = 0
        specials.forEach((s: CheckedKeyT) => {
            if (s === checked.yes) numberSpecials++
        })

        const length = core.store.get(core.store.names.length)
        const numberActive = getNumber(azSmall) + getNumber(azBig) + getNumber(numbers) + (numberSpecials > 0 ? 1 : 0)
        let normalLength = Math.ceil(length / numberActive)
        let specialLength = 0
        if (numberSpecials > 0) {
            if (numberSpecials >= normalLength) {
                specialLength = normalLength
            } else {
                specialLength = numberSpecials
                const numberNormalActive = getNumber(azSmall) + getNumber(azBig) + getNumber(numbers)
                normalLength = Math.ceil((length - specialLength) / numberNormalActive)
            }
        }

        const result: NumberActiveTabsT = {
            azSmall: azSmall === checked.yes ? normalLength : 0,
            azBig: azBig === checked.yes ? normalLength : 0,
            numbers: numbers === checked.yes ? normalLength : 0,
            specials: specialLength,
        }

        let sume = getSume(result)
        while (sume > length) {
            const key = getBiggestKey(result)
            result[key as keyof typeof result]--
            sume = getSume(result)
        }

        return result
    }

    const collectTabs = () => {
        const azSmallData = core.store.get(core.store.names.azSmall) as CheckedKeyT
        const azBigData = core.store.get(core.store.names.azBig) as CheckedKeyT
        const numbersData = core.store.get(core.store.names.numbers) as CheckedKeyT

        const specialsData = core.store.get(core.store.names.specials) as CheckedKeyT[]

        core.data.specials.chosen = []
        specialsData.forEach((s: string, i: number) => {
            if (s === checked.yes) {
                core.data.specials.chosen.push(core.data.specials.allTab[i])
            }
        })


        const numberActiveTabs = getNumberActiveTabs(azSmallData, azBigData, numbersData, specialsData)

        const result: CollectTabsT = {
            tabs: {
                azSmall: azSmallData ? core.data.azSmallTab : [],
                azBig: azBigData ? core.data.azBigTab : [],
                numbers: numbersData ? core.data.numbersTab : [],
                specials: core.data.specials.chosen,
            },
            num: numberActiveTabs,
        }

        return result
    }


    const getRandomElements = (tab: string[], length: number) => {
        let result = [];
        let availableElements = [...tab];

        while (result.length < length) {
            if (availableElements.length === 0) {
                // Jeśli skończyły się dostępne elementy, ponownie wypełnij dostępne elementy
                availableElements = [...tab];
            }

            // Losowanie indeksu z dostępnych elementów
            const randomIndex = Math.floor(Math.random() * availableElements.length);
            const element = availableElements[randomIndex];

            // Dodanie wylosowanego elementu do wynikowej tablicy
            result.push(element);

            // Usunięcie wylosowanego elementu z dostępnych elementów
            availableElements.splice(randomIndex, 1);
        }

        return result;
    }

    const getPassword = () => {
        const data = collectTabs()

        const azSmall = getRandomElements(data.tabs.azSmall, data.num.azSmall)
        const azBig = getRandomElements(data.tabs.azBig, data.num.azBig)
        const numbers = getRandomElements(data.tabs.numbers, data.num.numbers)

        const specials = getRandomElements(data.tabs.specials, data.num.specials)
        const specialsOk = specials.map(s => {
            if (s === '<') return '&lt;'
            if (s === '>') return '&gt;'
            return s
        })

        const all = azSmall.concat(azBig).concat(numbers).concat(specialsOk)

        const length = core.store.get(core.store.names.length)
        const password = getRandomElements(getRandomElements(getRandomElements(all, length), length), length)

        const result = password.join('')

        return result
    }

    const result: GenerateT = {
        getPassword
    }

    return result
}())