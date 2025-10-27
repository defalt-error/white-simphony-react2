import { loginUser, registerUser } from "../utils/auth.js";
import { mockLocalStorage } from "./helpers/mockStorage.js";

describe("Auth (clientes y admins)", () => {
  it("registra y luego permite login de admin", () => {
    const storage = mockLocalStorage();
    const type = "admins";
    expect(registerUser(storage, type, "admin1", "1234").ok).toBeTrue();
    expect(loginUser(storage, type, "admin1", "1234").ok).toBeTrue();
  });

  it("impide registrar un cliente duplicado", () => {
    const storage = mockLocalStorage();
    const type = "clients";
    expect(registerUser(storage, type, "pepe", "a1").ok).toBeTrue();
    const r2 = registerUser(storage, type, "pepe", "otra");
    expect(r2.ok).toBeFalse();
    expect(r2.error).toContain("existe");
  });
});
