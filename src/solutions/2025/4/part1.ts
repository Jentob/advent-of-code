import { getInputFile, readLines } from "@/utils";

async function main() {
    const inputFile = await getInputFile(2025, 4);

    // biome-ignore format: -
    const neighbors = [
        [-1, -1], [ 0, -1], [ 1, -1],
        [-1,  0],           [ 1,  0],
        [-1,  1], [ 0,  1], [ 1,  1],
    ] as const;

    let count = 0;

    const grid: ("@" | ".")[][] = [];
    let i = 0;
    for await (const line of readLines(inputFile)) {
        grid[i] = Array.from(line) as ("@" | ".")[];
        i++;
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i]!.length; j++) {
            if (grid[i]![j] === "@") {
                let neighborCount = 0;
                for (const [dx, dy] of neighbors) {
                    if (grid[i + dy]?.[j + dx] === "@") {
                        neighborCount++;
                    }
                }
                if (neighborCount < 4) {
                    count++;
                }
            }
        }
    }

    console.log(count);
}

main();
