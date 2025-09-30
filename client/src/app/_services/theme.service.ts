import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private themes = [
        'cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal', 'litera', 'lumen', 'lux', 'materia', 'minty', 'morph', 'pulse', 'quartz', 'sandstone', 'simplex', 'sketchy', 'slate', 'solar', 'spacelab', 'superhero', 'united', 'vapor', 'yeti', 'zephyr'
    ];
    private themeLinkId = 'bootswatch-theme';

    getThemes() {
        return this.themes;
    }

    setTheme(theme: string) {
        const head = document.getElementsByTagName('head')[0];
        let themeLink = document.getElementById(this.themeLinkId) as HTMLLinkElement;
        if (!themeLink) {
            themeLink = document.createElement('link');
            themeLink.rel = 'stylesheet';
            themeLink.id = this.themeLinkId;
            head.appendChild(themeLink);
        }
        themeLink.href = `assets/bootswatch/${theme}/bootstrap.min.css`;
    }
}
