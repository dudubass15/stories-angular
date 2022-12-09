import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesComponent } from './components/stories/stories.component';
import { StoriesPreviewComponent } from './components/stories/components/stories-preview/stories-preview.component';

@NgModule({
    declarations: [StoriesComponent, StoriesPreviewComponent],
    imports: [CommonModule],
    exports: [StoriesComponent],
})
export class SharedModule {}
