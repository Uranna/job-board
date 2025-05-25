import { filtersAtom } from '@/shared/store/filters';
import { Button } from '@/shared/ui/primitives/button';
import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useAtom } from 'jotai';
import { Dialog } from 'radix-ui';
import { useMemo, useState } from 'react';
import { VacanciesFilterForm } from './FilterForm';
import { Badge } from '@/shared/ui/components/badge';

export const VacancyFilters = () => {
  const [filters] = useAtom(filtersAtom);
  const [showDialog, setShowDialog] = useState(false);

  const tags = useMemo(() => {
    const result = []
    if (filters.minSalary && !filters.maxSalary) {
      result.push(`От ${filters.minSalary.toLocaleString()} ₽`)
    }

    if (filters.maxSalary && !filters.minSalary) {
      result.push(`До ${filters.maxSalary.toLocaleString()} ₽`)
    }

    if (filters.minSalary && filters.maxSalary) {
      result.push(`${filters.minSalary.toLocaleString()} - ${filters.maxSalary.toLocaleString()} ₽`)
    }

    if (filters.search) {
      result.push(`Содержит "${filters.search}"`)
    }

    [...filters.experience, ...filters.employmentType].forEach(tag => result.push(tag))

    return result
  }, [filters])

  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg flex gap-4 justify-between items-start">
      <div className='flex flex-wrap gap-2 self-center'>
        {tags.map((tag, i) => <Badge key={i}>{tag}</Badge>)}
      </div>

      <Button variant='ghost' className='p-2' onClick={() => setShowDialog(true)}>
        <MixerHorizontalIcon />
      </Button>

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 fixed z-20 inset-0">
            <Dialog.Content className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-4 rounded-md shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className='text-xl font-bold text-gray-200'>Фильтры вакансий</Dialog.Title>
                <Dialog.Close asChild>
                  <Button variant='ghost' className='text-red-500 p-2'>
                    <Cross2Icon />
                  </Button>
                </Dialog.Close>
              </div>
              <Dialog.Description/>
              <VacanciesFilterForm onClose={() => setShowDialog(false)}  />
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};