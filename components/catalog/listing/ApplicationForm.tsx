'use client';

import React, { useActionState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { submitListingApplication, type ListingFormState, type ListingType } from '@/app/actions/listing';
import { formatPhoneDisplay } from '@/lib/phone';

interface ApplicationFormProps {
  listingId: string;
  listingTitle: string;
  listingType?: ListingType;
}

const initialState: ListingFormState = { status: 'idle', message: '' };

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  listingId,
  listingTitle,
  listingType = 'general',
}) => {
  const boundAction = submitListingApplication.bind(null, listingId, listingTitle, listingType);
  const [state, formAction, isPending] = useActionState(boundAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [phone, setPhone] = React.useState('');

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
      setPhone('');
    }
  }, [state.status]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(formatPhoneDisplay(e.target.value));

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPhone(formatPhoneDisplay(e.clipboardData.getData('text')));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const digits = phone.replace(/\D/g, '');
      if (digits.length > 0) {
        setPhone(digits.length > 1 ? formatPhoneDisplay(digits.slice(0, -1)) : '');
        e.preventDefault();
      }
    }
  };

  const isDisabled = isPending || state.status === 'success';

  return (
    <div className="bg-white">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Оставить заявку на объект</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{listingTitle}</p>
      </div>

      <form ref={formRef} action={formAction}>
        {/* Phone value is controlled — pass via hidden input */}
        <input type="hidden" name="phone" value={phone} />

        <div className="space-y-4 mb-6">
          <div className="space-y-1.5">
            <Label htmlFor="app-name">Как к вам обращаться *</Label>
            <Input id="app-name" name="name" disabled={isDisabled} required />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="app-phone">Телефон *</Label>
            <Input
              id="app-phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhoneChange}
              onPaste={handlePhonePaste}
              onKeyDown={handlePhoneKeyDown}
              disabled={isDisabled}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="app-email">Электронная почта *</Label>
            <Input
              id="app-email"
              name="email"
              type="email"
              placeholder="example@mail.ru"
              disabled={isDisabled}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="app-message">Сообщение *</Label>
            <Textarea
              id="app-message"
              name="message"
              placeholder="Опишите ваш запрос"
              rows={4}
              disabled={isDisabled}
              required
              className="resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-[#0095c6] hover:bg-[#007a9e] disabled:bg-[#0095c6]/70 disabled:text-white/70 text-white border-0"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {state.status === 'success' ? 'Отправлено!' : 'Отправить заявку'}
          </Button>

          {state.status === 'success' && (
            <p className="text-sm text-[#0095c6] flex items-center gap-2">
              <CheckCircle className="h-4 w-4 shrink-0" />
              {state.message}
            </p>
          )}
          {state.status === 'error' && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {state.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
