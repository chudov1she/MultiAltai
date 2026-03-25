'use client';

import React, { useActionState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { submitContactApplication, type ContactFormState } from '@/app/actions/contact';

const initialState: ContactFormState = { status: 'idle', message: '' };

function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/\D/g, '');
  let formatted = numbers;
  if (numbers.startsWith('8') && numbers.length >= 11) {
    formatted = '7' + numbers.slice(1);
  }
  if (formatted.startsWith('7') && formatted.length === 11) {
    return `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4, 7)}-${formatted.slice(7, 9)}-${formatted.slice(9, 11)}`;
  }
  if (formatted.length === 10) {
    return `+7 (${formatted.slice(0, 3)}) ${formatted.slice(3, 6)}-${formatted.slice(6, 8)}-${formatted.slice(8, 10)}`;
  }
  return value;
}

const ContactForm: React.FC = () => {
  const [state, formAction, isPending] = useActionState(submitContactApplication, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [phone, setPhone] = React.useState('');

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
      setPhone('');
    }
  }, [state.status]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPhone(formatPhoneNumber(e.clipboardData.getData('text')));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const digits = phone.replace(/\D/g, '');
      if (digits.length > 0) {
        const newDigits = digits.slice(0, -1);
        setPhone(newDigits.length > 0 ? formatPhoneNumber(newDigits) : '');
        e.preventDefault();
      }
    }
  };

  const isDisabled = isPending || state.status === 'success';

  return (
    <Card className="bg-white rounded-3xl shadow-lg">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl text-[#011315]">
          Создайте заявку на покупку/продажу ЗУ
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">
          <input type="hidden" name="phone" value={phone} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#011315] font-medium">
                Как к вам обращаться *
              </Label>
              <Input
                id="name"
                name="name"
                disabled={isDisabled}
                className="border-gray-200 focus:border-[#0095c6] focus:ring-[#0095c6]/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone-display" className="text-[#011315] font-medium">
                Телефон *
              </Label>
              <Input
                id="phone-display"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                onPaste={handlePhonePaste}
                onKeyDown={handlePhoneKeyDown}
                disabled={isDisabled}
                className="border-gray-200 focus:border-[#0095c6] focus:ring-[#0095c6]/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#011315] font-medium">
              Электронная почта *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.ru"
              disabled={isDisabled}
              className="border-gray-200 focus:border-[#0095c6] focus:ring-[#0095c6]/20"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-[#011315] font-medium">
              Сообщение *
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Опишите ваш запрос на покупку объектов в свободной форме"
              rows={5}
              disabled={isDisabled}
              className="border-gray-200 focus:border-[#0095c6] focus:ring-[#0095c6]/20 resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-[#0095c6] hover:bg-[#007a9e] disabled:bg-[#0095c6]/70 disabled:text-white/70 text-white border-0 py-3 text-lg font-medium"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Отправляем...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Отправить заявку
              </>
            )}
          </Button>

          {state.status === 'success' && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="font-medium">{state.message}</span>
            </div>
          )}

          {state.status === 'error' && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="font-medium">{state.message}</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
