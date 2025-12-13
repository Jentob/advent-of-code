import { getInputFile, readLines } from "@/utils";

async function main() {
    const inputFile = await getInputFile(2025, 3);

    const amount = 12;
    let sum = 0;

    for await (const line of readLines(inputFile)) {
        const batteryBank = Array.from(line).map(Number);
        const batteriesToTurnOn: number[] = Array.from(
            { length: amount },
            () => -1,
        );
        for (const [i, joltage] of batteryBank.entries()) {
            for (let j = 0; j < amount; j++) {
                if (
                    batteriesToTurnOn[j] < joltage &&
                    i < batteryBank.length - amount + j + 1
                ) {
                    batteriesToTurnOn[j] = joltage;
                    batteriesToTurnOn.fill(-1, j + 1);
                    break;
                }
            }
        }

        sum += Number(batteriesToTurnOn.join(""));
    }

    console.log(sum);
}

main();
