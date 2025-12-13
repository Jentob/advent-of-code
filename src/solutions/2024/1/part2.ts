import { getInputFile, readLines } from "@/utils";

async function main() {
    const inputFile = await getInputFile(2024, 1);

    let sum = 0;

    const list1: number[] = [];
    const list2: Map<number, number> = new Map();
    for await (const line of readLines(inputFile)) {
        const split = line.split(/\s+/).map(Number) as [number, number];
        list1.push(split[0]);
        list2.set(split[1], (list2.get(split[1]) ?? 0) + 1);
    }

    for (const number of list1) {
        sum += (list2.get(number) ?? 0) * number;
    }

    console.log(sum);
}

main();
