import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { promoSchema } from '../../schemas/promoSchema';

function PromoForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(promoSchema),
    defaultValues: { promoCode: '' },
  });

  const onSubmit = (data) => {
    console.log('Промокод прийнято:', data.promoCode);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        marginTop: '24px',
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: 0 }}>Промокод</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="promoCode">Введіть промокод</label>
        <input
          id="promoCode"
          type="text"
          placeholder="Наприклад: SALE2026"
          {...register('promoCode')}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
        />
        {errors.promoCode && (
          <p role="alert" style={{ color: '#dc2626', margin: 0, fontSize: '14px' }}>
            {errors.promoCode.message}
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
        {isSubmitting ? 'Перевірка…' : 'Застосувати'}
      </button>

      {isSubmitSuccessful && (
        <p style={{ color: '#059669', margin: 0 }}>Промокод успішно застосовано!</p>
      )}
    </form>
  );
}

export default PromoForm;