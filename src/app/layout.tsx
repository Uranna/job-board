import { Providers } from './providers';
import { PropsWithChildren } from 'react';
import './globals.css'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className='min-h-screen bg-gray-900 text-gray-200'>
            {children}
          </div>
      </Providers>
    </body>
  </html>
);
}