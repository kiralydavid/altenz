import {Shared} from "./Shared";

export const sharedUtil = (value: Shared) => {
    return `shared test ${value.message}`;
}