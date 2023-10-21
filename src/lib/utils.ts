import { APP_TITLE } from '@/lib/const';

export function generatePageTitle(title: string = '') {
  return `${title ? `${title} | ` : ''}${APP_TITLE}`;
}

export function generateUsername(): string {
  const adjectives = [
    'Brave',
    'Clever',
    'Bold',
    'Happy',
    'Calm',
    'Eager',
    'Honest',
    'Kind',
    'Lively',
    'Proud',
  ];
  const nouns = [
    'Lion',
    'Eagle',
    'Bear',
    'Shark',
    'Tiger',
    'Fox',
    'Wolf',
    'Dolphin',
    'Owl',
    'Hawk',
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 100);

  return `${randomAdjective}${randomNoun}${randomNumber}`;
}

function generatePassword(length: number = 12): string {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export function generateCredentials(): { username: string; password: string } {
  return {
    username: generateUsername(),
    password: generatePassword(),
  };
}

export function isValidCredentials(credentials: {
  username: string;
  password: string;
}): boolean {
  if (!credentials) {
    return false;
  }
  const { username, password } = credentials;
  // check username
  if (username.length < 3 || username.length > 30) {
    return false;
  }
  if (!/^[a-zA-Z0-9_.-@]+$/.test(username)) {
    return false;
  }
  if (/\s/.test(username)) {
    return false;
  }
  // check password
  if (password.length < 3 || password.length > 100) {
    return false;
  }

  return true;
}
