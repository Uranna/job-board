import { Button } from '../primitives/button';

export const YandexAuthButton = () => {
  return (
    <Button
      variant="outline"
      className="w-full bg-[#FFCC00] text-[#000] hover:bg-[#FFDB4D] active:bg-[#FFDB4D] flex items-center justify-center gap-2"
      onClick={() => {
        window.location.href = '/api/auth/yandex';
      }}
    >
      Войти через Яндекс
    </Button>
  );
};