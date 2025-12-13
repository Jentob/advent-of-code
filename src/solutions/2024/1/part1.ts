import { getInputFile, readLines } from "@/utils";

async function main() {
    const inputFile = await getInputFile(2024, 1);

    let sum = 0;

    const list1: number[] = [];
    const list2: number[] = [];
    for await (const line of readLines(inputFile)) {
        const split = line.split(/\s+/).map(Number) as [number, number];
        list1.push(split[0]);
        list2.push(split[1]);
    }
    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    for (let i = 0; i < list1.length; i++) {
        sum += Math.abs(list1[i]! - list2[i]!);
    }

    console.log(sum);
}

main();
