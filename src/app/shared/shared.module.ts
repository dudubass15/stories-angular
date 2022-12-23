import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesComponent } from './components/stories/stories.component';
import { StoriesPreviewComponent } from './components/stories/components/stories-preview/stories-preview.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [StoriesComponent, StoriesPreviewComponent],
    imports: [CommonModule, RouterModule],
    exports: [StoriesComponent],
})
export class SharedModule {}
