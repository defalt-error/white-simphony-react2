function read(storage, type) {
  const raw = storage.getItem(type);
  try { return raw ? JSON.parse(raw) : []; } catch { return []; }
}

function write(storage, type, arr) {
  storage.setItem(type, JSON.stringify(arr));
}

export function registerUser(storage, type, user, pass) {
  if (!user || !pass) return { ok: false, error: "Faltan campos" };
  const list = read(storage, type);
  if (list.some(u => u.user === user)) return { ok: false, error: "Usuario ya existe" };
  list.push({ user, pass });
  write(storage, type, list);
  return { ok: true };
}

export function loginUser(storage, type, user, pass) {
  const list = read(storage, type);
  const ok = list.some(u => u.user === user && u.pass === pass);
  return ok ? { ok: true } : { ok: false, error: "Credenciales inválidas" };
}

// ✅ Exportar utilidades internas para testing
export const __test__ = { read, write };
