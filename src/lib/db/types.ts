import type {Tags} from "$lib/enums/tags";

export type File = {
    fileId: number;
    fileName: string;
    fileDescription: string;
    tags?: []
}