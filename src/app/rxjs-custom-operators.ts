import { BehaviorSubject, Observable } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';

export const closeWhen = <T>(subject: BehaviorSubject<T>) =>
  (source: Observable<T>) => subject ? source.pipe(takeUntil(subject.pipe(skip(1)))) : source;
