import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema } from '../../schemas/reviewSchema';
import PropTypes from 'prop-types';

function ReviewForm({ onReviewSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      authorName: '',
      rating: '',
      reviewText: '',
    },
  });

  const onSubmit = (data) => {
    onReviewSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
        marginTop: '24px',
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: 0 }}>Відгук про товар</h3>

      {/* Ім'я */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="authorName">Ваше ім'я</label>
        <input
          id="authorName"
          type="text"
          {...register('authorName')}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
        />
        {errors.authorName && (
          <p role="alert" style={{ color: '#dc2626', margin: 0, fontSize: '14px' }}>
            {errors.authorName.message}
          </p>
        )}
      </div>

      {/* Оцінка */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="rating">Оцінка</label>
        <select
          id="rating"
          {...register('rating')}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
        >
          <option value="" disabled>
            Оберіть оцінку
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {errors.rating && (
          <p role="alert" style={{ color: '#dc2626', margin: 0, fontSize: '14px' }}>
            {errors.rating.message}
          </p>
        )}
      </div>

      {/* Текст відгуку */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="reviewText">Текст відгуку</label>
        <textarea
          id="reviewText"
          rows={4}
          {...register('reviewText')}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
        />
        {errors.reviewText && (
          <p role="alert" style={{ color: '#dc2626', margin: 0, fontSize: '14px' }}>
            {errors.reviewText.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: '10px 16px',
          backgroundColor: isSubmitting ? '#9ca3af' : '#0d9488',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
        }}
      >
        {isSubmitting ? 'Надсилання…' : 'Залишити відгук'}
      </button>

      {isSubmitSuccessful && (
        <p style={{ color: '#059669', margin: 0 }}>Дякуємо за ваш відгук!</p>
      )}
    </form>
  );
}

ReviewForm.propTypes = {
  onReviewSubmit: PropTypes.func.isRequired,
};

export default ReviewForm;