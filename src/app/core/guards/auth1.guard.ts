import { CanMatchFn, GuardResult, MaybeAsync } from '@angular/router';

export const auth1Guard: CanMatchFn = (
  route,
  segments
): MaybeAsync<GuardResult> => {
  return true;
};
