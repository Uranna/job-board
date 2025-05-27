// src/features/vacancies/ui/VacanciesList.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { createStore, Provider as JotaiProvider } from 'jotai';
import { GET_VACANCIES } from '../api/vacancies';
import { VacanciesList } from '../ui/VacanciesList';
import { filtersAtom } from '@/shared/store/filters';

// Определяем начальные значения фильтров
const initialFilters = {
  minSalary: undefined,
  maxSalary: undefined,
  experience: [],
  employmentType: [],
  search: "",
};

// Создаем store с начальными значениями
const createTestStore = () => {
  const store = createStore();
  store.set(filtersAtom, initialFilters);
  return store;
};

// Моки данных для GraphQL запроса
const mockVacanciesData = {
  vacancies: {
    items: [
      {
        id: '1',
        title: 'Frontend Developer',
        company: 'Tech Corp',
        salary: 100000,
        experience: '3+ years',
        employmentType: 'Full-time',
      },
      {
        id: '2',
        title: 'Backend Developer',
        company: 'Data Systems',
        salary: 120000,
        experience: '5+ years',
        employmentType: 'Full-time',
      },
    ],
    totalCount: 2,
  },
};

// Мок успешного запроса
const successMock = [
  {
    request: {
      query: GET_VACANCIES,
      variables: {
        page: 1,
        perPage: 10,
        filter: initialFilters,
      },
    },
    result: {
      data: mockVacanciesData,
    },
  },
  {
    request: {
      query: GET_VACANCIES,
      variables: {
        page: 1,
        perPage: 5,
        filter: initialFilters,
      },
    },
    result: {
      data: {
        vacancies: {
          items: mockVacanciesData.vacancies.items.slice(0, 1),
          totalCount: 1,
        },
      },
    },
  },
];

// Мок запроса с ошибкой
const errorMock = [
  {
    request: {
      query: GET_VACANCIES,
      variables: {
        page: 1,
        perPage: 10,
        filter: initialFilters,
      },
    },
    error: new Error('Произошла ошибка'),
  },
];

describe('Компонент VacanciesList', () => {
  it('отображает состояние загрузки при первом рендере', () => {
    render(
      <JotaiProvider store={createTestStore()}>
        <MockedProvider mocks={successMock} addTypename={false}>
          <VacanciesList />
        </MockedProvider>
      </JotaiProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('отображает сообщение об ошибке при неудачном запросе', async () => {
    render(
      <JotaiProvider store={createTestStore()}>
        <MockedProvider mocks={errorMock} addTypename={false}>
          <VacanciesList />
        </MockedProvider>
      </JotaiProvider>
    );
  
    // Ждём исчезновения состояния загрузки
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Проверяем наличие сообщения об ошибке
    expect(await screen.findByText(/Error: Произошла ошибка/i)).toBeInTheDocument();
  });

  it('корректно отображает список вакансий после успешного запроса', async () => {
    render(
      <JotaiProvider store={createTestStore()}>
        <MockedProvider mocks={successMock} addTypename={false}>
          <VacanciesList />
        </MockedProvider>
      </JotaiProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
      expect(screen.getByText('Backend Developer')).toBeInTheDocument();
      expect(screen.getByText('Найдено вакансий: 2')).toBeInTheDocument();
    });
  });

  it('изменяет количество элементов на странице и обновляет данные', async () => {
    render(
      <JotaiProvider store={createTestStore()}>
        <MockedProvider mocks={successMock} addTypename={false}>
          <VacanciesList />
        </MockedProvider>
      </JotaiProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '5' } });

    await waitFor(() => {
      expect(select).toHaveValue('5');
      expect(screen.queryByText('Backend Developer')).not.toBeInTheDocument();
    });
  });

  it('корректно отображает информацию о пагинации', async () => {
    const paginationMock = [
      {
        ...successMock[0],
        result: {
          data: {
            vacancies: {
              items: mockVacanciesData.vacancies.items,
              totalCount: 15,
            },
          },
        },
      },
    ];

    render(
      <JotaiProvider store={createTestStore()}>
        <MockedProvider mocks={paginationMock} addTypename={false}>
          <VacanciesList />
        </MockedProvider>
      </JotaiProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Найдено вакансий: 15')).toBeInTheDocument();
    });
  });

  it('сбрасывает на первую страницу при изменении фильтров', async () => {
    // Создаём mock для refetch
    const refetchMock = jest.fn();
    
    // Мокаем useQuery
    jest.spyOn(require('@apollo/client'), 'useQuery').mockReturnValue({ // eslint-disable-line @typescript-eslint/no-require-imports
      loading: false,
      error: null,
      data: mockVacanciesData,
      refetch: refetchMock,
    });
  
    const testStore = createTestStore();
  
    render(
      <JotaiProvider store={testStore}>
        <MockedProvider mocks={successMock} addTypename={false}>
          <VacanciesList />
        </MockedProvider>
      </JotaiProvider>
    );
  
    // Изменяем фильтры в store
    act(() => {
      testStore.set(filtersAtom, { ...initialFilters, search: 'новый запрос' });
    });
  
    // Проверяем, что refetch был вызван с правильными параметрами
    await waitFor(() => {
      expect(refetchMock).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        filter: { ...initialFilters, search: 'новый запрос' },
      });
    });
  });
});