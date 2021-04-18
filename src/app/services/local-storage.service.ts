import { Injectable } from '@angular/core';

interface localUserData {
  name: string;
  username: string;
  avatar_image?: string;
}

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (this.storage) {
      return JSON.parse(this.storage.getItem(key));
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

  setUserInfo({ name, username, avatar_image }: localUserData) {
    this.set("user.name", name);
    this.set("user.username", username);
    if (avatar_image) this.set("user.avatar_image", avatar_image);
  }

  getUserInfo(): localUserData {
    return {
      name: this.get("user.name"),
      username: this.get("user.username"),
      // TODO, consertar depois
      // avatar: this.get("user.avatar_image")
    };
  }
}
