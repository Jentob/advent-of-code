import { getInputData } from "@/utils";

async function main() {
    const inputFile = await getInputData(2025, 2);
    const text = await inputFile.text();

    let sum = 0;

    const ranges = text
        .split(",")
        .map((range) => range.split("-").map(Number) as [number, number]);

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
