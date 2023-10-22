import { APP_TITLE } from '@/lib/const';

export function generatePageTitle(title: string = '') {
  return `${title ? `${title} | ` : ''}${APP_TITLE}`;
}

export function generateFakeEmail(): string {
  const adjectives = [
    'brave',
    'clever',
    'bold',
    'happy',
    'calm',
    'eager',
    'honest',
    'kind',
    'lively',
    'proud',
  ];
  const nouns = [
    'lion',
    'eagle',
    'bear',
    'shark',
    'tiger',
    'fox',
    'wolf',
    'dolphin',
    'owl',
    'hawk',
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomName = nouns[Math.floor(Math.random() * nouns.length)];
  const randomDomain = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 100);

  return `${randomAdjective}${randomName}${randomNumber}@${randomDomain}.hr`;
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

export function generateCredentials(): { email: string; password: string } {
  return {
    email: generateFakeEmail(),
    password: generatePassword(),
  };
}

export function isValidCredentials(credentials: {
  email: string;
  password: string;
}): boolean {
  if (!credentials) {
    return false;
  }
  const { email, password } = credentials;

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  // Password validation
  if (password.length < 3 || password.length > 100) {
    return false;
  }

  return true;
}
