import type { Matcher, MatcherOptions, Queries, RenderOptions } from '@testing-library/react';
import { buildQueries, queries, queryHelpers, render } from '@testing-library/react';

import type { JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

const queryAllByDataTest = (
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions | undefined
) => queryHelpers.queryAllByAttribute('data-test', container, id, options);

const getMultipleError = (_c: Element | null, dataTestValue: string) =>
  `Found multiple elements with the data-test attribute of: ${dataTestValue}`;

const getMissingError = (_c: Element | null, dataTestValue: string) =>
  `Unable to find an element with the data-test attribute of: ${dataTestValue}`;

const [queryByDataTest, getAllByDataTest, getByDataTest, findAllByDataTest, findByDataTest] =
  buildQueries(queryAllByDataTest, getMultipleError, getMissingError);

const dataTestQueries = {
  findAllByDataTest,
  findByDataTest,
  getAllByDataTest,
  getByDataTest,
  queryAllByDataTest,
  queryByDataTest
};

const newQueries = { ...queries, ...dataTestQueries };

export const testRender = <
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Q extends Queries = typeof newQueries,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Container extends Element | DocumentFragment = HTMLElement
>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  options: RenderOptions<typeof newQueries, HTMLElement> = {}
) => render(ui, { queries: newQueries, ...options });

export const MockRouter = ({ children }: { children: ReactNode }): JSX.Element => (
  <MemoryRouter>{children}</MemoryRouter>
);
