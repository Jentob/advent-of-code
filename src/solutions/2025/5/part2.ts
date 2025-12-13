import { getInputFile, readLines } from "@/utils";

async function main() {
    const inputFile = await getInputFile(2025, 5);

    const gen = readLines(inputFile);

    const ranges: [number, number][] = [];
    const mergedRanges: [number, number][] = [];

    let sum = 0;

    while (true) {
        const { value: line }: { value: string } = await gen.next();
        if (line === "") break;
        ranges.push(line.split("-").map(Number) as [number, number]);
    }

    ranges.sort((a, b) => a[0] - b[0]);

    for (const range of ranges) {
        const lastRange = mergedRanges[mergedRanges.length - 1];

        if (mergedRanges.length === 0 || lastRange[1] < range[0]) {
            mergedRanges.push(range);
        } else if (lastRange[1] < range[1]) {
            lastRange[1] = range[1];
        }
    }

    for (const range of mergedRanges) {
        sum += range[1] - range[0] + 1;
    }

    console.log(sum);
}

main();
