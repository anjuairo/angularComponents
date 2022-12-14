import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { MediaStreamDirective } from './mediaStream/media-stream.directive';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
  @ViewChild(MediaStreamDirective)
  public mediaStream!: MediaStreamDirective;

  public picSrc!: string;
  public videoSrc!: SafeUrl;

  constructor(private sanitaze: DomSanitizer) {}

  public onPic(): void {
    this.picSrc = this.mediaStream.take();
  }

  public onVideo(data: Blob): void {
    this.videoSrc = this.sanitaze.bypassSecurityTrustUrl(
      URL.createObjectURL(data)
    );
  }

  public onError(err: DOMException | ReferenceError): void {
    if (err instanceof DOMException) {
      alert('Impossible to instanciate MediaStream' + err);
    } else {
      alert('Impossible to instanciate MediaRecorder' + err);
    }
  }
}
