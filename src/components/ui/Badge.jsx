import PropTypes from 'prop-types';
import { cx } from './cx';

const tones = {
  neutral: 'bg-ink-100 text-ink-800',
  brand: 'bg-brand-100 text-brand-800',
  success: 'bg-success-100 text-success-800',
  warning: 'bg-warning-100 text-warning-900',
  danger: 'bg-danger-100 text-danger-700',
};

export function Badge({ tone = 'neutral', children, className }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-control px-2 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  tone: PropTypes.oneOf(['neutral', 'brand', 'success', 'warning', 'danger']),
  children: PropTypes.node,
  className: PropTypes.string,
};