import { mkdir } from "node:fs/promises";
import path from "node:path";

const dataDirectory = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "..",
    "..",
    "data",
);
const fileName = (year: number, day: number) => `input_${year}_${day}.txt`;

async function fetchInputData(
    year: number,
    day: number,
    url: URL,
): Promise<Bun.BunFile> {
    console.log(`Fetching input data for ${year} day ${day} from ${url}`);
    if (!process.env.AOC_SESSION_KEY)
        throw new Error("AOC_SESSION_KEY is not set in environment variables");
    const response = await fetch(url, {
        headers: {
            Cookie: `session=${process.env.AOC_SESSION_KEY}`,
        },
    });
    if (!response.ok)
        throw new Error(
            `Failed to fetch input data for ${year} day ${day}: ${await response.text()}`,
        );
    await mkdir(dataDirectory, { recursive: true });
    const file = Bun.file(path.join(dataDirectory, fileName(year, day)));
    file.write(response);
    return file;
}

export async function getInputData(
    year: number,
    day: number,
    options: { refresh?: boolean } = {},
): Promise<Bun.BunFile> {
    const { refresh = false } = options;
    const file = Bun.file(path.join(dataDirectory, fileName(year, day)));
    if (file.size && !refresh) return file;
    return fetchInputData(
        year,
        day,
        new URL(`https://adventofcode.com/${year}/day/${day}/input`),
    );
}

export async function* readLines(
    stream: ReadableStream<Uint8Array>,
): AsyncGenerator<string> {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
            yield line;
        }
    }

    if (buffer) {
        yield buffer;
    }
}
