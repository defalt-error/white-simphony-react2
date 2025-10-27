// src/data/products.js

const STORAGE_KEY = "ws_products_v1";

const seedProducts = [
  { id: 1, name: "Nirvana - Nevermind (Vinilo)", price: 25990, category: "Vinilos", offer: true, stock: 12, image: "/imagenes/nirvana.jpg" },
  { id: 2, name: "Queen - Greatest Hits (CD)", price: 18990, category: "CDs", offer: false, stock: 20, image: "/imagenes/queen.jpg" },
  { id: 3, name: "The Beatles - Abbey Road (Cassette)", price: 15990, category: "Cassettes", offer: false, stock: 8, image: "/imagenes/beatles.jpg" },
  { id: 4, name: "Pink Floyd - The Wall (Vinilo)", price: 28990, category: "Vinilos", offer: true, stock: 10, image: "/imagenes/pinkfloyd.jpg" },
  { id: 5, name: "Foo Fighters - Wasting Light (CD)", price: 19990, category: "CDs", offer: false, stock: 16, image: "/imagenes/foofighters.jpg" },
  { id: 6, name: "Arctic Monkeys - AM (Vinilo)", price: 26990, category: "Vinilos", offer: false, stock: 9, image: "/imagenes/articmonkeys.jpg" },
  { id: 7, name: "Radiohead - OK Computer (CD)", price: 17990, category: "CDs", offer: false, stock: 15, image: "/imagenes/radiohead.jpg" },
  { id: 8, name: "Metallica - Black Album (Cassette)", price: 14990, category: "Cassettes", offer: false, stock: 7, image: "/imagenes/metallica.jpg" }
];

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
    return [...seedProducts];
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
    return [...seedProducts];
  }
}

function save(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function listProducts() {
  return load();
}

export function getProduct(id) {
  return load().find(p => p.id === Number(id)) || null;
}

export function createProduct(product) {
  const list = load();
  const nextId = list.length ? Math.max(...list.map(p => p.id)) + 1 : 1;
  const newItem = { id: nextId, offer: false, stock: 0, ...product };
  list.push(newItem);
  save(list);
  return newItem;
}

export function updateProduct(id, updates) {
  const list = load();
  const idx = list.findIndex(p => p.id === Number(id));
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  save(list);
  return list[idx];
}

export function deleteProduct(id) {
  const list = load();
  const next = list.filter(p => p.id !== Number(id));
  const removed = next.length !== list.length;
  if (removed) save(next);
  return removed;
}

export function listCategories() {
  return Array.from(new Set(load().map(p => p.category))).sort();
}

export function listOffers() {
  return load().filter(p => !!p.offer);
}
