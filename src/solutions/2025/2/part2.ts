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

            for (let j = 1; j <= str.length / 2; j++) {
                if (str.length % j !== 0) continue;

                const chunk = str.slice(0, j);
                const repeated = chunk.repeat(str.length / j);

                if (repeated === str) {
                    sum += i;
                    break;
                }
            }
        }
    }

    console.log(sum);
}

main();
