import { getInputData, readLines } from "@/utils";

function rotateDial(dialPosition: number, move: string): [number, number] {
    const amount = Number(move.slice(1));
    if (move[0] === "R") {
        return [
            (dialPosition + amount) % 100,
            Math.floor((dialPosition + amount) / 100),
        ];
    } else {
        return [
            (dialPosition - (amount % 100) + 100) % 100,
            amount >= dialPosition
                ? Math.floor((amount - dialPosition) / 100) +
                  (dialPosition ? 1 : 0)
                : 0,
        ];
    }
}

async function main() {
    const inputFile = await getInputData(2025, 1);

    let count = 0;
    let dial = 50;
    let timesAtZero = 0;

    for await (const line of readLines(inputFile.stream())) {
        [dial, timesAtZero] = rotateDial(dial, line);
        count += timesAtZero;
    }

    console.log(count);
}

main();
