import { HttpParameterCodec } from '@angular/common/http';

export class HttpFormEncodingCodec implements HttpParameterCodec {
    encodeKey(k: string): string { return encodeURIComponent(k).replace(/%40/gi, '@'); }

    encodeValue(v: string): string { return encodeURIComponent(v).replace(/%40/gi, '@'); }

    decodeKey(k: string): string { return decodeURIComponent(k.replace(/\+/gi, ' ')); }

    decodeValue(v: string) { return decodeURIComponent(v.replace(/\+/gi, ' ')); }
}
