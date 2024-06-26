const checked = {
    yes: 'yes',
    no: 'no',
} as const
type CheckedKeyT = keyof typeof checked
type CheckedValuesT = typeof checked[CheckedKeyT]

type NamesValueTypeKeysT = keyof NamesValueTypeT
type AllNamesValueTypeT = NamesValueTypeT[NamesValueTypeKeysT]

type NamesValueTypeT = {
    azSmall: CheckedKeyT,
    azBig: CheckedKeyT,
    numbers: CheckedKeyT,
    specials: CheckedKeyT[],
    length: number,
}

const getStorage = async () => {
    const names = {
        azSmall: 'azSmall',
        azBig: 'azBig',
        numbers: 'numbers',
        specials: 'specials',
        length: 'length',
    } as const
    type DataNamesKeysT = keyof typeof names
    type DataNamesValuesT = typeof names[DataNamesKeysT]

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
    } as const
    type DefaultDataKeysT = keyof typeof defaultData
    type DefaultDataValuesT = typeof defaultData[DefaultDataKeysT]


    const isValidJSONStringify = (str: string | string[] | number) => {
        try {
            JSON.stringify(str)
            return true;
        } catch {
            return false
        }
    }


    const set = (key: DataNamesValuesT, value: AllNamesValueTypeT) => {
        if (isValidJSONStringify(value)) {
            localStorage.setItem(key, JSON.stringify(value))
        } else {
            localStorage.setItem(key, value.toString())
        }
    }

    const isValidJSONParse = (str: string | string[]) => {
        try {
            JSON.stringify(str)
            return true
        } catch {
            return false
        }
    }

    const get = (key: DataNamesValuesT) => {
        const value = localStorage.getItem(key)
        if (!value) return null
        if (typeof value === 'boolean') return `${value}`
        if (isValidJSONParse(value)) {
            return JSON.parse(value)
        } else {
            return value.toString()
        }
    }

    const initData = () => {
        const list = Object.keys(names)
        list.forEach((k: string) => {
            const data = get(k as DataNamesValuesT)
            if (!data && defaultData[k as keyof typeof defaultData]) set(k as DataNamesValuesT, defaultData[k as keyof typeof defaultData] as AllNamesValueTypeT)
        })
    }
    initData()

    return {
        names,
        set,
        get,
    }
}