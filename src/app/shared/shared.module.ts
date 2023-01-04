import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoriesComponent } from './components/stories/stories.component';
import { StoriesPreviewComponent } from './components/stories/components/stories-preview/stories-preview.component';
import { StoriesPlayerComponent } from './components/stories/components/stories-player/stories-player.component';
import { StoriesHeaderComponent } from './components/stories/components/stories-player/components/stories-header/stories-header.component';
import { StoriesFooterComponent } from './components/stories/components/stories-player/components/stories-footer/stories-footer.component';
import { StoriesEllipseComponent } from './components/stories/components/stories-player/components/stories-header/components/stories-ellipse/stories-ellipse.component';
import { StoriesLoadComponent } from './components/stories/components/stories-player/components/stories-load/stories-load.component';
import { StoriesInfoComponent } from './components/stories/components/stories-player/components/stories-header/components/stories-info/stories-info.component';

@NgModule({
    declarations: [
        StoriesComponent,
        StoriesPreviewComponent,
        StoriesPlayerComponent,
        StoriesHeaderComponent,
        StoriesFooterComponent,
        StoriesEllipseComponent,
        StoriesLoadComponent,
        StoriesInfoComponent,
    ],
    imports: [CommonModule, RouterModule],
    exports: [StoriesComponent],
})
export class SharedModule {}
