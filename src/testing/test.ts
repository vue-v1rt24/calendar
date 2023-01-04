type TestType = string | number

export const test = (val1: TestType, val2: TestType) => {
    console.assert(val1 === val2, `Значения ${val1} и ${val2} не равны`);
};