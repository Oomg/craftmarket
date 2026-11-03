import { useId } from 'react';
import PropTypes from 'prop-types';
import { cx } from './cx';

export function Input({
  as = 'input',
  label,
  hint,
  error,
  className,
  id: idProp,
  ...rest
}) {
  const autoId = useId();
  const id = idProp || autoId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const Field = as === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink-800">
          {label}
        </label>
      )}

      <Field
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx(
          'w-full rounded-control border bg-white px-3 py-2 text-base text-ink-900',
          'placeholder:text-ink-500',
          'focus:outline-2 focus:outline-offset-0 focus:outline-brand-600/40',
          error
            ? 'border-danger-600 focus:border-danger-600'
            : 'border-ink-300 focus:border-brand-600',
          'disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-ink-500',
          className,
        )}
        {...rest}
      />

      {hint && !error && (
        <p id={hintId} className="text-sm text-ink-600">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-sm text-danger-600">
          {error}
        </p>
      )}
    </div>
  );
}

Input.propTypes = {
  as: PropTypes.oneOf(['input', 'textarea']),
  label: PropTypes.string,
  hint: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};