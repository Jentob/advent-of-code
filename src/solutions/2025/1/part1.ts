import { getInputFile, readLines } from "@/utils";

function rotateDial(dialPosition: number, move: string): number {
    const amount = Number(move.slice(1));
    if (move[0] === "R") {
        return (dialPosition + amount) % 100;
    } else {
        return (dialPosition - (amount % 100) + 100) % 100;
    }
}

async function main() {
    const inputFile = await getInputFile(2025, 1);

    let count = 0;
    let dial = 50;

    for await (const line of readLines(inputFile)) {
        dial = rotateDial(dial, line);
        if (dial === 0) count++;
    }

    console.log(count);
}

main();
