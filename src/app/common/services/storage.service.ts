import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = localStorage;

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  get(key: string): string | null {
    return this.storage.getItem(key);
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
}
