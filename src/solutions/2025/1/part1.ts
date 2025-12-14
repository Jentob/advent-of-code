import { getInputFile, readLines } from "@/utils";

async function main() {
    const inputFile = await getInputFile(2025, 1);

    let count = 0;
    let dial = 50;

    for await (const line of readLines(inputFile)) {
        const amount = Number(line.slice(1));

        if (line[0] === "R") {
            dial = (dial + amount) % 100;
        } else {
            dial = (dial - (amount % 100) + 100) % 100;
        }

        if (dial === 0) count++;
    }

    console.log(count);
}

main();
