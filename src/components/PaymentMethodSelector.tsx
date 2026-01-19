import React from 'react';
import { PaymentMethodType, PAYMENT_METHODS } from '../lib/paymentMethodConfig';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType;
  onMethodChange: (method: PaymentMethodType) => void;
  currency?: string;
}

const methodImages = {
  card: 'https://f003.backblazeb2.com/file/houzing/admin1images/a+(2).png',
  mobile_money: {
    main: 'https://f003.backblazeb2.com/file/houzing/admin1images/a+(4).png',
    mpesa: 'https://f003.backblazeb2.com/file/houzing/admin1images/a+(1).png',
  },
  express_pay: {
    paypal: 'https://f003.backblazeb2.com/file/houzing/admin1images/b+(1).png',
    googlePay: 'https://f003.backblazeb2.com/file/houzing/admin1images/b+(3).png',
    applePay: 'https://f003.backblazeb2.com/file/houzing/admin1images/b+(2).png',
  },
};

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
  currency = 'UGX',
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <p className="text-gray-300 text-sm font-medium">Select how you'd like to pay:</p>

      {Object.entries(PAYMENT_METHODS).map(([methodId, method]) => {
        const isSelected = selectedMethod === methodId;
        const isCardMethod = methodId === 'card';
        const isMobileMoneyMethod = methodId === 'mobile_money';

        return (
          <label
            key={methodId}
            className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${
              isSelected
                ? 'border-rose-400 bg-rose-400/10'
                : 'border-gray-700 hover:border-gray-600 bg-gray-900/30'
            }`}
          >
            <div className="flex-shrink-0">
              <input
                type="radio"
                name="paymentMethod"
                value={methodId}
                checked={isSelected}
                onChange={() => onMethodChange(methodId as PaymentMethodType)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex-1 flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm">{method.name}</h3>

              <div className="flex items-center gap-3">
                {isCardMethod && (
                  <img
                    src={methodImages.card}
                    alt="Visa, Mastercard and other cards"
                    className="h-8 object-contain"
                  />
                )}

                {isMobileMoneyMethod && (
                  <div className="flex items-center gap-2">
                    <img
                      src={methodImages.mobile_money.main}
                      alt="Mobile money providers"
                      className="h-8 object-contain"
                    />
                    <img
                      src={methodImages.mobile_money.mpesa}
                      alt="M-Pesa"
                      className="h-8 object-contain"
                    />
                  </div>
                )}

                {methodId === 'express_pay' && (
                  <div className="flex items-center gap-2">
                    <img
                      src={methodImages.express_pay.paypal}
                      alt="PayPal"
                      className="h-8 object-contain"
                    />
                    <img
                      src={methodImages.express_pay.googlePay}
                      alt="Google Pay"
                      className="h-8 object-contain"
                    />
                    <img
                      src={methodImages.express_pay.applePay}
                      alt="Apple Pay"
                      className="h-8 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
