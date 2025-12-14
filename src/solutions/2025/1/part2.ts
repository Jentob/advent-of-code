import { getInputFile, readLines } from "@/utils";

async function main() {
    const inputFile = await getInputFile(2025, 1);

    let count = 0;
    let dial = 50;
    let timesAtZero = 0;

    for await (const line of readLines(inputFile)) {
        const amount = Number(line.slice(1));

        if (line[0] === "R") {
            timesAtZero = Math.floor((dial + amount) / 100);
            dial = (dial + amount) % 100;
        } else {
            timesAtZero =
                amount >= dial
                    ? Math.floor((amount - dial) / 100) + (dial ? 1 : 0)
                    : 0;
            dial = (dial - (amount % 100) + 100) % 100;
        }

        count += timesAtZero;
    }

    console.log(count);
}

main();
