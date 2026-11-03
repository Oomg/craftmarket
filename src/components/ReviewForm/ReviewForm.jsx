import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PropTypes from 'prop-types';
import { Button, Input } from '../ui';
import { reviewSchema } from '../../schemas/reviewSchema';

function ReviewForm({ onReviewSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (values) => {
    if (onReviewSubmit) {
      await onReviewSubmit(values);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-8 flex max-w-md flex-col gap-4 rounded-control border border-ink-300 bg-white p-4"
    >
      <h2 className="text-lg font-semibold text-ink-900">Залишити відгук</h2>

      <Input
        label="Ім'я"
        autoComplete="given-name"
        error={errors.authorName?.message || errors.name?.message}
        {...register('authorName')}
      />

      <Input
        label="Оцінка"
        hint="Від 1 до 5"
        type="number"
        min={1}
        max={5}
        error={errors.rating?.message}
        {...register('rating', { valueAsNumber: true })}
      />

      <Input
        as="textarea"
        rows={4}
        label="Текст відгуку"
        hint="Не менше 10 символів"
        error={errors.reviewText?.message || errors.text?.message}
        {...register('reviewText')}
      />

      <Button type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting ? 'Надсилання…' : 'Надіслати відгук'}
      </Button>

      {isSubmitSuccessful && (
        <p className="text-sm text-success-800" role="status">
          Відгук надіслано
        </p>
      )}
    </form>
  );
}

ReviewForm.propTypes = {
  onReviewSubmit: PropTypes.func,
};

export default ReviewForm;