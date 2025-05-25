import { useAtom } from 'jotai';
import { useFormik } from 'formik';
import { filtersAtom, VacancyFilters } from '@/shared/store/filters';
import { FC } from 'react';
import { Label } from '@/shared/ui/components/label';
import { Checkbox } from '@/shared/ui/primitives/checkbox';
import { Button } from '@/shared/ui/primitives/button';

type VacanciesFilterFormProps = {
  onClose: () => void;
}

export const VacanciesFilterForm: FC<VacanciesFilterFormProps> = ({ onClose }) => {
  const [filters, setFilters] = useAtom(filtersAtom);

  const formik = useFormik<VacancyFilters>({
    initialValues: {
      minSalary: filters.minSalary,
      maxSalary: filters.maxSalary,
      search: filters.search || '',
      experience: filters.experience,
      employmentType: filters.employmentType,
    },
    onSubmit: (values) => {
      setFilters({
        minSalary: values.minSalary,
        maxSalary: values.maxSalary,
        search: values.search,
        experience: values.experience,
        employmentType: values.employmentType,
      });
      onClose();
    },
  });

  const changeArrayItem = (field: 'experience' | 'employmentType', value: string) => {
    const current = formik.values[field];
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];

    formik.setFieldValue(field, newValue);
  };

  const experience = ['Нет опыта', '1-3 года', '3-5 лет', '5+ лет'];

  const employmentTypes = [
    'Полная занятость',
    'Частичная занятость',
    'Контракт',
    'Стажировка',
  ];

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 text-gray-200">
      <h3 className='mb-2 font-bold'>Зарплата</h3>
      <div className='flex gap-4'>
        <Label
          label='От'
          inputProps={{
            type: 'number',
            name: "minSalary",
            step: 10000,
            value: formik.values.minSalary || '',
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
        />

        <Label
          label='До'
          inputProps={{
            type: 'number',
            name: "maxSalary",
            step: 10000,
            value: formik.values.maxSalary || '',
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
        />
      </div>

      <Label
        label='Поиск'
        inputProps={{
          name: "search",
          value: formik.values.search || '',
          onChange: formik.handleChange,
          onBlur: formik.handleBlur,
          placeholder: 'Название или компания',
        }}
      />

      <div>
        <h3 className='text-sm font-medium text-gray-400 mb-2'>Опыт работы</h3>
        <div className="flex flex-col gap-1">
          {experience.map((exp, i) => (
            <Checkbox
              key={i}
              label={exp}
              checked={formik.values.experience.includes(exp)}
              onCheckedChange={() => changeArrayItem('experience', exp)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-2">Тип занятости</h3>
        <div className="flex flex-col gap-1">
          {employmentTypes.map((type, i) => (
            <Checkbox
              key={i}
              label={type}
              checked={formik.values.employmentType.includes(type)}
              onCheckedChange={() => changeArrayItem('employmentType', type)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          onClick={() => {
            formik.resetForm({
              values: {
                minSalary: undefined,
                maxSalary: undefined,
                search: '',
                experience: [],
                employmentType: [],
              }
            });
          }}
          variant='outline'
        >
          Сбросить
        </Button>
        <Button
          type="submit"
          variant='primary'
        >
          Применить
        </Button>
      </div>
    </form>
  );
};