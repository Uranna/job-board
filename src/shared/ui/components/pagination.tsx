import { Button } from '../primitives/button';
import { FC } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (currentPage: number) => void;
  className?: string;
};

export const Pagination: FC<PaginationProps> = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages < 2) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <nav className="flex gap-2 rounded-md shadow">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant={'primary'}
          className="p-2"
        >
          <ChevronLeftIcon />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <Button
            key={p}
            onClick={() => onPageChange(p)}
            variant={p === currentPage ? 'primary' : 'outline'}
            className='p-2'
          >
            {p}
          </Button>
        ))}

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant='primary'
          className="p-2"
        >
          <ChevronRightIcon />
        </Button>
      </nav>
    </div>);
};