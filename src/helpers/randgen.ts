import randomColor from 'randomcolor';

const randgen = (): string[] => {
    return randomColor({
        luminosity: 'light',
        count: 4,
    })
}

export { randgen }