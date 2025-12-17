import { getInputFile } from "@/utils";

async function main() {
    const inputFile = await getInputFile(2025, 2);
    const inputData = await inputFile.text();

    const ranges = inputData
        .split(",")
        .map((range) => range.split("-").map(Number) as [number, number]);

    let sum = 0;

    for (const [start, end] of ranges) {
        for (let i = start; i <= end; i++) {
            const str = String(i);

            if (str.length % 2 === 1) continue;

            if (str.slice(0, str.length / 2) === str.slice(str.length / 2))
                sum += i;
        }
    }

    console.log(sum);
}

main();
