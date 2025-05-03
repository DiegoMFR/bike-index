import { WritableSignal } from "@angular/core";
import { EMPTY, finalize, Observable } from "rxjs";

export const PAGE_SIZE = 10;

export const captureError = (errorSignal: WritableSignal<any>, message: string) => {
    return (err: any) => {
        console.error(message, err);
        errorSignal.set(message);
        return EMPTY;
    };
};

export const trackLoading = <T>(obs$: Observable<T>, loading$:WritableSignal<any>) => {
    loading$.set(true);
    return obs$.pipe(finalize(() =>loading$.set(false)));
  }
