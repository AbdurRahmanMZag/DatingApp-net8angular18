import { Component } from '@angular/core';
import { ThemeService } from './_services/theme.service';
import { NgFor, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

@Component({
    selector: 'app-theme-switcher',
    imports: [TitleCasePipe, NgFor, BsDropdownModule],
    standalone: true,
    template: `
    <div dropdown class="dropdown">
      <button dropdownToggle class="btn btn-light dropdown-toggle w-100" type="button" id="themeDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        {{ selectedTheme | titlecase }} Theme
      </button>
      <ul *dropdownMenu class="dropdown-menu w-100" aria-labelledby="themeDropdown">
        <li *ngFor="let theme of themes">
          <a class="dropdown-item" href="#" (click)="onThemeSelect(theme)">{{ theme | titlecase }}</a>
        </li>
      </ul>
    </div>
  `
})
export class ThemeSwitcherComponent {
    themes: string[];
    selectedTheme: string;

    constructor(private themeService: ThemeService) {
        this.themes = this.themeService.getThemes();
        this.selectedTheme = 'united';
        this.themeService.setTheme(this.selectedTheme);
    }

    onThemeSelect(theme: string) {
        this.selectedTheme = theme;
        this.themeService.setTheme(theme);
    }
}
