import { AbstractControl } from '@angular/forms';

export function ValidateDate(control: AbstractControl) {
  const reg = /[0-9]{4}\-([1-9]|0[1-9]|1[012])\-([1-9]|0[1-9]|[12][0-9]|3[01])$/;
  const {day, month, year} = control.value;
  const date = `${year}-${month}-${day}`;
  if (!reg.test(date)) {
    return { validDate: true };
  }
  return null;
}
