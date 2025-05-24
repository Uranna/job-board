import { jwtVerify, SignJWT } from "jose";
import { users, Role } from "./users";
import type { User } from "./users";
import bcrypt from "bcryptjs";

// Генерация JWT
export async function generateJWT(userId: User['id']) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);
}

// Расшифровка JWT
export async function decodeJWT(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify<{ userId: User['id'] }>(token, secret, { algorithms: ['HS256'] });
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

// Поиск пользователя
export function findUserByEmail(email: string) {
  return users.find(u => u.email === email);
}

export function findUserById(id: string) {
  return users.find(u => u.id === id);
}

// Добавление пользователя
export function createUser(user: Omit<User, 'id'>) {
  const newUser = {
    ...user,
    role: user.role || [Role.USER],
    id: crypto.randomUUID(),
  };
  users.push(newUser);
  return newUser;
}

(async function() {
  if (!users.length) {
    const password = await bcrypt.hash('12345', 10);

    createUser({
      email: 'user@test.ru',
      password,
    })

    createUser({
      email: 'hr@test.ru',
      password,
      role: [Role.HR],
    })
  }
})();
