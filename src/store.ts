import { Store } from '@tauri-apps/plugin-store';

const store = new Store('.settings.dat');

store.load();

export default store;