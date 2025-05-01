import { WritableSignal } from "@angular/core";
import { EMPTY } from "rxjs";
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inject, DestroyRef } from '@angular/core';

export const MAX_STUDIES = 10;
export const POLLING_INTERVAL_MS = 5000;

//TODO handle different errors like 404 500 505
export const handleError = (errorSignal: WritableSignal<any>, message: string) => {
    return (err: any) => {
        console.error(message, err);
        errorSignal.set(message);
        return EMPTY;
    };
};
