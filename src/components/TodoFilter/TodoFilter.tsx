import cn from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

type Props = {
  filter: Status;
  onFilterChange: (newFilter: Status) => void;
  todos: Todo[];
  onDelete: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilterChange,
  todos,
  onDelete,
}) => {
  // Обробник кліків для зміни фільтра
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      const newFilter = e.currentTarget.hash.replace('#/', '') as Status;

      onFilterChange(newFilter);
    },
    [onFilterChange],
  );

  // Підрахунок кількості невиконаних завдань і перевірка наявності виконаних
  const { uncompletedTodosCount, hasCompleted } = useMemo(() => {
    return todos.reduce(
      (acc, todo) => ({
        uncompletedTodosCount:
          acc.uncompletedTodosCount + (todo.completed ? 0 : 1),
        hasCompleted: acc.hasCompleted || todo.completed,
      }),
      { uncompletedTodosCount: 0, hasCompleted: false },
    );
  }, [todos]);

  return (
    <>
      <span className="todo-count" data-cy="TodosCounter">
        {`${uncompletedTodosCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href={`#/${Status.All}`}
          data-cy="FilterLinkAll"
          onClick={handleLinkClick}
          className={cn('filter__link', { selected: filter === Status.All })}
        >
          All
        </a>

        <a
          href={`#/${Status.Active}`}
          data-cy="FilterLinkActive"
          onClick={handleLinkClick}
          className={cn('filter__link', { selected: filter === Status.Active })}
        >
          Active
        </a>

        <a
          href={`#/${Status.Completed}`}
          data-cy="FilterLinkCompleted"
          onClick={handleLinkClick}
          className={cn('filter__link', {
            selected: filter === Status.Completed,
          })}
        >
          Completed
        </a>
      </nav>

      <button
        disabled={!hasCompleted}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onDelete}
      >
        Clear completed
      </button>
    </>
  );
};
