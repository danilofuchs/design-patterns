import { Observable, of, forkJoin, throwError, merge, from } from "rxjs";
import { toArray, delay, catchError, filter, tap } from "rxjs/operators";

// eslint-disable-next-line -- Expected error as is empty expression
const noop = (_any: any) => {};

export const basicObservable = () => {
    const observable$ = new Observable<number>((subscriber) => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        subscriber.complete();
    });

    observable$.subscribe((state) => noop(state));
};

export const observableToArray = async () => {
    const observable$ = new Observable<number>((subscriber) => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        subscriber.complete();
    });

    return await observable$.pipe(toArray()).toPromise();
};

export const parallelCalls = async (delayTime = 0) => {
    const call$ = (response: number) => of(response).pipe(delay(delayTime));

    return await forkJoin([1, 2, 3, 4, 5].map((num) => call$(num))).toPromise();
};

export const parallelCallsWithErrors = async (
    delayTime = 0,
    errorOnNumber: number | null = null
) => {
    const call$ = (response: number) => {
        if (response === errorOnNumber) {
            return throwError(new Error()).pipe(delay(delayTime));
        }
        return of(response).pipe(delay(delayTime));
    };

    return await forkJoin(
        [1, 2, 3, 4, 5].map((num) =>
            call$(num).pipe(catchError(() => of(null)))
        )
    ).toPromise();
};

export const parallelThenMerge = async (delayTime = 0) => {
    const callIndividually$ = (response: number) => {
        if (response === 2) {
            return throwError(new Error()).pipe(delay(delayTime));
        }
        return of(response).pipe(delay(delayTime));
    };

    return await forkJoin(
        [1, 2, 3, 4, 5].map((num) =>
            callIndividually$(num).pipe(catchError((error) => of({ error })))
        )
    )
        .pipe((source) => from(source))
        .toPromise();
};
