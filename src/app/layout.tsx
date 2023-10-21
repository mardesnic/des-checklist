import type { Metadata } from 'next';
import { APP_DESCRIPTION } from '@/lib/const';
import './globals.css';
import ThemeRegistry from '../lib/theme/ThemeRegistry';
import { NextAuthSessionProvider } from './providers/sessionProvider';
import { generatePageTitle } from '@/lib/utils';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: generatePageTitle(),
  description: APP_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <NextAuthSessionProvider>
            <Container>{children}</Container>
          </NextAuthSessionProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
