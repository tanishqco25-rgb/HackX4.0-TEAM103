import type { SourceMapInput } from '@jridgewell/trace-mapping';
export type { SourceMapSegment, DecodedSourceMap, EncodedSourceMap, } from '@jridgewell/trace-mapping';
export type { SourceMapInput };
export type LoaderContext = {
    readonly importer: string;
    readonly depth: number;
    source: string;
    content: string | null | undefined;
    ignore: boolean | undefined;
};
