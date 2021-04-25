import { Injectable } from '@angular/core';

interface User {
  id_user: string;
  name: string;
  username: string;
  avatar_image: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataFilterService {
  constructor() {}

  // TODO, continuar
  filterItems(items: Array<User>, searchTerm: string) {
    let filteredResults = items.filter((item) => {
      if (searchTerm.includes('@')) {
        searchTerm = searchTerm.replace('@', '');
      }

      if (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return true;

      return false;
    });

    return filteredResults;
  }
}
