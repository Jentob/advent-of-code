import { getInputData, readLines } from "@/utils";

async function main() {
    const inputFile = await getInputData(2025, 3);

    let sum = 0;

    for await (const line of readLines(inputFile.stream())) {
        const batteryBank = Array.from(line).map(Number);

        let first = -1;
        let second = -1;

        for (const [i, joltage] of batteryBank.entries()) {
            if (first < joltage && i < batteryBank.length - 1) {
                first = joltage;
                second = -1;
                continue;
            }

            if (second < joltage) {
                second = joltage;
            }
        }

        sum += Number(String(first) + String(second));
    }

    console.log(sum);
}

main();
