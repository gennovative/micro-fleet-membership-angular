import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
	name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {

	constructor(private domSanitizer: DomSanitizer) {}

	public transform(url: string): SafeResourceUrl {
		return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
