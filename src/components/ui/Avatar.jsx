import PropTypes from 'prop-types';
import { cx } from './cx';

const PALETTE = [
  'bg-brand-600 text-white',
  'bg-brand-700 text-white',
  'bg-danger-600 text-white',
  'bg-success-800 text-white',
  'bg-warning-900 text-white',
  'bg-ink-800 text-white',
];

function getInitials(name) {
  if (!name || typeof name !== 'string') return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function pickTone(name) {
  if (!name) return 0;
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash + name.charCodeAt(i) * (i + 1)) % PALETTE.length;
  }
  return hash;
}

export function Avatar({ name = '', size = 'md', className }) {
  const initials = getInitials(name);
  const toneClass = PALETTE[pickTone(name)];

  const sizeClass =
    size === 'sm' ? 'h-8 w-8 text-xs' : size === 'lg' ? 'h-14 w-14 text-lg' : 'h-10 w-10 text-sm';

  return (
    <span
      role="img"
      aria-label={name ? `Аватар: ${name}` : 'Аватар користувача'}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold',
        sizeClass,
        toneClass,
        className,
      )}
    >
      {initials}
    </span>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};