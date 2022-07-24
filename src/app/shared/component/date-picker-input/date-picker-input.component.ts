import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DateButton } from 'angular-bootstrap-datetimepicker';

@Component({
  selector: 'app-date-picker-input',
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.css']
})
export class DatePickerInputComponent implements OnInit, AfterViewInit {

  showCalendar = true;
  disablePastDates = true;
  enteredDate: Date = new Date();
  private _isPickerOpen = true;

  constructor(public datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  getCalendarString(date: Date, format: string) {
    this.datepipe.transform(date, format);
  }

  ngAfterViewInit(): void {
    const dropdownToggle = document.querySelector('[data-toggle="dropdown"]');

    dropdownToggle.parentElement.addEventListener('show.bs.dropdown', () => {
      this._isPickerOpen = true;
    });
    dropdownToggle.parentElement.addEventListener('hide.bs.dropdown', () => {
      this._isPickerOpen = false;
    });
    // dropdownToggle.parentElement.on('show.bs.dropdown', () => {
    //   this._isPickerOpen = true;
    // });
    // dropdownToggle.parentElement.on('hide.bs.dropdown', () => {
    //   this._isPickerOpen = false;
    // });
  }

  /**
   * This filter `disables` dates that are invalid for selection.
   *
   * It returns `false` if the date is invalid for selection; Otherwise, `true`.
   *
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   *
   * @param dateButton
   *  the target datebutton.
   *
   * @param viewName
   *  the current view.
   */

  datePickerFilter = (dateButton: DateButton, viewName: string) => {
    return true;
    // return this.disablePastDates
    //   ? dateButton.value >= moment().startOf(viewName as unitOfTime.StartOf).valueOf()
    //   : true;
  }

  /**
   * Used to keep the Bootstrap drop-down open while clicking on the date/time picker.
   *
   * Without this, the dropdown will close whenever the user clicks,
   * @param event
   *  the DOM click event.
   */

  keepDropDownOpen(event: Event) {
    event.stopPropagation();
  }

  /**
   * Close the Date drop-down when date is selected.
   *
   * Do not `toggle` the drop-down unless a value is selected.
   *
   * ngModel handles actually setting the start date value.
   *
   * @param event
   *  the `DlDateTimePickerChange` event.
   */

  dateSelected(event) {
    console.log('_isDropdownVisible', this._isPickerOpen);
    if (this._isPickerOpen && event.value) {
      this.showCalendar = !this.showCalendar;
      // $('.date-dropdown').dropdown('toggle');
    }
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
    console.log(this.enteredDate);
  }
}
