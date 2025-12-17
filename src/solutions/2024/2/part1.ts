import { getInputFile, readLines } from "@/utils";

async function main() {
    const inputFile = await getInputFile(2024, 2);

    let count = 0;
    for await (const line of readLines(inputFile)) {
        const array = line.split(/\s+/).map(Number);
        const isIncreasing = array[0] - array[1] < 0;

        let valid = true;
        for (let i = 1; i < array.length; i++) {
            const previous = array[i - 1];
            const current = array[i];
            const diff = Math.abs(previous - current);

            if (
                diff < 1 ||
                diff > 3 ||
                (isIncreasing && previous >= current) ||
                (!isIncreasing && previous <= current)
            ) {
                valid = false;
                break;
            }
        }

        if (valid) count++;
    }

    console.log(count);
}

main();
