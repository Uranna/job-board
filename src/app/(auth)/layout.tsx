
import { PropsWithChildren } from 'react';

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen h-full flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-lg bg-gray-800">
        {children}
      </div>
    </div>
  );
}